
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import { WalletHeader } from "@/components/wallet/WalletHeader";
import { TransactionHistory } from "@/components/wallet/TransactionHistory";
import { QuickActions } from "@/components/wallet/QuickActions";
import { useToast } from "@/hooks/use-toast";

const Wallet = () => {
  const [activeWallet, setActiveWallet] = useState<"real" | "demo">("real");
  const { toast } = useToast();

  const { data: wallets, refetch: refetchWallets } = useQuery({
    queryKey: ["wallets"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("wallets")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;
      return data || [];
    },
  });

  const { data: transactions, refetch: refetchTransactions } = useQuery({
    queryKey: ["transactions", activeWallet],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const walletData = wallets?.find(w => 
        activeWallet === "real" ? !w.is_demo : w.is_demo
      );

      if (!walletData) return [];

      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("wallet_id", walletData.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!wallets,
  });

  const handleWalletCreation = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Create both real and demo wallets if they don't exist
      if (!wallets || wallets.length === 0) {
        const realWalletPromise = supabase.from("wallets").insert({
          user_id: user.id,
          balance: 0,
          is_demo: false,
          currency: "USD"
        });

        const demoWalletPromise = supabase.from("wallets").insert({
          user_id: user.id,
          balance: 10000, // Demo wallet starts with $10,000
          is_demo: true,
          currency: "USD"
        });

        await Promise.all([realWalletPromise, demoWalletPromise]);
        await refetchWallets();
        
        toast({
          title: "Wallets created",
          description: "Your real and demo wallets have been created successfully.",
        });
      }
    } catch (error) {
      console.error("Error creating wallets:", error);
      toast({
        variant: "destructive",
        title: "Error creating wallets",
        description: "There was an error creating your wallets. Please try again.",
      });
    }
  };

  useEffect(() => {
    // Check if wallets exist for the user, if not create them
    if (wallets !== undefined && wallets.length === 0) {
      handleWalletCreation();
    }
  }, [wallets]);

  // Refresh data after transactions
  const refreshData = async () => {
    await refetchWallets();
    await refetchTransactions();
  };

  const realWallet = wallets?.find(w => !w.is_demo);
  const demoWallet = wallets?.find(w => w.is_demo);

  const currentWallet = activeWallet === "real" ? realWallet : demoWallet;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{activeWallet === "real" ? "Real" : "Demo"} Wallet - GoldInvestPro</title>
      </Helmet>
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8">My Wallet</h1>

        <Tabs 
          value={activeWallet} 
          onValueChange={(value) => setActiveWallet(value as "real" | "demo")}
          className="mb-8"
        >
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="real">Real Wallet</TabsTrigger>
            <TabsTrigger value="demo">Demo Wallet</TabsTrigger>
          </TabsList>
          
          <TabsContent value="real" className="pt-6">
            {realWallet ? (
              <>
                <WalletHeader
                  balance={realWallet.balance}
                  currency={realWallet.currency}
                  isDemo={false}
                />
                <QuickActions
                  walletId={realWallet.id}
                  isDemo={false}
                  onSuccess={refreshData}
                />
              </>
            ) : (
              <div className="flex items-center justify-center p-8 bg-muted rounded-lg">
                <p>Loading wallet information...</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="demo" className="pt-6">
            {demoWallet ? (
              <>
                <WalletHeader
                  balance={demoWallet.balance}
                  currency={demoWallet.currency}
                  isDemo={true}
                />
                <QuickActions
                  walletId={demoWallet.id}
                  isDemo={true}
                  onSuccess={refreshData}
                />
              </>
            ) : (
              <div className="flex items-center justify-center p-8 bg-muted rounded-lg">
                <p>Loading wallet information...</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Transaction History</h2>
          <TransactionHistory transactions={transactions || []} />
        </div>
      </div>
    </div>
  );
};

export default Wallet;
