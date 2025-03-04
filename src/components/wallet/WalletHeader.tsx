import { Switch } from "@/components/ui/switch";

interface WalletHeaderProps {
  isRealWallet: boolean;
  setIsRealWallet: (value: boolean) => void;
  currentBalance: number;
}

export const WalletHeader = ({
  isRealWallet,
  setIsRealWallet,
  currentBalance,
}: WalletHeaderProps) => {
  return (
    <div className="mb-8 mt-12 lg:mt-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl mb-2 text-amber-400">Wallet Overview</h2>
          <p className="text-amber-400/80">Manage your investments effortlessly</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-amber-400/80">
            {isRealWallet ? "Real Wallet" : "Demo Wallet"}
          </span>
          <Switch checked={isRealWallet} onCheckedChange={setIsRealWallet} />
        </div>
      </div>

      <div className="bg-gradient-to-br from-amber-900/20 to-amber-800/10 border border-amber-900/20 rounded-lg p-6 mb-6 backdrop-blur-sm">
        <h3 className="text-lg mb-2 text-amber-400">Current Balance</h3>
        <h1 className="text-4xl font-bold text-amber-400">
          ${currentBalance.toLocaleString()}
        </h1>
      </div>
    </div>
  );
};