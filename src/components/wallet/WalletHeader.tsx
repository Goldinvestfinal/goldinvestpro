
import { CreditCard, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WalletHeaderProps {
  balance: number;
  currency: string;
  isDemo: boolean;
}

export const WalletHeader = ({ balance, currency, isDemo }: WalletHeaderProps) => {
  return (
    <Card className={`border ${isDemo ? 'border-blue-500/30 bg-blue-500/5' : 'border-gold/30 bg-gold/5'}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-1 flex items-center">
              {isDemo ? (
                <>
                  <CreditCard className="mr-2 h-5 w-5 text-blue-400" />
                  <span>Demo Wallet</span>
                </>
              ) : (
                <>
                  <DollarSign className="mr-2 h-5 w-5 text-gold" />
                  <span>Real Money Wallet</span>
                </>
              )}
            </h2>
            <div className="text-3xl font-bold">
              {currency} {balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {isDemo 
                ? "Practice with virtual funds - no real money involved"
                : "Your actual balance for real transactions"
              }
            </p>
          </div>
          
          <div className={`text-2xl font-bold ${isDemo ? 'text-blue-400' : 'text-gold'}`}>
            <TrendingUp size={32} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
