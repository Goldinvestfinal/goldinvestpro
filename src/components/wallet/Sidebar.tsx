import {
  Wallet,
  Send,
  Download,
  DollarSign,
  HelpCircle,
  Shield,
  FileText,
  Mail,
} from "lucide-react";

interface SidebarItemProps {
  icon: any;
  label: string;
}

const SidebarItem = ({ icon: Icon, label }: SidebarItemProps) => (
  <button className="w-full flex items-center gap-3 px-4 py-3 text-amber-400/80 hover:text-amber-400 hover:bg-amber-900/20 rounded-lg transition-colors">
    <Icon className="h-5 w-5" />
    <span className="font-medium">{label}</span>
  </button>
);

export const Sidebar = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="px-4 text-sm font-semibold text-amber-400/60 uppercase tracking-wider">
          Main Menu
        </h2>
        <div className="flex flex-col gap-1">
          <SidebarItem icon={Wallet} label="Accounts" />
          <SidebarItem icon={Send} label="Send" />
          <SidebarItem icon={Download} label="Receive" />
          <SidebarItem icon={DollarSign} label="Buy / Sell" />
        </div>
      </div>
    </div>
  );
};