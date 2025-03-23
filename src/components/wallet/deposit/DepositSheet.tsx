
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DollarSign, Copy, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

interface DepositSheetProps {
  walletId: string;
  isDemo: boolean;
  onSuccess: () => void;
}

export const DepositSheet = ({ walletId, isDemo, onSuccess }: DepositSheetProps) => {
  const [depositAddress] = useState("TBEkNj6ytcKScD6XYWTnTpwXYtS6H8MuXj");
  const [amount, setAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(depositAddress);
    toast({
      title: "Address copied",
      description: "The deposit address has been copied to your clipboard",
    });
  };

  const handleVirtualDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid deposit amount",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Create transaction record
      const { error: transactionError } = await supabase
        .from("transactions")
        .insert({
          wallet_id: walletId,
          type: "deposit",
          amount: parseFloat(amount),
          status: "Completed",
          name: "Virtual Deposit"
        });

      if (transactionError) throw transactionError;

      // Update wallet balance
      const { data, error: walletError } = await supabase
        .from("wallets")
        .update({ balance: supabase.rpc('get_user_wallet_balance', { user_id: walletId }) + parseFloat(amount) })
        .eq("id", walletId)
        .select();

      if (walletError) throw walletError;

      toast({
        title: "Deposit successful",
        description: `$${amount} has been added to your wallet`,
      });
      
      setAmount("");
      setIsOpen(false);
      onSuccess();
    } catch (error) {
      console.error("Deposit error:", error);
      toast({
        title: "Deposit failed",
        description: "There was an error processing your deposit",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
          {isDemo ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-amber-400/80">Deposit Amount (USD)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="bg-amber-900/10 border-amber-900/20 text-amber-400"
                />
              </div>
              <Button 
                onClick={handleVirtualDeposit}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
              >
                {isProcessing ? "Processing..." : "Deposit to Demo Wallet"}
              </Button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
