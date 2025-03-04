import { Navbar } from "@/components/Navbar";
import { WalletDashboard } from "@/components/WalletDashboard";
import { ProfileManager } from "@/components/profile/ProfileManager";
import { VirtualNotifications } from "@/components/VirtualNotifications";

const Wallet = () => {
  return (
    <div className="min-h-screen bg-background">
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