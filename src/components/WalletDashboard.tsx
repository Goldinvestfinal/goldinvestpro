import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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

const SidebarItem = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </button>
);

export const WalletDashboard = () => {
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [timeRange, setTimeRange] = useState("Day");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="w-8 h-8 bg-purple-600 rounded-full" />
          <span className="text-xl font-semibold">Safepark</span>
        </div>

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
            <span className="text-gray-400">Favorite</span>
            <button className="text-gray-400 hover:text-white">+</button>
          </div>
          <div className="space-y-1">
            <SidebarItem icon={Bitcoin} label="BTC" />
            <SidebarItem icon={Coins} label="ETH" />
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
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 mt-12 lg:mt-0">
          <Card className="bg-zinc-900/50 border-white/10 p-6">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="h-5 w-5" />
              <h3 className="text-lg">Buy / Sell</h3>
            </div>
            <p className="text-gray-400">Buy and sell with robust providers</p>
          </Card>
          <Card className="bg-zinc-900/50 border-white/10 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Repeat className="h-5 w-5" />
              <h3 className="text-lg">Swap</h3>
            </div>
            <p className="text-gray-400">Crypto to crypto conversion</p>
          </Card>
        </div>

        {/* Balance Overview */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <h2 className="text-2xl">Total balance</h2>
            <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-3 py-1 rounded-full text-sm">
              <span>10%</span>
              <span>+21,427.29</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-8">$214,272.90</h1>
        </div>

        {/* Chart */}
        <Card className="bg-zinc-900/50 border-white/10 p-4 lg:p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h3 className="text-lg">Balance</h3>
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

        {/* Demo Mode Toggle */}
        <div className="flex items-center justify-end gap-2">
          <span className="text-sm text-gray-400">Demo Mode</span>
          <Switch checked={isDemoMode} onCheckedChange={setIsDemoMode} />
        </div>
      </main>
    </div>
  );
};