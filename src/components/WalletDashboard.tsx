
import { useState, useEffect } from "react";
import { WalletHeader } from "./wallet/WalletHeader";
import { QuickActions } from "./wallet/QuickActions";
import { TransactionHistory } from "./wallet/TransactionHistory";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "./ui/use-toast";

interface Transaction {
  id: number;
  type: string;
  amount: number;
  status: string;
  created_at: string;
}

export const WalletDashboard = () => {
  const [isRealWallet, setIsRealWallet] = useState(false);
  const [currentWallet, setCurrentWallet] = useState<any>(null);
  const { toast } = useToast();

  // Fetch user's wallets
  const { data: wallets, isLoading: isLoadingWallets } = useQuery({
    queryKey: ["wallets"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("wallets")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;
      return data;
    },
  });

  // Fetch transactions for current wallet
  const { data: transactions } = useQuery({
    queryKey: ["transactions", currentWallet?.id],
    queryFn: async () => {
      if (!currentWallet) return [];
      
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("wallet_id", currentWallet.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!currentWallet,
  });

  // Update current wallet when wallets data changes or wallet type changes
  useEffect(() => {
    if (wallets && wallets.length > 0) {
      const wallet = wallets.find(w => w.is_demo !== isRealWallet);
      setCurrentWallet(wallet || null);
    }
  }, [wallets, isRealWallet]);

  const handleTransactionSuccess = () => {
    // Refetch data
  };

  return (
    <div>
      <WalletHeader 
        currentBalance={currentWallet?.balance || 0}
        isRealWallet={isRealWallet}
        setIsRealWallet={setIsRealWallet}
      />
      
      {currentWallet && (
        <QuickActions 
          walletId={currentWallet.id} 
          isDemo={currentWallet.is_demo}
          onSuccess={handleTransactionSuccess}
        />
      )}
      
      <TransactionHistory 
        transactions={transactions?.map(tx => ({
          date: new Date(tx.created_at).toLocaleDateString(),
          type: tx.type,
          amount: tx.amount,
          status: tx.status
        })) || []}
      />
    </div>
  );
};
