import { useState, useEffect } from "react";
import { WalletHeader } from "./wallet/WalletHeader";
import { QuickActions } from "./wallet/QuickActions";
import { TransactionHistory } from "./wallet/TransactionHistory";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface Wallet {
  id: string;
  balance: number;
  is_demo: boolean;
}

interface Transaction {
  id: string;
  type: string;
  amount: number;
  status: string;
  created_at: string;
}

const fetchWallets = async () => {
  const { data, error } = await supabase
    .from("wallets")
    .select("*");

  if (error) throw error;
  return data;
};

const fetchTransactions = async (walletId: string) => {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("wallet_id", walletId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const WalletDashboard = () => {
  const [isRealWallet, setIsRealWallet] = useState(true);
  const [currentWallet, setCurrentWallet] = useState<Wallet | null>(null);

  const { data: wallets } = useQuery({
    queryKey: ["wallets"],
    queryFn: fetchWallets,
  });

  const { data: transactions } = useQuery({
    queryKey: ["transactions", currentWallet?.id],
    queryFn: () => currentWallet ? fetchTransactions(currentWallet.id) : Promise.resolve([]),
    enabled: !!currentWallet,
  });

  useEffect(() => {
    if (wallets) {
      const wallet = wallets.find(w => w.is_demo !== isRealWallet);
      setCurrentWallet(wallet || null);
    }
  }, [wallets, isRealWallet]);

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="p-4 lg:p-8">
        <WalletHeader
          isRealWallet={isRealWallet}
          setIsRealWallet={setIsRealWallet}
          currentBalance={currentWallet?.balance || 0}
        />
        <QuickActions />
        <TransactionHistory transactions={transactions || []} />
      </main>
    </div>
  );
};