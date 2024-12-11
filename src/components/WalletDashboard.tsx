import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  LayoutDashboard,
  Wallet,
  Send,
  Download,
  DollarSign,
  Repeat,
  Smartphone,
  Star,
  Bitcoin,
  Coins,
  Menu,
  X,
  HelpCircle,
  Shield,
  FileText,
  Mail,
} from "lucide-react";

const mockChartData = [
  { time: "15:00", value: 60000 },
  { time: "19:00", value: 180000 },
  { time: "23:00", value: 80000 },
  { time: "03:00", value: 140000 },
  { time: "07:00", value: 120000 },
  { time: "11:00", value: 220000 },
  { time: "15:00", value: 200000 },
];

const mockTransactions = [
  {
    date: "2024-03-11",
    type: "Deposit",
    amount: 500,
    status: "Completed",
  },
  {
    date: "2024-03-10",
    type: "Withdrawal",
    amount: 200,
    status: "Pending",
  },
  {
    date: "2024-03-09",
    type: "Deposit",
    amount: 1000,
    status: "Completed",
  },
];

const SidebarItem = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </button>
);

export const WalletDashboard = () => {
  const [isRealWallet, setIsRealWallet] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [timeRange, setTimeRange] = useState("Day");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const currentBalance = isRealWallet ? 0 : 10000;

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 text-white hover:bg-white/10 rounded-lg"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:relative w-64 h-full border-r border-white/10 p-4 space-y-8 bg-black transition-transform duration-300 z-40`}
      >
        <div className="space-y-1">
          <SidebarItem icon={LayoutDashboard} label="Portfolio" />
          <SidebarItem icon={Wallet} label="Accounts" />
          <SidebarItem icon={Send} label="Send" />
          <SidebarItem icon={Download} label="Receive" />
          <SidebarItem icon={DollarSign} label="Buy / Sell" />
          <SidebarItem icon={Repeat} label="Swap" />
          <SidebarItem icon={Smartphone} label="Device" />
        </div>

        <div>
          <div className="flex items-center justify-between px-4 mb-2">
            <span className="text-gray-400">Quick Links</span>
          </div>
          <div className="space-y-1">
            <SidebarItem icon={HelpCircle} label="FAQs" />
            <SidebarItem icon={Shield} label="Security" />
            <SidebarItem icon={FileText} label="Terms" />
            <SidebarItem icon={Mail} label="Contact" />
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 w-full lg:ml-0 overflow-x-hidden">
        {/* Wallet Overview */}
        <div className="mb-8 mt-12 lg:mt-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl mb-2">Wallet Overview</h2>
              <p className="text-gray-400">Manage your investments effortlessly</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">
                {isRealWallet ? "Real Wallet" : "Demo Wallet"}
              </span>
              <Switch
                checked={isRealWallet}
                onCheckedChange={setIsRealWallet}
              />
            </div>
          </div>

          <Card className="bg-zinc-900/50 border-white/10 p-6 mb-6">
            <h3 className="text-lg mb-2">Current Balance</h3>
            <h1 className="text-4xl font-bold">${currentBalance.toLocaleString()}</h1>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="w-full" variant="outline">
                  <DollarSign className="mr-2" /> Deposit Funds
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Deposit Funds</SheetTitle>
                  <SheetDescription>
                    Add funds to your wallet. Minimum deposit: $300
                  </SheetDescription>
                </SheetHeader>
                {/* Add deposit form here */}
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button className="w-full" variant="outline">
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
                {/* Add withdrawal form here */}
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Transaction History */}
        <Card className="bg-zinc-900/50 border-white/10 p-6 mb-8">
          <h3 className="text-lg mb-4">Transaction History</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>${transaction.amount}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          transaction.status === "Completed"
                            ? "bg-green-500/20 text-green-500"
                            : "bg-yellow-500/20 text-yellow-500"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Chart */}
        <Card className="bg-zinc-900/50 border-white/10 p-4 lg:p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h3 className="text-lg">Balance History</h3>
            <div className="flex flex-wrap gap-2">
              {["Day", "Week", "Month", "Year", "All"].map((range) => (
                <button
                  key={range}
                  className={`px-3 py-1 rounded-full text-sm ${
                    timeRange === range
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setTimeRange(range)}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData}>
                <XAxis
                  dataKey="time"
                  stroke="#666"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#666"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value / 1000}K`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-zinc-800 border border-white/10 p-2 rounded-lg">
                          <p className="text-white">
                            ${payload[0].value.toLocaleString()}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#FF6B4A"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Footer */}
        <footer className="border-t border-white/10 pt-8 pb-4">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Contact Us</a>
          </div>
        </footer>
      </main>
    </div>
  );
};