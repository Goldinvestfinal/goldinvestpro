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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

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

  const { data: initialTransactions } = useQuery({
    queryKey: ["admin-transactions", selectedWallet],
    queryFn: async () => {
      if (!selectedWallet) return [];
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("wallet_id", selectedWallet)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!selectedWallet,
  });

  // Set up real-time subscriptions
  useEffect(() => {
    if (initialWallets) setWallets(initialWallets);
    if (initialProfiles) setProfiles(initialProfiles);
    if (initialTransactions) setTransactions(initialTransactions);

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

    // Subscribe to transaction changes
    const transactionSubscription = supabase
      .channel('transaction_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'transactions' },
        (payload) => {
          console.log('Transaction change received:', payload);
          if (selectedWallet && payload.new.wallet_id === selectedWallet) {
            if (payload.eventType === 'INSERT') {
              setTransactions(prev => [payload.new as Transaction, ...prev]);
            } else if (payload.eventType === 'UPDATE') {
              setTransactions(prev =>
                prev.map(tx =>
                  tx.id === payload.new.id ? payload.new as Transaction : tx
                )
              );
            }
          }
        }
      )
      .subscribe();

    return () => {
      walletSubscription.unsubscribe();
      transactionSubscription.unsubscribe();
    };
  }, [initialWallets, initialProfiles, initialTransactions, selectedWallet]);

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

  const handleAddTransaction = async (walletId: string) => {
    const amount = window.prompt('Enter transaction amount:');
    if (!amount) return;

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid number",
        variant: "destructive",
      });
      return;
    }

    const type = window.prompt('Enter transaction type (deposit/withdraw):');
    if (!type || !['deposit', 'withdraw'].includes(type.toLowerCase())) {
      toast({
        title: "Invalid type",
        description: "Please enter either 'deposit' or 'withdraw'",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('transactions')
      .insert({
        wallet_id: walletId,
        amount: numAmount,
        type: type.toLowerCase(),
        status: 'completed'
      });

    if (error) {
      toast({
        title: "Error adding transaction",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Transaction added",
        description: "The transaction has been added successfully",
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
        <Tabs defaultValue="wallets" className="space-y-4">
          <TabsList>
            <TabsTrigger value="wallets">Wallets</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="wallets">
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
                    <TableCell>
                      <Badge variant={wallet.is_demo ? "secondary" : "default"}>
                        {wallet.is_demo ? 'Demo' : 'Real'}
                      </Badge>
                    </TableCell>
                    <TableCell>${wallet.balance.toLocaleString()}</TableCell>
                    <TableCell className="space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => handleUpdateBalance(wallet.id, wallet.balance)}
                      >
                        Update Balance
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedWallet(wallet.id);
                          document.querySelector('[value="transactions"]')?.click();
                        }}
                      >
                        View Transactions
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleAddTransaction(wallet.id)}
                      >
                        Add Transaction
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="transactions">
            {selectedWallet ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">
                    Transactions for {getUserName(wallets.find(w => w.id === selectedWallet)?.user_id || '')}
                  </h3>
                  <Button variant="outline" onClick={() => setSelectedWallet(null)}>
                    Back to All Wallets
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          {new Date(transaction.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="capitalize">{transaction.type}</TableCell>
                        <TableCell>${transaction.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={transaction.status === "completed" ? "success" : "warning"}>
                            {transaction.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-4">
                Select a wallet to view its transactions
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};