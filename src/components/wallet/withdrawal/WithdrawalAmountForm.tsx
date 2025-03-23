
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WithdrawalAmountFormProps {
  amount: string;
  setAmount: (amount: string) => void;
  onContinue: () => void;
}

export const WithdrawalAmountForm = ({
  amount,
  setAmount,
  onContinue,
}: WithdrawalAmountFormProps) => {
  return (
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
        onClick={onContinue}
        disabled={!amount || parseFloat(amount) <= 0}
        className="w-full"
      >
        Continue
      </Button>
    </div>
  );
};
