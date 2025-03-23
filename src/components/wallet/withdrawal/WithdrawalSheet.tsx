
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine } from "lucide-react";
import { useWithdrawal } from "@/hooks/use-withdrawal";
import { useWithdrawalMethods } from "@/hooks/use-withdrawal-methods";
import { WithdrawalAmountForm } from "./WithdrawalAmountForm";
import { WithdrawalMethodSelection } from "./WithdrawalMethodSelection";

export interface WithdrawalSheetProps {
  walletId: string;
  isDemo: boolean;
  onSuccess: () => void;
}

export const WithdrawalSheet = ({ walletId, isDemo, onSuccess }: WithdrawalSheetProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  const {
    isWithdrawing,
    amount,
    setAmount,
    step,
    setStep,
    selectedMethod,
    setSelectedMethod,
    handleWithdrawal,
    resetForm
  } = useWithdrawal({ walletId, isDemo, onSuccess });
  
  const { withdrawalMethods, addWithdrawalMethod } = useWithdrawalMethods(isSheetOpen);

  const handleMethodAdded = (newMethod: any) => {
    addWithdrawalMethod(newMethod);
    setSelectedMethod(newMethod);
  };

  const handleSheetOpenChange = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    setIsSheetOpen(open);
  };

  const handleWithdrawalSubmit = async () => {
    const success = await handleWithdrawal();
    if (success) {
      setIsSheetOpen(false);
    }
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <Button
        onClick={() => setIsSheetOpen(true)}
        className="flex-1 bg-gradient-to-br from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white px-4 py-6 rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        <div className="flex flex-col items-center justify-center w-full">
          <ArrowDownToLine className="h-8 w-8 mb-2" />
          <span className="text-xl">Withdraw</span>
        </div>
      </Button>

      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Withdraw Funds</SheetTitle>
          <SheetDescription>
            {isDemo
              ? "Withdraw funds from your demo wallet"
              : "Withdraw funds from your real wallet"}
          </SheetDescription>
        </SheetHeader>

        <div className="py-6">
          {step === "amount" ? (
            <WithdrawalAmountForm
              amount={amount}
              setAmount={setAmount}
              onContinue={() => setStep("method")}
            />
          ) : (
            <WithdrawalMethodSelection
              withdrawalMethods={withdrawalMethods}
              selectedMethod={selectedMethod}
              setSelectedMethod={setSelectedMethod}
              onBack={() => setStep("amount")}
              onSubmit={handleWithdrawalSubmit}
              isWithdrawing={isWithdrawing}
              amount={amount}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
