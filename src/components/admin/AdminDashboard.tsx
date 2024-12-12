import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WalletTable } from "./WalletTable";
import { TransactionTable } from "./TransactionTable";

interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  is_demo: boolean;
}

interface Transaction {
  id: number;  // Changed from string to number to match Supabase
  wallet_id: string;
  type: string;
  amount: number;
  status: string;
  created_at: string;
  updated_at: string;  // Added to match Supabase schema
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
        (payload: any) => {
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
        (payload: any) => {
          console.log('Transaction change received:', payload);
          if (selectedWallet && payload.new && payload.new.wallet_id === selectedWallet) {
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

  const handleViewTransactions = (walletId: string) => {
    setSelectedWallet(walletId);
    const tabsTrigger = document.querySelector('[data-state="inactive"][value="transactions"]') as HTMLElement;
    if (tabsTrigger) {
      tabsTrigger.click();
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
            <WalletTable
              wallets={wallets}
              profiles={profiles}
              onUpdateBalance={handleUpdateBalance}
              onAddTransaction={handleAddTransaction}
              onViewTransactions={handleViewTransactions}
            />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionTable
              transactions={transactions}
              selectedWallet={selectedWallet}
              wallets={wallets}
              profiles={profiles}
              onBack={() => setSelectedWallet(null)}
              getUserName={getUserName}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};