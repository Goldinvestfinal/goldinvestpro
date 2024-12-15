import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const withdrawalMethodSchema = z.object({
  method: z.enum(["crypto", "paypal", "bank"] as const),
  label: z.string().min(1, "Label is required"),
  address: z.string().min(1, "Address is required"),
});

type WithdrawalMethodFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

export const WithdrawalMethodForm = ({ onSuccess, onCancel }: WithdrawalMethodFormProps) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof withdrawalMethodSchema>>({
    resolver: zodResolver(withdrawalMethodSchema),
    defaultValues: {
      method: "crypto",
      label: "",
      address: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof withdrawalMethodSchema>) => {
    try {
      const { error } = await supabase
        .from("withdrawal_methods")
        .insert(values);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Withdrawal method added successfully",
      });
      
      form.reset();
      onSuccess();
    } catch (error) {
      console.error("Error adding withdrawal method:", error);
      toast({
        title: "Error",
        description: "Failed to add withdrawal method",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            onClick={onCancel}
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
  );
};