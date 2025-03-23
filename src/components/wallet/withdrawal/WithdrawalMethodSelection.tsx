
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Plus } from "lucide-react";
import { WithdrawalMethod } from "@/types/wallet";
import { WithdrawalMethodForm } from "./WithdrawalMethodForm";
import { WithdrawalMethodList } from "./WithdrawalMethodList";

interface WithdrawalMethodSelectionProps {
  withdrawalMethods: WithdrawalMethod[];
  selectedMethod: WithdrawalMethod | null;
  setSelectedMethod: (method: WithdrawalMethod) => void;
  onBack: () => void;
  onSubmit: () => void;
  isWithdrawing: boolean;
  amount: string;
}

export const WithdrawalMethodSelection = ({
  withdrawalMethods,
  selectedMethod,
  setSelectedMethod,
  onBack,
  onSubmit,
  isWithdrawing,
  amount,
}: WithdrawalMethodSelectionProps) => {
  const [showNewMethodForm, setShowNewMethodForm] = useState(false);

  const handleMethodAdded = (newMethod: WithdrawalMethod) => {
    setSelectedMethod(newMethod);
    setShowNewMethodForm(false);
  };

  return (
    <div className="space-y-4">
      {showNewMethodForm ? (
        <WithdrawalMethodForm onComplete={handleMethodAdded} />
      ) : (
        <>
          <WithdrawalMethodList
            methods={withdrawalMethods}
            selectedMethod={selectedMethod}
            onSelect={setSelectedMethod}
          />

          <div className="flex flex-col space-y-2">
            <Button
              variant="outline"
              onClick={() => setShowNewMethodForm(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Method
            </Button>

            <Button
              onClick={onSubmit}
              disabled={isWithdrawing || !selectedMethod}
              className="w-full"
            >
              {isWithdrawing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>Withdraw ${parseFloat(amount).toFixed(2)}</>
              )}
            </Button>
          </div>
        </>
      )}

      {!showNewMethodForm ? (
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Amount
        </Button>
      ) : (
        <Button variant="ghost" onClick={() => setShowNewMethodForm(false)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Methods
        </Button>
      )}
    </div>
  );
};
