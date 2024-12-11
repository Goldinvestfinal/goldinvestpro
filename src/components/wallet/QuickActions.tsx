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
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-none" 
            variant="outline"
          >
            <DollarSign className="mr-2" /> Deposit Funds
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Deposit Funds</SheetTitle>
            <SheetDescription>Add funds to your wallet. Minimum deposit: $300</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button 
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-none" 
            variant="outline"
          >
            <Download className="mr-2" /> Withdraw Funds
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Withdraw Funds</SheetTitle>
            <SheetDescription>
              Withdraw your funds weekly, monthly, or yearly
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};