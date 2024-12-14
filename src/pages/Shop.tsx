import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

// Initialize Cloudinary
const cld = new Cloudinary({
  cloud: {
    cloudName: "demo" // Replace with your cloud name
  }
});

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
  },
  {
    id: 5,
    name: "Massive Gold Nugget Specimen",
    price: 5890,
    image: "/lovable-uploads/d282a498-6500-4dca-8fea-3abcceafd335.png",
    description: "An impressive large gold nugget with exceptional purity and natural formations. This specimen showcases the raw beauty of natural gold.",
  },
  {
    id: 6,
    name: "Premium Gold Nugget Collection",
    price: 4750,
    image: "/lovable-uploads/0a2b8f87-c21a-4936-a6ee-d1593c3f65e4.png",
    description: "A carefully curated collection of high-quality gold nuggets, each piece displaying unique characteristics and natural beauty.",
  },
  {
    id: 7,
    name: "Natural Gold Formation",
    price: 3950,
    image: "/lovable-uploads/27933b3b-200c-4d04-98f1-47ca790bc3c6.png",
    description: "A remarkable natural gold formation with intricate patterns and textures. Perfect for collectors seeking unique specimens.",
  }
];

const Shop = () => {
  const navigate = useNavigate();

  const optimizeImage = (imagePath: string) => {
    // Extract the filename from the path
    const filename = imagePath.split('/').pop() || '';
    return cld.image(filename)
      .format('auto')
      .quality('auto')
      .resize(fill().width(500).height(500).gravity(autoGravity()));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900">Natural Gold Nuggets</h1>
          <p className="mt-4 text-lg text-gray-600">Rare and unique specimens for collectors and investors</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="aspect-square relative overflow-hidden rounded-t-lg bg-black">
                  <AdvancedImage 
                    cldImg={optimizeImage(product.image)}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    alt={product.name}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-2xl font-bold text-primary">${product.price.toLocaleString()}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white" 
                  onClick={() => navigate("/wallet")}
                >
                  Buy
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