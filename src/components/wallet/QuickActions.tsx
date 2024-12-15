import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DollarSign, Download, Copy, Info, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const withdrawalMethodSchema = z.object({
  method: z.enum(["crypto", "paypal", "bank"]),
  label: z.string().min(1, "Label is required"),
  address: z.string().min(1, "Address is required"),
});

export const QuickActions = () => {
  const [depositAddress] = useState("TBEkNj6ytcKScD6XYWTnTpwXYtS6H8MuXj");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isAddingMethod, setIsAddingMethod] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(withdrawalMethodSchema),
    defaultValues: {
      method: "crypto",
      label: "",
      address: "",
    },
  });

  // Fetch user's withdrawal methods
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

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(depositAddress);
    toast({
      title: "Address copied",
      description: "The deposit address has been copied to your clipboard",
    });
  };

  const onSubmitWithdrawalMethod = async (values: z.infer<typeof withdrawalMethodSchema>) => {
    try {
      const { error } = await supabase
        .from("withdrawal_methods")
        .insert([values]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Withdrawal method added successfully",
      });
      
      setIsAddingMethod(false);
      form.reset();
      refetchMethods();
    } catch (error) {
      console.error("Error adding withdrawal method:", error);
      toast({
        title: "Error",
        description: "Failed to add withdrawal method",
        variant: "destructive",
      });
    }
  };

  const handleWithdrawal = async () => {
    if (!selectedMethod) {
      toast({
        title: "Error",
        description: "Please select a withdrawal method",
        variant: "destructive",
      });
      return;
    }

    // Here you would implement the actual withdrawal logic
    toast({
      title: "Withdrawal initiated",
      description: "Your withdrawal request has been submitted",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white border-none" 
            variant="outline"
          >
            <DollarSign className="mr-2" /> Deposit Funds
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-black border-amber-900/20">
          <SheetHeader>
            <SheetTitle className="text-amber-400">Deposit Funds</SheetTitle>
            <SheetDescription className="text-amber-400/80">
              Add funds to your wallet. Minimum deposit: $300
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-amber-400/80">Deposit Address</label>
              <div className="relative">
                <Input
                  value={depositAddress}
                  readOnly
                  className="pr-10 bg-amber-900/10 border-amber-900/20 text-amber-400"
                />
                <button
                  onClick={handleCopyAddress}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-400/60 hover:text-amber-400"
                >
                  <Copy size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-amber-400/80">Minimum deposit</span>
                <span className="text-amber-400">More than $300 USD</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-amber-400/80">Wallet Selected</span>
                <span className="text-amber-400 flex items-center">
                  Investment Wallet <Info size={14} className="ml-1" />
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-amber-400/80">Credited (Trading enabled)</span>
                <span className="text-amber-400">After 1 network confirmation</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-amber-400/80">Unlocked (Withdrawal enabled)</span>
                <span className="text-amber-400">After 1 network confirmation</span>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-amber-900/20">
              <p className="text-sm text-amber-400/80">Important Notes:</p>
              <ul className="text-xs space-y-2 text-amber-400/60">
                <li>• Do not send NFTs to this address</li>
                <li>• Do not transact with Sanctioned Entities</li>
                <li>• Deposits via smart contracts are not supported with the exception of approved networks</li>
              </ul>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet>
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
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-amber-400">Withdrawal Methods</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsAddingMethod(true)}
                      className="text-amber-400 border-amber-900/20 hover:bg-amber-900/10"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add New
                    </Button>
                  </div>

                  <RadioGroup
                    value={selectedMethod || ""}
                    onValueChange={setSelectedMethod}
                    className="space-y-2"
                  >
                    {withdrawalMethods?.map((method) => (
                      <div
                        key={method.id}
                        className="flex items-center space-x-2 rounded-lg border border-amber-900/20 p-4"
                      >
                        <RadioGroupItem
                          value={method.id}
                          id={method.id}
                          className="border-amber-400 text-amber-400"
                        />
                        <Label
                          htmlFor={method.id}
                          className="flex-1 cursor-pointer text-amber-400"
                        >
                          <div className="font-medium">{method.label}</div>
                          <div className="text-sm text-amber-400/60">
                            {method.method} - {method.address}
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  {withdrawalMethods?.length === 0 && (
                    <div className="text-center py-6 text-amber-400/60">
                      No withdrawal methods added yet
                    </div>
                  )}

                  <Button
                    onClick={handleWithdrawal}
                    disabled={!selectedMethod}
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
                  >
                    Withdraw Funds
                  </Button>
                </div>

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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitWithdrawalMethod)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="method"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-amber-400">Method</FormLabel>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-3 gap-4"
                        >
                          <div>
                            <RadioGroupItem
                              value="crypto"
                              id="crypto"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="crypto"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-amber-900/20 bg-black p-4 hover:bg-amber-900/10 peer-data-[state=checked]:border-amber-400 cursor-pointer"
                            >
                              <span className="text-sm font-medium text-amber-400">Crypto</span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem
                              value="paypal"
                              id="paypal"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="paypal"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-amber-900/20 bg-black p-4 hover:bg-amber-900/10 peer-data-[state=checked]:border-amber-400 cursor-pointer"
                            >
                              <span className="text-sm font-medium text-amber-400">PayPal</span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem
                              value="bank"
                              id="bank"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="bank"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-amber-900/20 bg-black p-4 hover:bg-amber-900/10 peer-data-[state=checked]:border-amber-400 cursor-pointer"
                            >
                              <span className="text-sm font-medium text-amber-400">Bank</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-amber-400">Label</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-amber-900/10 border-amber-900/20 text-amber-400"
                            placeholder="e.g., My Binance Wallet"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-amber-400">Address</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-amber-900/10 border-amber-900/20 text-amber-400"
                            placeholder="Enter withdrawal address"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddingMethod(false)}
                      className="flex-1 text-amber-400 border-amber-900/20 hover:bg-amber-900/10"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
                    >
                      Add Method
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};