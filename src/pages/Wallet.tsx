import { Navbar } from "@/components/Navbar";
import { WalletDashboard } from "@/components/WalletDashboard";
import { ProfileManager } from "@/components/profile/ProfileManager";

const Wallet = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-6 space-y-8">
        <ProfileManager />
        <WalletDashboard />
      </div>
    </div>
  );
};

export default Wallet;