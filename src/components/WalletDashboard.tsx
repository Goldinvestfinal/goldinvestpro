import { useState } from "react";
import { WalletHeader } from "./wallet/WalletHeader";
import { QuickActions } from "./wallet/QuickActions";
import { TransactionHistory } from "./wallet/TransactionHistory";

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

export const WalletDashboard = () => {
  const [isRealWallet, setIsRealWallet] = useState(true);
  const currentBalance = isRealWallet ? 0 : 10000;

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="p-4 lg:p-8">
        <WalletHeader
          isRealWallet={isRealWallet}
          setIsRealWallet={setIsRealWallet}
          currentBalance={currentBalance}
        />
        <QuickActions />
        <TransactionHistory transactions={mockTransactions} />
      </main>
    </div>
  );
};