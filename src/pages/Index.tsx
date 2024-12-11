import { Navbar } from "@/components/Navbar";
import { MainHero } from "@/components/MainHero";
import { GoldFeatures } from "@/components/GoldFeatures";
import { ProductShowcase } from "@/components/ProductShowcase";
import { GoldGuide } from "@/components/GoldGuide";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
      <div className="relative">
        <Navbar />
        <MainHero />
        <ProductShowcase />
        <GoldFeatures />
        <GoldGuide />
      </div>
    </div>
  );
};

export default Index;