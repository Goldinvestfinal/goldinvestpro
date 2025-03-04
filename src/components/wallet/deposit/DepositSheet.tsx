
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DepositSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  walletId: string | number;
  isDemo: boolean;
  onSuccess: () => Promise<void>;
}

const formSchema = z.object({
  amount: z.string().min(1, "Amount is required").refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    { message: "Amount must be a positive number" }
  ),
  method: z.enum(["card", "bank_transfer", "demo"]),
});

export const DepositSheet = ({ open, onOpenChange, walletId, isDemo, onSuccess }: DepositSheetProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      method: isDemo ? "demo" : "card",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      const amount = Number(values.amount);
      
      // For a real app, you would integrate with a payment processor here
      // For demo purposes, we'll just create a transaction and update the balance directly
      
      // 1. Create a transaction record
      const { data: transactionData, error: transactionError } = await supabase
        .from("transactions")
        .insert({
          wallet_id: walletId,
          type: "deposit",
          amount: amount,
          status: isDemo ? "completed" : "pending", // Demo transactions complete instantly
          details: `Deposit via ${values.method === "demo" ? "demo" : values.method === "card" ? "credit card" : "bank transfer"}`,
        })
        .select();

      if (transactionError) throw transactionError;

      // 2. Update wallet balance immediately for demo wallets
      if (isDemo) {
        const { error: walletError } = await supabase
          .from("wallets")
          .update({ balance: supabase.rpc("increment_balance", { amount_to_add: amount, wallet_id_param: walletId }) })
          .eq("id", walletId);

        if (walletError) throw walletError;
      }

      await onSuccess();
      onOpenChange(false);
      form.reset();

      toast({
        title: isDemo ? "Deposit Successful" : "Deposit Initiated",
        description: isDemo 
          ? `$${amount} has been added to your demo wallet.`
          : `Your deposit of $${amount} has been initiated and is pending approval.`,
      });
      
    } catch (error) {
      console.error("Deposit error:", error);
      toast({
        variant: "destructive",
        title: "Deposit Failed",
        description: "There was an error processing your deposit. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Deposit Funds</SheetTitle>
          <SheetDescription>
            {isDemo
              ? "Add virtual funds to your demo wallet."
              : "Add funds to your wallet to start investing."}
          </SheetDescription>
        </SheetHeader>

        <div className="py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

              {!isDemo && (
                <FormField
                  control={form.control}
                  name="method"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Payment Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="card" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Credit Card
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="bank_transfer" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Bank Transfer
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : `Deposit ${form.watch("amount") ? `$${form.watch("amount")}` : ""}`}
              </Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};
