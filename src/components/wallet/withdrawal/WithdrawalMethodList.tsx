import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { WithdrawalMethod } from "@/types/wallet";

type WithdrawalMethodListProps = {
  methods: WithdrawalMethod[];
  selectedMethod: string | null;
  onSelectMethod: (methodId: string) => void;
  onAddNew: () => void;
};

export const WithdrawalMethodList = ({
  methods,
  selectedMethod,
  onSelectMethod,
  onAddNew,
}: WithdrawalMethodListProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-amber-400">Withdrawal Methods</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onAddNew}
          className="text-amber-400 border-amber-900/20 hover:bg-amber-900/10"
        >
          <Plus className="h-4 w-4 mr-1" /> Add New
        </Button>
      </div>

      <RadioGroup
        value={selectedMethod || ""}
        onValueChange={onSelectMethod}
        className="space-y-2"
      >
        {methods?.map((method) => (
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

      {methods?.length === 0 && (
        <div className="text-center py-6 text-amber-400/60">
          No withdrawal methods added yet
        </div>
      )}
    </div>
  );
};