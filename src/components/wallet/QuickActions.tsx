
import { DepositSheet } from "./deposit/DepositSheet";
import { WithdrawalSheet } from "./withdrawal/WithdrawalSheet";

export interface QuickActionsProps {
  walletId: string;
  isDemo: boolean;
  onSuccess: () => void;
}

export const QuickActions = ({ walletId, isDemo, onSuccess }: QuickActionsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <DepositSheet walletId={walletId} isDemo={isDemo} onSuccess={onSuccess} />
      <WithdrawalSheet walletId={walletId} isDemo={isDemo} onSuccess={onSuccess} />
    </div>
  );
};
