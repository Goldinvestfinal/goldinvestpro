import { WalletHeader } from "@/components/wallet/WalletHeader";
import { QuickActions } from "@/components/wallet/QuickActions";
import { TransactionHistory } from "@/components/wallet/TransactionHistory";
import { WalletNavigation } from "@/components/wallet/WalletNavigation";
import { useState } from "react";

const WalletAccounts = () => {
  const [isRealWallet, setIsRealWallet] = useState(true);
  const currentBalance = isRealWallet ? 0 : 10000;

  const mockTransactions = [
    {
      date: "2024-03-11",
      type: "Deposit",
      amount: 500,
      status: "Completed",
    },
    {
      date: "2024-03-10",
      type: "Withdrawal",
      amount: 200,
      status: "Pending",
    },
    {
      date: "2024-03-09",
      type: "Deposit",
      amount: 1000,
      status: "Completed",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4 lg:p-8">
      <WalletHeader
        isRealWallet={isRealWallet}
        setIsRealWallet={setIsRealWallet}
        currentBalance={currentBalance}
      />
      <WalletNavigation />
      <QuickActions />
      <TransactionHistory transactions={mockTransactions} />
    </div>
  );
};

export default WalletAccounts;