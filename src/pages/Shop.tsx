import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Search, Filter, ChevronDown } from "lucide-react";
import { PriceHistoryChart } from "@/components/PriceHistoryChart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const products = [
  {
    id: 2,
    name: "999.9 Gold Bars Set",
    price: 5890,
    image: "/lovable-uploads/a527d2d8-983c-4d29-87a2-a80f46074d28.png",
    description: "High-purity gold bars featuring detailed engravings and certification marks. Each bar is individually serialized and verified.",
  },
  {
    id: 3,
    name: "Investment Grade Gold Bars",
    price: 7450,
    image: "/lovable-uploads/b97b6dfd-433f-44b7-9d69-f03a6c6caa32.png",
    description: "Premium investment-grade gold bars with official mint certification. Ideal for serious investors and collectors.",
  },
  {
    id: 4,
    name: "Gold Jewelry Collection",
    price: 3975,
    image: "/lovable-uploads/1ad797c5-99e1-4876-a3ed-12da958c6a06.png",
    description: "Exquisite collection of pure gold jewelry pieces. Each item is carefully crafted and certified for authenticity.",
  },
  {
    id: 5,
    name: "Gold Bars in Secure Box",
    price: 4200,
    image: "/lovable-uploads/c21c0a9f-3486-4b9b-8bdb-689c340de5dc.png",
    description: "Premium gold bars delivered in a secure, sealed box. Complete with certification and authenticity guarantees.",
  },
  {
    id: 6,
    name: "Premium Gold Bar Stack",
    price: 12500,
    image: "/lovable-uploads/4b91beea-675c-43b8-8852-f22882a7eab7.png",
    description: "A collection of premium 999.9 fine gold bars, each meticulously crafted and certified. Perfect for serious investors seeking substantial gold holdings.",
  },
  {
    id: 7,
    name: "Gold Bar Secure Box Set",
    price: 8900,
    image: "/lovable-uploads/f000ec9f-ad71-4b0f-8dd8-10601cc71028.png",
    description: "Professionally packaged gold bars in secure boxes. Each bar comes with authentication certificates and secure storage solutions.",
  },
  {
    id: 8,
    name: "Suisse Fine Gold Kilo Bars",
    price: 15750,
    image: "/lovable-uploads/d1cf53da-3f7d-40fc-8541-52d1cc7a2b69.png",
    description: "Premium 1 kilo Suisse gold bars featuring 999.9 fine gold purity. Each bar is serialized and comes with full certification.",
  },
  {
    id: 9,
    name: "Credit Suisse 10oz Gold Bar",
    price: 6890,
    image: "/lovable-uploads/b15e42b1-a7f6-4f8c-81bf-d75c919d7adc.png",
    description: "10oz Credit Suisse gold bar in protective case. Features 999.9 fine gold purity with unique serial number and certification.",
  },
  {
    id: 10,
    name: "Investment Gold Bar Collection",
    price: 9250,
    image: "/lovable-uploads/5df227b0-486b-4a8e-a8a2-f314545950eb.png",
    description: "A diverse collection of investment-grade gold bars. Each piece is certified 999.9 pure gold with official mint markings.",
  }
];

const Shop = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black">
          <img 
            src="/lovable-uploads/7798e27a-edc7-4260-aa26-01a7b75992c6.png"
            alt="Gold Investment"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-gold mb-4">Premium Gold Collection</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Discover our exclusive selection of investment-grade precious metals, 
            carefully curated for discerning investors.
          </p>
        </div>
      </div>

      {/* Price Chart Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <PriceHistoryChart />
      </div>

      {/* Filters Section */}
      <div className="bg-gray-900/50 border-y border-gold/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gold/20 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:border-gold/40"
              />
            </div>
            
            <div className="flex gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gold/20 rounded-lg text-gray-200 hover:border-gold/40">
                  <Filter size={20} />
                  Filter
                  <ChevronDown size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 border border-gold/20">
                  <DropdownMenuItem className="text-gray-200 hover:bg-gray-700">Price: Low to High</DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-200 hover:bg-gray-700">Price: High to Low</DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-200 hover:bg-gray-700">Newest First</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className="bg-gray-900/50 backdrop-blur-sm border-gold/20 hover:border-gold/40 transition-all duration-300 group"
            >
              <CardHeader className="p-0">
                <div className="aspect-square relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gold mb-2">{product.name}</h2>
                <p className="text-gray-400 mb-4 line-clamp-3">{product.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gold">${product.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-400">USD</span>
                </div>
              </CardContent>
              
              <CardFooter className="p-6 pt-0">
                <Button 
                  className="w-full bg-gold hover:bg-gold-dark text-black font-semibold transform hover:scale-105 transition-all duration-300" 
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