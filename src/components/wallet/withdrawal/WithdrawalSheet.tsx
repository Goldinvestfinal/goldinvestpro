
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowDownToLine, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import { WithdrawalMethodList } from "./WithdrawalMethodList";
import { WithdrawalMethodForm } from "./WithdrawalMethodForm";
import { WithdrawalMethod } from "@/types/wallet";

interface WithdrawalSheetProps {
  walletId: string;
  isDemo: boolean;
  onSuccess: () => void;
}

export const WithdrawalSheet = ({
  walletId,
  isDemo,
  onSuccess,
}: WithdrawalSheetProps) => {
  const [amount, setAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAddingMethod, setIsAddingMethod] = useState(false);
  const [withdrawalMethods, setWithdrawalMethods] = useState<WithdrawalMethod[]>(
    []
  );
  const [selectedMethod, setSelectedMethod] = useState<
    WithdrawalMethod | undefined
  >(undefined);
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  // Fetch withdrawal methods
  useEffect(() => {
    const fetchWithdrawalMethods = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("withdrawal_methods")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching withdrawal methods:", error);
        return;
      }

      if (data) {
        // Convert database records to WithdrawalMethod type
        const methods: WithdrawalMethod[] = data.map(item => ({
          id: item.id,
          user_id: item.user_id,
          method: item.method,
          label: item.label,
          address: item.address,
          is_default: item.is_default || false,
          created_at: item.created_at,
          updated_at: item.updated_at
        }));
        
        setWithdrawalMethods(methods);
        const defaultMethod = methods.find((m) => m.is_default);
        if (defaultMethod) {
          setSelectedMethod(defaultMethod);
        }
      }
    };

    if (isOpen && !isDemo) {
      fetchWithdrawalMethods();
    }
  }, [isOpen, isDemo]);

  const handleVirtualWithdrawal = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid withdrawal amount",
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
          name: "Virtual Withdrawal",
          withdrawal_method: selectedMethod?.method || "bank",
          withdrawal_address: selectedMethod?.address || "Demo Withdrawal"
        });

      if (transactionError) throw transactionError;

      // The wallet balance will be automatically updated by the trigger we created

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

  const handleWithdrawalMethodAdded = (newMethod: WithdrawalMethod) => {
    setWithdrawalMethods([...withdrawalMethods, newMethod]);
    setSelectedMethod(newMethod);
    setIsAddingMethod(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-none"
          variant="outline"
        >
          <ArrowDownToLine className="mr-2" /> Withdraw Funds
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-black border-green-900/20">
        <SheetHeader>
          <SheetTitle className="text-green-400">Withdraw Funds</SheetTitle>
          <SheetDescription className="text-green-400/80">
            Withdraw funds from your wallet to your preferred destination
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {isDemo ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-green-400/80">
                  Withdrawal Amount (USD)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="bg-green-900/10 border-green-900/20 text-green-400"
                />
              </div>
              <Button
                onClick={handleVirtualWithdrawal}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
              >
                {isProcessing ? "Processing..." : "Withdraw from Demo Wallet"}
              </Button>
            </div>
          ) : (
            <>
              {isAddingMethod ? (
                <WithdrawalMethodForm onComplete={handleWithdrawalMethodAdded} />
              ) : (
                <>
                  <div className="space-y-4">
                    {withdrawalMethods.length > 0 ? (
                      <>
                        <WithdrawalMethodList
                          methods={withdrawalMethods}
                          selectedMethodId={selectedMethod?.id}
                          onSelect={setSelectedMethod}
                        />
                        <Button
                          onClick={() => setIsAddingMethod(true)}
                          variant="outline"
                          className="w-full border-green-500/50 text-green-400 hover:bg-green-900/20"
                        >
                          <Plus className="mr-2 h-4 w-4" /> Add Withdrawal Method
                        </Button>
                      </>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-green-400/80 mb-4">
                          No withdrawal methods found. Add a method to continue.
                        </p>
                        <Button
                          onClick={() => setIsAddingMethod(true)}
                          variant="outline"
                          className="border-green-500/50 text-green-400 hover:bg-green-900/20"
                        >
                          <Plus className="mr-2 h-4 w-4" /> Add Withdrawal Method
                        </Button>
                      </div>
                    )}
                  </div>

                  {selectedMethod && (
                    <div className="space-y-4 pt-4 border-t border-green-900/20">
                      <div className="space-y-2">
                        <Label htmlFor="amount" className="text-green-400/80">
                          Withdrawal Amount (USD)
                        </Label>
                        <Input
                          id="amount"
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="Enter amount"
                          className="bg-green-900/10 border-green-900/20 text-green-400"
                        />
                      </div>
                      <Button
                        onClick={handleVirtualWithdrawal}
                        disabled={isProcessing}
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                      >
                        {isProcessing ? "Processing..." : "Withdraw Funds"}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
