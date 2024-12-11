import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "1oz Gold Britannia",
    price: 2000,
    image: "/lovable-uploads/0a372b40-b9d7-4537-a616-a01f4c0e7d86.png",
    description: "The Royal Mint's flagship gold bullion coin",
  },
  {
    id: 2,
    name: "Gold Phoenix Bar",
    price: 1950,
    image: "/lovable-uploads/3dc2def8-f864-48d0-ba0d-c1a5a4a593df.png",
    description: "Limited edition gold bar featuring a majestic phoenix design",
  },
  {
    id: 3,
    name: "PAMP Gold Bar",
    price: 1900,
    image: "/lovable-uploads/16fcc8de-a86a-41b7-907f-0946c7ee17bd.png",
    description: "Swiss-made premium gold bar with Lady Fortuna design",
  },
];

const Shop = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900">Gold Investment Products</h1>
          <p className="mt-4 text-lg text-gray-600">Start investing from just $300</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="aspect-square relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2">{product.name}</CardTitle>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-2xl font-bold text-primary">${product.price.toLocaleString()}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => navigate("/wallet")}
                >
                  Invest Now
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