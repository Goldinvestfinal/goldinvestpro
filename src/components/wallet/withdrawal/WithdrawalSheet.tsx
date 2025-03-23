import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, ArrowLeft, Loader2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { WithdrawalMethodForm, WithdrawalMethod } from "./WithdrawalMethodForm";
import { WithdrawalMethodList } from "./WithdrawalMethodList";

export interface QuickActionsProps {
  walletId: string;
  isDemo: boolean;
  onSuccess: () => void;
}

export const WithdrawalSheet = ({ walletId, isDemo, onSuccess }: QuickActionsProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [showNewMethodForm, setShowNewMethodForm] = useState(false);
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<"amount" | "method">("amount");
  const [selectedMethod, setSelectedMethod] = useState<WithdrawalMethod | null>(null);
  const [withdrawalMethods, setWithdrawalMethods] = useState<WithdrawalMethod[]>([]);
  const { toast } = useToast();

  const resetForm = () => {
    setAmount("");
    setStep("amount");
    setSelectedMethod(null);
    setShowNewMethodForm(false);
  };

  const fetchWithdrawalMethods = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("withdrawal_methods")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;
      if (data) setWithdrawalMethods(data);
    } catch (error) {
      console.error("Error fetching withdrawal methods:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load withdrawal methods",
      });
    }
  };

  useEffect(() => {
    if (isSheetOpen) {
      fetchWithdrawalMethods();
    }
  }, [isSheetOpen]);

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

      // Close the sheet and reset the form
      setIsSheetOpen(false);
      resetForm();
      
      // Trigger success callback to refresh wallet data
      onSuccess();
    } catch (error) {
      console.error("Withdrawal error:", error);
      toast({
        variant: "destructive",
        title: "Withdrawal Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsWithdrawing(false);
    }
  };

  const handleMethodAdded = (newMethod: WithdrawalMethod) => {
    setWithdrawalMethods((prev) => [...prev, newMethod]);
    setShowNewMethodForm(false);
    setSelectedMethod(newMethod);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
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
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Withdrawal Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  min="1"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="text-lg"
                />
              </div>

              <Button
                onClick={() => setStep("method")}
                disabled={!amount || parseFloat(amount) <= 0}
                className="w-full"
              >
                Continue
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {showNewMethodForm ? (
                <WithdrawalMethodForm onComplete={handleMethodAdded} />
              ) : (
                <>
                  <WithdrawalMethodList
                    methods={withdrawalMethods}
                    selectedMethod={selectedMethod}
                    onSelect={setSelectedMethod}
                  />

                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowNewMethodForm(true)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Method
                    </Button>

                    <Button
                      onClick={handleWithdrawal}
                      disabled={isWithdrawing || !selectedMethod}
                      className="w-full"
                    >
                      {isWithdrawing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>Withdraw ${parseFloat(amount).toFixed(2)}</>
                      )}
                    </Button>
                  </div>
                </>
              )}

              {!showNewMethodForm && (
                <Button
                  variant="ghost"
                  onClick={() => setStep("amount")}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Amount
                </Button>
              )}

              {showNewMethodForm && (
                <Button
                  variant="ghost"
                  onClick={() => setShowNewMethodForm(false)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Methods
                </Button>
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
