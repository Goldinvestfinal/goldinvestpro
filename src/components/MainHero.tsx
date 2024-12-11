import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const MainHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-16 bg-background">
      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-6xl md:text-8xl font-serif">GOLD IS <span className="italic text-gold">THE</span><br />TRUTH CURRENCY</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">Gold provides stability against inflation and economic uncertainty, unlike fiat & crypto which can be easily devalued through monetary printing, news and network shutdown.</p>
        <div className="flex justify-center gap-4">
          <Button 
            size="lg"
            className="bg-gold hover:bg-gold-light text-black font-semibold px-8"
            onClick={() => navigate("/shop")}
          >
            Buy Now
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-gold text-gold hover:bg-gold/10"
            onClick={() => navigate("/wallet")}
          >
            Invest
          </Button>
        </div>
      </div>
    </section>
  );
};