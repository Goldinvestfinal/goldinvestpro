import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed w-full bg-background/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/e6b7b342-7ae3-40a6-8f84-5fb6104b51cb.png" 
                alt="GoldInvest Logo" 
                className="h-8 w-auto"
              />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/shop" 
              className={`${isActive('/shop') ? 'text-gold' : 'text-gray-300'} hover:text-gold transition-colors`}
            >
              Shop
            </Link>
            {isAuthenticated && (
              <Link 
                to="/wallet" 
                className={`${isActive('/wallet') ? 'text-gold' : 'text-gray-300'} hover:text-gold transition-colors`}
              >
                Wallet
              </Link>
            )}
            {isAuthenticated ? (
              <Button onClick={handleLogout} className="bg-gold hover:bg-gold-dark text-black">
                Logout
              </Button>
            ) : (
              <Button onClick={() => navigate("/auth")} className="bg-gold hover:bg-gold-dark text-black">
                Login
              </Button>
            )}
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
              {isAuthenticated && (
                <Link 
                  to="/wallet" 
                  className={`block px-3 py-2 ${isActive('/wallet') ? 'text-gold' : 'text-gray-300'} hover:text-gold transition-colors`}
                >
                  Wallet
                </Link>
              )}
              {isAuthenticated ? (
                <Button 
                  onClick={handleLogout}
                  className="w-full bg-gold hover:bg-gold-dark text-black mt-4"
                >
                  Logout
                </Button>
              ) : (
                <Button 
                  onClick={() => navigate("/auth")}
                  className="w-full bg-gold hover:bg-gold-dark text-black mt-4"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};