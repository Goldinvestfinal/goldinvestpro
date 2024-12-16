import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

// Using the same products from the Shop page
const products = [
  {
    id: 2,
    name: "999.9 Gold Bars Set",
    price: 5890,
    image: "/lovable-uploads/a527d2d8-983c-4d29-87a2-a80f46074d28.png",
  },
  {
    id: 3,
    name: "Investment Grade Gold Bars",
    price: 7450,
    image: "/lovable-uploads/b97b6dfd-433f-44b7-9d69-f03a6c6caa32.png",
  },
  {
    id: 4,
    name: "Gold Jewelry Collection",
    price: 3975,
    image: "/lovable-uploads/1ad797c5-99e1-4876-a3ed-12da958c6a06.png",
  },
].slice(0, 3); // Only showing first 3 products in showcase

export const ProductShowcase = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-black py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif mb-12 text-center">Featured Products</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-yellow-500 text-2xl mb-4">${product.price.toLocaleString()}</p>
                <Button 
                  className="w-full bg-yellow-500 hover:bg-yellow-600"
                  onClick={() => navigate("/shop")}
                >
                  Buy
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};