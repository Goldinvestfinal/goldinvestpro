import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

const products = [
  {
    id: 1,
    name: "Premium Gold Bar Stack",
    price: 12500,
    image: "/lovable-uploads/4b91beea-675c-43b8-8852-f22882a7eab7.png",
    description: "A collection of premium 999.9 fine gold bars, each meticulously crafted and certified. Perfect for serious investors seeking substantial gold holdings.",
  },
  {
    id: 2,
    name: "Gold Bar Secure Box Set",
    price: 8900,
    image: "/lovable-uploads/f000ec9f-ad71-4b0f-8dd8-10601cc71028.png",
    description: "Professionally packaged gold bars in secure boxes. Each bar comes with authentication certificates and secure storage solutions.",
  },
  {
    id: 3,
    name: "Suisse Fine Gold Kilo Bars",
    price: 15750,
    image: "/lovable-uploads/d1cf53da-3f7d-40fc-8541-52d1cc7a2b69.png",
    description: "Premium 1 kilo Suisse gold bars featuring 999.9 fine gold purity. Each bar is serialized and comes with full certification.",
  },
  {
    id: 4,
    name: "Credit Suisse 10oz Gold Bar",
    price: 6890,
    image: "/lovable-uploads/b15e42b1-a7f6-4f8c-81bf-d75c919d7adc.png",
    description: "10oz Credit Suisse gold bar in protective case. Features 999.9 fine gold purity with unique serial number and certification.",
  },
  {
    id: 5,
    name: "Investment Gold Bar Collection",
    price: 9250,
    image: "/lovable-uploads/5df227b0-486b-4a8e-a8a2-f314545950eb.png",
    description: "A diverse collection of investment-grade gold bars. Each piece is certified 999.9 pure gold with official mint markings.",
  }
];

const Shop = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gold">Premium Gold Collection</h1>
          <p className="mt-4 text-lg text-gray-400">Certified investment-grade gold bars for discerning investors</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="bg-gray-900 border-gold/20 hover:border-gold/40 transition-colors">
              <CardHeader>
                <div className="aspect-square relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <h2 className="text-xl font-semibold text-gold mb-2">{product.name}</h2>
                <p className="text-gray-400 mb-4 h-24 overflow-hidden">{product.description}</p>
                <p className="text-2xl font-bold text-gold">${product.price.toLocaleString()}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-gold hover:bg-gold-light text-black font-semibold" 
                  onClick={() => navigate("/wallet")}
                >
                  Purchase Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;