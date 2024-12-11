import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DollarSign, ArrowUpRight, ArrowDownRight, ChevronDown, Search } from "lucide-react";

export const WalletDashboard = () => {
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [selectedWallet, setSelectedWallet] = useState("Wallet 1");

  return (
    <section className="min-h-screen bg-black text-white p-4 md:p-6">
      <div className="max-w-md mx-auto">
        {/* Wallet Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">{selectedWallet}</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
          <Search className="h-5 w-5 text-gray-400" />
        </div>

        {/* Balance Card */}
        <Card className="bg-black border-none shadow-none mb-8">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-2">
                <span>0xSwift...5zkr2</span>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
              </div>
              <h1 className="text-4xl font-bold mb-6">$189.50</h1>
              <div className="flex gap-4 justify-center">
                <Button 
                  className="flex-1 bg-[#CCFF00] hover:bg-[#CCFF00]/90 text-black font-semibold rounded-full"
                >
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Send
                </Button>
                <Button 
                  className="flex-1 bg-[#6366F1] hover:bg-[#6366F1]/90 text-white font-semibold rounded-full"
                >
                  <ArrowDownRight className="mr-2 h-4 w-4" />
                  Receive
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assets List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#CCFF00] rounded-full flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-black" />
              </div>
              <div>
                <h3 className="font-semibold">USDO</h3>
                <p className="text-sm text-gray-400">20.5907 USDO</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">$20.59</p>
              <p className="text-sm text-green-400">+0.04%</p>
            </div>
          </div>

          {/* Demo Mode Toggle */}
          <div className="flex items-center justify-end gap-2 mt-4">
            <span className="text-sm text-gray-400">Demo Mode</span>
            <Switch checked={isDemoMode} onCheckedChange={setIsDemoMode} />
          </div>
        </div>
      </div>
    </section>
  );
};