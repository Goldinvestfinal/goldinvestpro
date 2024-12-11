import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary">GoldInvest</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-primary transition-colors">Features</a>
            <a href="#wallet" className="text-gray-700 hover:text-primary transition-colors">Wallet</a>
            <a href="#testimonials" className="text-gray-700 hover:text-primary transition-colors">Testimonials</a>
            <Button>Get Started</Button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors">Features</a>
              <a href="#wallet" className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors">Wallet</a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors">Testimonials</a>
              <Button className="w-full mt-4">Get Started</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};