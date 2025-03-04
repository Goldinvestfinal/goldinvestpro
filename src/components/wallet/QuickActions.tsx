
import { CreditCard, ArrowDownToLine, ArrowUpToLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DepositSheet } from "./deposit/DepositSheet";
import { WithdrawalSheet } from "./withdrawal/WithdrawalSheet";
import { useState } from "react";

interface QuickActionsProps {
  walletId: string | number;
  isDemo: boolean;
  onSuccess: () => Promise<void>;
}

export const QuickActions = ({ walletId, isDemo, onSuccess }: QuickActionsProps) => {
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false);

  return (
    <div className="flex flex-wrap gap-4 mt-6">
      <Button 
        onClick={() => setIsDepositOpen(true)}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
      >
        <ArrowDownToLine className="h-4 w-4" />
        Deposit Funds
      </Button>

      <Button 
        onClick={() => setIsWithdrawalOpen(true)}
        variant="outline"
        className="flex items-center gap-2 border-red-500 text-red-500 hover:bg-red-500/10"
      >
        <ArrowUpToLine className="h-4 w-4" />
        Withdraw Funds
      </Button>

      <DepositSheet
        open={isDepositOpen}
        onOpenChange={setIsDepositOpen}
        walletId={walletId}
        isDemo={isDemo}
        onSuccess={onSuccess}
      />

      <WithdrawalSheet
        open={isWithdrawalOpen}
        onOpenChange={setIsWithdrawalOpen}
        walletId={walletId}
        isDemo={isDemo}
        onSuccess={onSuccess}
      />
    </div>
  );
};
