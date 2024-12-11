import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed w-full bg-background/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gold">
              GOLDINVEST
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/shop" 
              className={`${isActive('/shop') ? 'text-gold' : 'text-gray-300'} hover:text-gold transition-colors`}
            >
              Shop
            </Link>
            <Link 
              to="/wallet" 
              className={`${isActive('/wallet') ? 'text-gold' : 'text-gray-300'} hover:text-gold transition-colors`}
            >
              Wallet
            </Link>
            <Button className="bg-gold hover:bg-gold-dark text-black">Get Started</Button>
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
              <Link 
                to="/shop" 
                className={`block px-3 py-2 ${isActive('/shop') ? 'text-gold' : 'text-gray-300'} hover:text-gold transition-colors`}
              >
                Shop
              </Link>
              <Link 
                to="/wallet" 
                className={`block px-3 py-2 ${isActive('/wallet') ? 'text-gold' : 'text-gray-300'} hover:text-gold transition-colors`}
              >
                Wallet
              </Link>
              <Button className="w-full bg-gold hover:bg-gold-dark text-black mt-4">Get Started</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};