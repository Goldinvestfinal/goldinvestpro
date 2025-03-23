
import { Navbar } from "@/components/Navbar";
import { WalletDashboard } from "@/components/WalletDashboard";
import { ProfileManager } from "@/components/profile/ProfileManager";
import { VirtualNotifications } from "@/components/VirtualNotifications";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

const Wallet = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>My Wallet - GoldInvestPro</title>
        <meta name="description" content="Manage your investment wallet, deposit funds, and make withdrawals" />
      </Helmet>
      <Navbar />
      <div className="container mx-auto py-6 space-y-8">
        <ProfileManager />
        <WalletDashboard />
        <VirtualNotifications />
      </div>
    </div>
  );
};

export default Wallet;
