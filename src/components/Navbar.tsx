import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-black/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-yellow-500">GoldInvest</Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/shop" className="text-gray-300 hover:text-yellow-500 transition-colors">Shop</Link>
            <a href="#features" className="text-gray-300 hover:text-yellow-500 transition-colors">Features</a>
            <Link to="/wallet" className="text-gray-300 hover:text-yellow-500 transition-colors">Wallet</Link>
            <a href="#testimonials" className="text-gray-300 hover:text-yellow-500 transition-colors">Testimonials</a>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">Get Started</Button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/shop" className="block px-3 py-2 text-gray-300 hover:text-yellow-500 transition-colors">Shop</Link>
              <a href="#features" className="block px-3 py-2 text-gray-300 hover:text-yellow-500 transition-colors">Features</a>
              <Link to="/wallet" className="block px-3 py-2 text-gray-300 hover:text-yellow-500 transition-colors">Wallet</Link>
              <a href="#testimonials" className="block px-3 py-2 text-gray-300 hover:text-yellow-500 transition-colors">Testimonials</a>
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black mt-4">Get Started</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};