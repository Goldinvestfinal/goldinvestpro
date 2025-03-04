
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { WithdrawalMethodList } from "./WithdrawalMethodList";
import { WithdrawalMethodForm } from "./WithdrawalMethodForm";

interface WithdrawalSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  walletId: string | number;
  isDemo: boolean;
  onSuccess: () => Promise<void>;
}

const formSchema = z.object({
  amount: z.string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    }),
  methodId: z.string().optional(),
});

export const WithdrawalSheet = ({ open, onOpenChange, walletId, isDemo, onSuccess }: WithdrawalSheetProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"amount" | "method" | "add-method">("amount");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      methodId: undefined,
    },
  });

  // Get current balance
  const { data: wallet } = useQuery({
    queryKey: ["wallet", walletId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wallets")
        .select("balance")
        .eq("id", walletId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: open,
  });

  // Get withdrawal methods
  const { data: withdrawalMethods, refetch: refetchMethods } = useQuery({
    queryKey: ["withdrawal-methods"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("withdrawal_methods")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;
      return data || [];
    },
    enabled: open && step === "method",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      const amount = Number(values.amount);
      const balance = wallet?.balance || 0;
      
      // Check if sufficient balance
      if (amount > balance) {
        toast({
          variant: "destructive",
          title: "Insufficient Balance",
          description: `You only have $${balance.toLocaleString()} available.`,
        });
        setIsSubmitting(false);
        return;
      }
      
      // For a real app, you would integrate with a payment processor here
      // For now, we'll just create a transaction and update the balance
      
      // 1. Create a transaction record
      const { data: transactionData, error: transactionError } = await supabase
        .from("transactions")
        .insert({
          wallet_id: walletId,
          type: "withdrawal",
          amount: amount,
          status: isDemo ? "completed" : "pending", // Demo transactions complete instantly
          details: isDemo ? "Demo withdrawal" : `Withdrawal to ${values.methodId}`,
        })
        .select();

      if (transactionError) throw transactionError;

      // 2. Update wallet balance immediately for demo wallets
      if (isDemo) {
        const { error: walletError } = await supabase
          .from("wallets")
          .update({ balance: supabase.rpc("decrement_balance", { amount_to_subtract: amount, wallet_id_param: walletId }) })
          .eq("id", walletId);

        if (walletError) throw walletError;
      }

      await onSuccess();
      onOpenChange(false);
      setStep("amount");
      form.reset();

      toast({
        title: isDemo ? "Withdrawal Successful" : "Withdrawal Initiated",
        description: isDemo 
          ? `$${amount} has been withdrawn from your demo wallet.`
          : `Your withdrawal of $${amount} has been initiated and is pending approval.`,
      });
      
    } catch (error) {
      console.error("Withdrawal error:", error);
      toast({
        variant: "destructive",
        title: "Withdrawal Failed",
        description: "There was an error processing your withdrawal. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinue = () => {
    if (!form.watch("amount") || Number(form.watch("amount")) <= 0) {
      form.setError("amount", { 
        type: "manual", 
        message: "Please enter a valid amount" 
      });
      return;
    }

    const amount = Number(form.watch("amount"));
    const balance = wallet?.balance || 0;
    
    if (amount > balance) {
      form.setError("amount", { 
        type: "manual", 
        message: `Insufficient balance. Available: $${balance.toLocaleString()}` 
      });
      return;
    }

    if (isDemo) {
      // For demo wallets, we can skip the method selection
      onSubmit(form.getValues());
    } else {
      setStep("method");
    }
  };

  const handleMethodSelect = (methodId: string) => {
    form.setValue("methodId", methodId);
    onSubmit(form.getValues());
  };

  const handleAddMethodSuccess = async () => {
    await refetchMethods();
    setStep("method");
  };

  const resetSheet = () => {
    setStep("amount");
    form.reset();
  };

  return (
    <Sheet open={open} onOpenChange={(newOpen) => {
      if (!newOpen) resetSheet();
      onOpenChange(newOpen);
    }}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Withdraw Funds</SheetTitle>
          <SheetDescription>
            {isDemo
              ? "Withdraw virtual funds from your demo wallet."
              : "Withdraw funds from your wallet to your bank account."}
          </SheetDescription>
        </SheetHeader>

        <div className="py-6">
          {step === "amount" && (
            <Form {...form}>
              <form onSubmit={(e) => { e.preventDefault(); handleContinue(); }} className="space-y-6">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input 
                            {...field} 
                            placeholder="Enter amount" 
                            className="pl-9" 
                            type="number"
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="text-sm text-muted-foreground">
                  Available balance: ${wallet?.balance?.toLocaleString() || "0"}
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Continue"}
                </Button>
              </form>
            </Form>
          )}

          {step === "method" && (
            <WithdrawalMethodList 
              methods={withdrawalMethods || []} 
              onSelect={handleMethodSelect}
              onAddNew={() => setStep("add-method")}
              onBack={() => setStep("amount")}
            />
          )}

          {step === "add-method" && (
            <WithdrawalMethodForm 
              onSuccess={handleAddMethodSuccess}
              onCancel={() => setStep("method")}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
