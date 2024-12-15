import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { WithdrawalMethodList } from "./WithdrawalMethodList";
import { WithdrawalMethodForm } from "./WithdrawalMethodForm";

export const WithdrawalSheet = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isAddingMethod, setIsAddingMethod] = useState(false);
  const { toast } = useToast();

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
              <WithdrawalMethodList
                methods={withdrawalMethods || []}
                selectedMethod={selectedMethod}
                onSelectMethod={setSelectedMethod}
                onAddNew={() => setIsAddingMethod(true)}
              />

              <Button
                onClick={handleWithdrawal}
                disabled={!selectedMethod}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
              >
                Withdraw Funds
              </Button>

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
            <WithdrawalMethodForm
              onSuccess={() => {
                setIsAddingMethod(false);
                refetchMethods();
              }}
              onCancel={() => setIsAddingMethod(false)}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};