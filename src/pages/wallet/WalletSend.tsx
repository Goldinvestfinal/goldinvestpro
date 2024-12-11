import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const WalletSend = () => {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Transaction Initiated",
      description: `Sending ${amount} to ${address}`,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 lg:p-8">
      <h1 className="text-2xl font-bold text-amber-400 mb-8">Send Funds</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-6">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-amber-900/20 border-amber-900/20 text-white"
            placeholder="Enter amount"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Recipient Address</Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-amber-900/20 border-amber-900/20 text-white"
            placeholder="Enter recipient address"
          />
        </div>
        <Button 
          type="submit"
          className="w-full bg-amber-400 hover:bg-amber-500 text-black"
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default WalletSend;