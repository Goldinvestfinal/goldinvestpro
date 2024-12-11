import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Navbar } from "@/components/Navbar";
import { WalletNavigation } from "@/components/wallet/WalletNavigation";

const WalletReceive = () => {
  const { toast } = useToast();
  const walletAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="p-4 lg:p-8 pt-20">
        <h1 className="text-2xl font-bold text-amber-400 mb-8">Receive Funds</h1>
        <WalletNavigation />
        <div className="max-w-md space-y-6">
          <div className="p-4 bg-amber-900/20 rounded-lg break-all">
            {walletAddress}
          </div>
          <Button 
            onClick={copyToClipboard}
            className="w-full bg-amber-400 hover:bg-amber-500 text-black"
          >
            Copy Address
          </Button>
        </div>
      </main>
    </div>
  );
};

export default WalletReceive;