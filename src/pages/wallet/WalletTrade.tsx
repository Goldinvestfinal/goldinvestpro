import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { WalletNavigation } from "@/components/wallet/WalletNavigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const WalletTrade = () => {
  const [amount, setAmount] = useState("");
  const [tradeType, setTradeType] = useState("buy");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Trade Initiated",
      description: `${tradeType === 'buy' ? 'Buying' : 'Selling'} ${amount} gold`,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="p-4 lg:p-8 pt-20">
        <h1 className="text-2xl font-bold text-amber-400 mb-8">Buy/Sell Gold</h1>
        <WalletNavigation />
        <form onSubmit={handleSubmit} className="max-w-md space-y-6">
          <div className="space-y-2">
            <Label htmlFor="trade-type">Trade Type</Label>
            <Select value={tradeType} onValueChange={setTradeType}>
              <SelectTrigger className="bg-amber-900/20 border-amber-900/20 text-white">
                <SelectValue placeholder="Select trade type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">Buy</SelectItem>
                <SelectItem value="sell">Sell</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (in ounces)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-amber-900/20 border-amber-900/20 text-white"
              placeholder="Enter amount"
            />
          </div>
          <Button 
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-500 text-black"
          >
            {tradeType === 'buy' ? 'Buy Gold' : 'Sell Gold'}
          </Button>
        </form>
      </main>
    </div>
  );
};

export default WalletTrade;