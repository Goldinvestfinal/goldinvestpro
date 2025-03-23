
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { WithdrawalMethod } from "@/types/wallet";

interface UseWithdrawalProps {
  walletId: string;
  isDemo: boolean;
  onSuccess: () => void;
}

export const useWithdrawal = ({ walletId, isDemo, onSuccess }: UseWithdrawalProps) => {
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<"amount" | "method">("amount");
  const [selectedMethod, setSelectedMethod] = useState<WithdrawalMethod | null>(null);
  const { toast } = useToast();

  const resetForm = () => {
    setAmount("");
    setStep("amount");
    setSelectedMethod(null);
  };

  const handleWithdrawal = async () => {
    if (!selectedMethod) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a withdrawal method",
      });
      return;
    }

    setIsWithdrawing(true);

    try {
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        throw new Error("Please enter a valid amount");
      }

      // For demo wallets, just simulate the withdrawal
      if (isDemo) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        // Insert the transaction record
        const { error: transactionError } = await supabase
          .from("transactions")
          .insert({
            wallet_id: walletId,
            type: "withdrawal",
            amount: parsedAmount,
            status: "completed",
            withdrawal_method: selectedMethod.method,
            withdrawal_address: selectedMethod.address
          });

        if (transactionError) throw transactionError;

        toast({
          title: "Withdrawal Successful",
          description: `$${parsedAmount.toFixed(2)} has been withdrawn from your demo wallet.`,
        });
      } else {
        // For real wallets, handle the actual withdrawal process
        const { error: transactionError } = await supabase
          .from("transactions")
          .insert({
            wallet_id: walletId,
            type: "withdrawal",
            amount: parsedAmount,
            status: "pending", // Real withdrawals start as pending
            withdrawal_method: selectedMethod.method,
            withdrawal_address: selectedMethod.address
          });

        if (transactionError) throw transactionError;

        toast({
          title: "Withdrawal Requested",
          description: `Your withdrawal request for $${parsedAmount.toFixed(2)} has been submitted and is pending approval.`,
        });
      }

      resetForm();
      onSuccess();
      return true;
    } catch (error) {
      console.error("Withdrawal error:", error);
      toast({
        variant: "destructive",
        title: "Withdrawal Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
      return false;
    } finally {
      setIsWithdrawing(false);
    }
  };

  return {
    isWithdrawing,
    amount,
    setAmount,
    step,
    setStep,
    selectedMethod,
    setSelectedMethod,
    handleWithdrawal,
    resetForm
  };
};
