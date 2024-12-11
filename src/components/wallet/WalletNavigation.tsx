import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet, Send, Download, DollarSign } from "lucide-react";

export const WalletNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Wallet, label: "Accounts", path: "/wallet/accounts" },
    { icon: Send, label: "Send", path: "/wallet/send" },
    { icon: Download, label: "Receive", path: "/wallet/receive" },
    { icon: DollarSign, label: "Buy / Sell", path: "/wallet/trade" },
  ];

  return (
    <div className="mb-8 flex flex-wrap gap-4">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link key={item.path} to={item.path}>
            <Button
              variant={isActive ? "default" : "outline"}
              className={`flex items-center gap-2 ${
                isActive ? "bg-amber-400 hover:bg-amber-500 text-black" : "text-amber-400 border-amber-400/20 hover:bg-amber-400/10"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        );
      })}
    </div>
  );
};