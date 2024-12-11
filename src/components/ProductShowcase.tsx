import { Button } from "./ui/button";

const products = [
  {
    name: "Archangel Michael Gold Bar",
    price: 2842.00,
    image: "/lovable-uploads/0a372b40-b9d7-4537-a616-a01f4c0e7d86.png",
  },
  {
    name: "The Great Britannia Gold Bar",
    price: 3445.00,
    image: "/lovable-uploads/3dc2def8-f864-48d0-ba0d-c1a5a4a593df.png",
  },
  {
    name: "PAMP Gold Bar",
    price: 2891.00,
    image: "/lovable-uploads/16fcc8de-a86a-41b7-907f-0946c7ee17bd.png",
  },
];

export const ProductShowcase = () => {
  return (
    <section className="bg-black py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif mb-12 text-center">Featured Products</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.name} className="bg-gray-900 rounded-lg overflow-hidden">
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
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600">
                  Invest Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};