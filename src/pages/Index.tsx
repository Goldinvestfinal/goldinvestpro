import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { WalletDashboard } from "@/components/WalletDashboard";
import { Testimonials } from "@/components/Testimonials";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <WalletDashboard />
      <Testimonials />
    </div>
  );
};

export default Index;