
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface WithdrawalMethodFormProps {
  onSuccess: () => Promise<void>;
  onCancel: () => void;
}

const bankSchema = z.object({
  type: z.literal("bank"),
  bank_name: z.string().min(1, "Bank name is required"),
  account_number: z.string().min(1, "Account number is required"),
  routing_number: z.string().min(1, "Routing number is required"),
  account_holder: z.string().min(1, "Account holder name is required"),
  is_default: z.boolean().default(false),
});

const cardSchema = z.object({
  type: z.literal("card"),
  card_number: z.string().min(16, "Card number must be at least 16 digits"),
  expiry_date: z.string().min(1, "Expiry date is required"),
  cvv: z.string().min(3, "CVV is required"),
  card_holder: z.string().min(1, "Card holder name is required"),
  is_default: z.boolean().default(false),
});

const formSchema = z.discriminatedUnion("type", [bankSchema, cardSchema]);

export const WithdrawalMethodForm = ({ onSuccess, onCancel }: WithdrawalMethodFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "bank",
      is_default: false,
    } as z.infer<typeof formSchema>,
  });

  const watchType = form.watch("type");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      let methodData: any = {
        user_id: user.id,
        type: values.type,
        is_default: values.is_default,
      };

      if (values.type === "bank") {
        methodData = {
          ...methodData,
          bank_name: values.bank_name,
          account_number: values.account_number,
          routing_number: values.routing_number,
          account_holder: values.account_holder,
        };
      } else {
        // For a real application, you would use a secure payment processor
        // Never store full card details in your database
        methodData = {
          ...methodData,
          card_last4: values.card_number.slice(-4),
          card_holder: values.card_holder,
          expiry_date: values.expiry_date,
        };
      }

      const { error } = await supabase
        .from("withdrawal_methods")
        .insert(methodData);

      if (error) throw error;

      await onSuccess();
      form.reset();

      toast({
        title: "Method Added",
        description: "Your withdrawal method has been added successfully.",
      });
      
    } catch (error) {
      console.error("Error adding withdrawal method:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error adding your withdrawal method. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Add Withdrawal Method</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Method Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value as "bank" | "card")}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="bank" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Bank Account
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="card" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Credit Card
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchType === "bank" ? (
            <>
              <FormField
                control={form.control}
                name="bank_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter bank name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="account_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter account number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="routing_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Routing Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter routing number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="account_holder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Holder Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter account holder name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : (
            <>
              <FormField
                control={form.control}
                name="card_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter card number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="expiry_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="MM/YY" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="CVV" type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="card_holder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Holder Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter card holder name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="is_default"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox 
                    checked={field.value} 
                    onCheckedChange={field.onChange} 
                  />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer">
                  Set as default withdrawal method
                </FormLabel>
              </FormItem>
            )}
          />

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Method"}
            </Button>
            <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
