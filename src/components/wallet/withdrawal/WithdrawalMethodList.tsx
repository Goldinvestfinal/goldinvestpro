
import { CreditCard, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WithdrawalMethod {
  id: string;
  type: string;
  account_number: string;
  bank_name?: string;
  card_last4?: string;
  is_default?: boolean;
}

interface WithdrawalMethodListProps {
  methods: WithdrawalMethod[];
  onSelect: (methodId: string) => void;
  onAddNew: () => void;
  onBack: () => void;
}

export const WithdrawalMethodList = ({ 
  methods, 
  onSelect, 
  onAddNew, 
  onBack 
}: WithdrawalMethodListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Select Withdrawal Method</h3>
      
      {methods.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-muted-foreground mb-4">No withdrawal methods found</p>
          <Button onClick={onAddNew} variant="outline" className="mx-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Withdrawal Method
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {methods.map((method) => (
            <Card 
              key={method.id}
              className="p-4 cursor-pointer hover:bg-accent/50 flex justify-between items-center"
              onClick={() => onSelect(method.id)}
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">
                    {method.type === "bank" ? "Bank Account" : "Credit Card"}
                    {method.is_default && " (Default)"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {method.type === "bank" 
                      ? `${method.bank_name} ****${method.account_number.slice(-4)}` 
                      : `Card ending in ${method.card_last4}`}
                  </p>
                </div>
              </div>
            </Card>
          ))}
          
          <Button onClick={onAddNew} variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add New Method
          </Button>
        </div>
      )}
      
      <div className="pt-4">
        <Button variant="ghost" onClick={onBack} className="w-full">
          Back
        </Button>
      </div>
    </div>
  );
};
