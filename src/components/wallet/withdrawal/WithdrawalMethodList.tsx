
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { WithdrawalMethod } from "./WithdrawalMethodForm";

export interface WithdrawalMethodListProps {
  methods: WithdrawalMethod[];
  selectedMethod: WithdrawalMethod | null;
  onSelect: (method: WithdrawalMethod) => void;
}

export const WithdrawalMethodList = ({
  methods,
  selectedMethod,
  onSelect,
}: WithdrawalMethodListProps) => {
  if (methods.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">No withdrawal methods added yet.</p>
      </div>
    );
  }

  return (
    <RadioGroup
      value={selectedMethod?.id}
      onValueChange={(value) => {
        const method = methods.find(m => m.id === value);
        if (method) onSelect(method);
      }}
      className="space-y-3"
    >
      {methods.map((method) => (
        <div
          key={method.id}
          className="flex items-center space-x-2 border p-3 rounded-lg"
        >
          <RadioGroupItem value={method.id} id={method.id} />
          <Label htmlFor={method.id} className="flex-1 cursor-pointer">
            <div className="font-medium">{method.label}</div>
            <div className="text-sm text-muted-foreground">
              {method.method === "bank"
                ? "Bank Account"
                : method.method === "paypal"
                  ? "PayPal"
                  : "Cryptocurrency"}
            </div>
            <div className="text-sm mt-1 font-mono">{method.address}</div>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};
