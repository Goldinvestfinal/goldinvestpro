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

export const DepositSheet = () => {
  const [depositAddress] = useState("TBEkNj6ytcKScD6XYWTnTpwXYtS6H8MuXj");
  const { toast } = useToast();

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(depositAddress);
    toast({
      title: "Address copied",
      description: "The deposit address has been copied to your clipboard",
    });
  };

  return (
    <Sheet>
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
        </div>
      </SheetContent>
    </Sheet>
  );
};