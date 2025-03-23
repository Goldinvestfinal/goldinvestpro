
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface WithdrawalMethod {
  id: string;
  user_id: string;
  method: "bank" | "paypal" | "crypto";
  label: string;
  address: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface WithdrawalMethodFormProps {
  onComplete: (newMethod: WithdrawalMethod) => void;
}

export const WithdrawalMethodForm = ({ onComplete }: WithdrawalMethodFormProps) => {
  const [methodType, setMethodType] = useState<"bank" | "paypal" | "crypto">("bank");
  const [label, setLabel] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("withdrawal_methods")
        .insert({
          user_id: user.id,
          method: methodType,
          label,
          address,
          is_default: false,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Withdrawal method added successfully",
      });

      if (data) {
        onComplete(data);
      }
    } catch (error) {
      console.error("Error adding withdrawal method:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add withdrawal method. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Method Type</Label>
        <RadioGroup
          value={methodType}
          onValueChange={(value) => setMethodType(value as "bank" | "paypal" | "crypto")}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bank" id="bank" />
            <Label htmlFor="bank">Bank Transfer</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="paypal" id="paypal" />
            <Label htmlFor="paypal">PayPal</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="crypto" id="crypto" />
            <Label htmlFor="crypto">Cryptocurrency</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="label">Label (e.g., "My Bank Account")</Label>
        <Input
          id="label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">
          {methodType === "bank"
            ? "Account Number"
            : methodType === "paypal"
              ? "PayPal Email"
              : "Wallet Address"}
        </Label>
        <Input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          placeholder={
            methodType === "bank"
              ? "XXXXXXXXXXXXXXXX"
              : methodType === "paypal"
                ? "email@example.com"
                : "0x..."
          }
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add Method"}
      </Button>
    </form>
  );
};
