import { Navbar } from "@/components/Navbar";
import { MainHero } from "@/components/MainHero";
import { GoldFeatures } from "@/components/GoldFeatures";
import { ProductShowcase } from "@/components/ProductShowcase";
import { GoldGuide } from "@/components/GoldGuide";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <MainHero />
      <GoldFeatures />
      <ProductShowcase />
      <GoldGuide />
    </div>
  );
};

export default Index;