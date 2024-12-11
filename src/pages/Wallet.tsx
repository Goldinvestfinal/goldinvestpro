import { useNavigate } from "react-router-dom";
import { Wallet, Send, Download, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";

const WalletPage = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Wallet, label: "Accounts", path: "/wallet/accounts" },
    { icon: Send, label: "Send", path: "/wallet/send" },
    { icon: Download, label: "Receive", path: "/wallet/receive" },
    { icon: DollarSign, label: "Buy / Sell", path: "/wallet/trade" },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white p-4 lg:p-8">
        <h1 className="text-3xl font-bold text-amber-400 mb-8">Wallet Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="h-32 bg-amber-900/20 hover:bg-amber-900/30 border border-amber-900/20 flex flex-col items-center justify-center gap-2 text-amber-400"
            >
              <item.icon className="h-8 w-8" />
              <span className="text-lg">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default WalletPage;