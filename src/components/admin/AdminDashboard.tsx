import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  is_demo: boolean;
}

interface Transaction {
  id: string;
  wallet_id: string;
  type: string;
  amount: number;
  status: string;
  created_at: string;
}

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
}

export const AdminDashboard = () => {
  const { toast } = useToast();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);

  // Fetch initial data
  const { data: initialWallets } = useQuery({
    queryKey: ["admin-wallets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wallets")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const { data: initialProfiles } = useQuery({
    queryKey: ["admin-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, first_name, last_name");
      
      if (error) throw error;
      return data;
    },
  });

  // Set up real-time subscriptions
  useEffect(() => {
    if (initialWallets) setWallets(initialWallets);
    if (initialProfiles) setProfiles(initialProfiles);

    // Subscribe to wallet changes
    const walletSubscription = supabase
      .channel('wallet_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'wallets' },
        (payload) => {
          console.log('Wallet change received:', payload);
          if (payload.eventType === 'INSERT') {
            setWallets(prev => [payload.new as Wallet, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setWallets(prev => 
              prev.map(wallet => 
                wallet.id === payload.new.id ? payload.new as Wallet : wallet
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      walletSubscription.unsubscribe();
    };
  }, [initialWallets, initialProfiles]);

  const getUserName = (userId: string) => {
    const profile = profiles.find(p => p.id === userId);
    return profile 
      ? `${profile.first_name} ${profile.last_name}`
      : 'Unknown User';
  };

  const handleUpdateBalance = async (walletId: string, currentBalance: number) => {
    const newBalance = window.prompt('Enter new balance:', currentBalance.toString());
    if (!newBalance) return;

    const numBalance = parseFloat(newBalance);
    if (isNaN(numBalance)) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid number",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('wallets')
      .update({ balance: numBalance })
      .eq('id', walletId);

    if (error) {
      toast({
        title: "Error updating balance",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Balance updated",
        description: "The wallet balance has been updated successfully",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Admin Dashboard</CardTitle>
        <CardDescription>Manage user wallets and transactions in real-time</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Wallet Type</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wallets.map((wallet) => (
              <TableRow key={wallet.id}>
                <TableCell>{getUserName(wallet.user_id)}</TableCell>
                <TableCell>{wallet.is_demo ? 'Demo' : 'Real'}</TableCell>
                <TableCell>${wallet.balance.toLocaleString()}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() => handleUpdateBalance(wallet.id, wallet.balance)}
                  >
                    Update Balance
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};