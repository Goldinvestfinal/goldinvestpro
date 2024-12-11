import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Wallet from "./pages/Wallet";
import WalletAccounts from "./pages/wallet/WalletAccounts";
import WalletSend from "./pages/wallet/WalletSend";
import WalletReceive from "./pages/wallet/WalletReceive";
import WalletTrade from "./pages/wallet/WalletTrade";
import { Footer } from "./components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/wallet/accounts" element={<WalletAccounts />} />
              <Route path="/wallet/send" element={<WalletSend />} />
              <Route path="/wallet/receive" element={<WalletReceive />} />
              <Route path="/wallet/trade" element={<WalletTrade />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;