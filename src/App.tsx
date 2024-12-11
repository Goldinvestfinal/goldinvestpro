import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import Wallet from "./pages/Wallet";
import WalletAccounts from "./pages/wallet/WalletAccounts";
import WalletSend from "./pages/wallet/WalletSend";
import WalletReceive from "./pages/wallet/WalletReceive";
import WalletTrade from "./pages/wallet/WalletTrade";
import { Footer } from "./components/Footer";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};

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
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/wallet"
                element={
                  <ProtectedRoute>
                    <Wallet />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wallet/accounts"
                element={
                  <ProtectedRoute>
                    <WalletAccounts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wallet/send"
                element={
                  <ProtectedRoute>
                    <WalletSend />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wallet/receive"
                element={
                  <ProtectedRoute>
                    <WalletReceive />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wallet/trade"
                element={
                  <ProtectedRoute>
                    <WalletTrade />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;