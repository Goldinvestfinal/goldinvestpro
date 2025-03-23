
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { WithdrawalMethodList } from "./WithdrawalMethodList";
import { WithdrawalMethodForm } from "./WithdrawalMethodForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WithdrawalSheetProps {
  walletId: string;
  isDemo: boolean;
  onSuccess: () => void;
}

export const WithdrawalSheet = ({ walletId, isDemo, onSuccess }: WithdrawalSheetProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isAddingMethod, setIsAddingMethod] = useState(false);
  const [amount, setAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const { data: withdrawalMethods, refetch: refetchMethods } = useQuery({
    queryKey: ["withdrawalMethods"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("withdrawal_methods")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const { data: wallet } = useQuery({
    queryKey: ["wallet", walletId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wallets")
        .select("*")
        .eq("id", walletId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const handleVirtualWithdrawal = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid withdrawal amount",
        variant: "destructive",
      });
      return;
    }

    if (wallet && parseFloat(amount) > wallet.balance) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough funds to complete this withdrawal",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Create transaction record
      const { error: transactionError } = await supabase
        .from("transactions")
        .insert({
          wallet_id: walletId,
          type: "withdrawal",
          amount: parseFloat(amount),
          status: "Completed",
          name: "Virtual Withdrawal"
        });

      if (transactionError) throw transactionError;

      // Update wallet balance
      const newBalance = wallet ? wallet.balance - parseFloat(amount) : 0;
      const { error: walletError } = await supabase
        .from("wallets")
        .update({ balance: newBalance })
        .eq("id", walletId);

      if (walletError) throw walletError;

      toast({
        title: "Withdrawal successful",
        description: `$${amount} has been withdrawn from your wallet`,
      });
      
      setAmount("");
      setIsOpen(false);
      onSuccess();
    } catch (error) {
      console.error("Withdrawal error:", error);
      toast({
        title: "Withdrawal failed",
        description: "There was an error processing your withdrawal",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRealWithdrawal = async () => {
    if (!selectedMethod) {
      toast({
        title: "Error",
        description: "Please select a withdrawal method",
        variant: "destructive",
      });
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid withdrawal amount",
        variant: "destructive",
      });
      return;
    }

    if (wallet && parseFloat(amount) > wallet.balance) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough funds to complete this withdrawal",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const selectedWithdrawalMethod = withdrawalMethods?.find(m => m.id === selectedMethod);
      
      // Create transaction record
      const { error: transactionError } = await supabase
        .from("transactions")
        .insert({
          wallet_id: walletId,
          type: "withdrawal",
          amount: parseFloat(amount),
          status: "Pending",
          withdrawal_method: selectedWithdrawalMethod?.method,
          withdrawal_address: selectedWithdrawalMethod?.address
        });

      if (transactionError) throw transactionError;

      toast({
        title: "Withdrawal initiated",
        description: "Your withdrawal request has been submitted and is pending approval",
      });
      
      setAmount("");
      setIsOpen(false);
      onSuccess();
    } catch (error) {
      console.error("Withdrawal error:", error);
      toast({
        title: "Withdrawal failed",
        description: "There was an error processing your withdrawal request",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white border-none" 
          variant="outline"
        >
          <Download className="mr-2" /> Withdraw Funds
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-black border-amber-900/20">
        <SheetHeader>
          <SheetTitle className="text-amber-400">Withdraw Funds</SheetTitle>
          <SheetDescription className="text-amber-400/80">
            Withdraw your funds to your preferred payment method
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {!isAddingMethod ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-amber-400/80">Withdrawal Amount (USD)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="bg-amber-900/10 border-amber-900/20 text-amber-400"
                />
                {wallet && (
                  <p className="text-xs text-amber-400/60">
                    Available balance: ${wallet.balance.toLocaleString()}
                  </p>
                )}
              </div>
              
              {isDemo ? (
                <Button
                  onClick={handleVirtualWithdrawal}
                  disabled={isProcessing || !amount || parseFloat(amount) <= 0}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
                >
                  {isProcessing ? "Processing..." : "Withdraw from Demo Wallet"}
                </Button>
              ) : (
                <>
                  <WithdrawalMethodList
                    methods={withdrawalMethods || []}
                    selectedMethod={selectedMethod}
                    onSelectMethod={setSelectedMethod}
                    onAddNew={() => setIsAddingMethod(true)}
                  />

                  <Button
                    onClick={handleRealWithdrawal}
                    disabled={isProcessing || !selectedMethod || !amount || parseFloat(amount) <= 0}
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
                  >
                    {isProcessing ? "Processing..." : "Withdraw Funds"}
                  </Button>
                </>
              )}

              <div className="space-y-2 pt-4 border-t border-amber-900/20">
                <p className="text-sm text-amber-400/80">Important Notes:</p>
                <ul className="text-xs space-y-2 text-amber-400/60">
                  <li>• Minimum withdrawal amount: $100</li>
                  <li>• Processing time: 1-3 business days</li>
                  <li>• Verify your withdrawal address carefully</li>
                </ul>
              </div>
            </>
          ) : (
            <WithdrawalMethodForm
              onSuccess={() => {
                setIsAddingMethod(false);
                refetchMethods();
              }}
              onCancel={() => setIsAddingMethod(false)}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
