import {
  LayoutDashboard,
  Wallet,
  Send,
  Download,
  DollarSign,
  Repeat,
  Smartphone,
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
  <button className="w-full flex items-center gap-3 px-4 py-2 text-purple-300 hover:text-purple-100 hover:bg-purple-800/20 rounded-lg transition-colors">
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </button>
);

export const Sidebar = () => {
  return (
    <div className="space-y-8">
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
          <span className="text-purple-300">Quick Links</span>
        </div>
        <div className="space-y-1">
          <SidebarItem icon={HelpCircle} label="FAQs" />
          <SidebarItem icon={Shield} label="Security" />
          <SidebarItem icon={FileText} label="Terms" />
          <SidebarItem icon={Mail} label="Contact" />
        </div>
      </div>
    </div>
  );
};