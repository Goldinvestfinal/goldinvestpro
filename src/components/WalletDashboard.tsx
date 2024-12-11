import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";

export const WalletDashboard = () => {
  const [isDemoMode, setIsDemoMode] = useState(true);

  return (
    <section id="wallet" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Your Wallet</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Demo Mode</span>
            <Switch checked={isDemoMode} onCheckedChange={setIsDemoMode} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-primary text-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2" />
                Total Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">$25,000.00</p>
              <p className="text-sm opacity-80">+15% this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Button className="flex-1" variant="outline">
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Deposit
              </Button>
              <Button className="flex-1" variant="outline">
                <ArrowDownRight className="mr-2 h-4 w-4" />
                Withdraw
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Gold Purchase</p>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                    <span className="text-green-600">+$500.00</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};