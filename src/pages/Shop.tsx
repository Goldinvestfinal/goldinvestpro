import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Premium Gold Nugget Collection",
    price: 3250,
    image: "/lovable-uploads/041c2f1c-3578-49a1-84d1-79c7f1ec8180.png",
    description: "A stunning collection of natural gold nuggets, each piece showcasing unique crystalline structures and pure golden hues. Perfect for collectors and investors.",
  },
  {
    id: 2,
    name: "Large Natural Gold Specimen",
    price: 4890,
    image: "/lovable-uploads/08553672-042d-4e87-a372-c4af3b0ab22e.png",
    description: "An exceptional large-scale natural gold nugget featuring intricate surface patterns and impressive weight. A rare find for serious collectors.",
  },
  {
    id: 3,
    name: "Hand-Selected Gold Nugget",
    price: 3975,
    image: "/lovable-uploads/2a92cb7d-8a8b-4a4a-9927-3abb7d3fcb90.png",
    description: "A premium hand-selected gold nugget with remarkable texture and natural formation. Each piece tells a unique story of its geological journey.",
  },
  {
    id: 4,
    name: "Crystalline Gold Formation",
    price: 4200,
    image: "/lovable-uploads/724a4372-941a-4c72-ac41-721e32d1553b.png",
    description: "A spectacular crystalline gold formation showcasing nature's artistry. Features unique cavities and structural patterns that collectors prize.",
  }
];

const Shop = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900">Natural Gold Nuggets</h1>
          <p className="mt-4 text-lg text-gray-600">Rare and unique specimens for collectors and investors</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="aspect-square relative overflow-hidden rounded-t-lg bg-black">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
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
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white" 
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