import { DepositSheet } from "./deposit/DepositSheet";
import { WithdrawalSheet } from "./withdrawal/WithdrawalSheet";

export const QuickActions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <DepositSheet />
      <WithdrawalSheet />
    </div>
  );
};