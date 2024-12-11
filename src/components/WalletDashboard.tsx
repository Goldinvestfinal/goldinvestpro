import { useState } from "react";
import { Menu, X } from "lucide-react";
import { WalletHeader } from "./wallet/WalletHeader";
import { QuickActions } from "./wallet/QuickActions";
import { TransactionHistory } from "./wallet/TransactionHistory";
import { Sidebar } from "./wallet/Sidebar";

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

export const WalletDashboard = () => {
  const [isRealWallet, setIsRealWallet] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentBalance = isRealWallet ? 0 : 10000;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 text-amber-400 hover:bg-amber-900/20 rounded-lg"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:relative w-64 h-full border-r border-amber-900/20 p-4 space-y-8 bg-black transition-transform duration-300 z-40`}
      >
        <Sidebar />
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
        <WalletHeader
          isRealWallet={isRealWallet}
          setIsRealWallet={setIsRealWallet}
          currentBalance={currentBalance}
        />
        <QuickActions />
        <TransactionHistory transactions={mockTransactions} />

        {/* Footer */}
        <footer className="border-t border-amber-900/20 pt-8 pb-4">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-amber-400/80">
            <a href="#" className="hover:text-amber-400">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-amber-400">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-amber-400">Contact Us</a>
          </div>
        </footer>
      </main>
    </div>
  );
};