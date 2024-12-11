import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DollarSign, Download } from "lucide-react";

export const QuickActions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
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
            <SheetDescription className="text-amber-400/80">Add funds to your wallet. Minimum deposit: $300</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

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
              Withdraw your funds weekly, monthly, or yearly
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};