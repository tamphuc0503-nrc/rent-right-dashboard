
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <h1 className="text-xl font-bold text-realestate-900">RentRight</h1>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/services" className="text-sm font-medium text-gray-700 hover:text-realestate-700 transition-colors">
              Services
            </Link>
            <Link to="/pricing" className="text-sm font-medium text-gray-700 hover:text-realestate-700 transition-colors">
              Pricing
            </Link>
            <Link to="/articles" className="text-sm font-medium text-gray-700 hover:text-realestate-700 transition-colors">
              Articles
            </Link>
            <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-realestate-700 transition-colors">
              About Us
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/signin">
              <Button variant="outline" className="border-realestate-500 text-realestate-700 hover:bg-realestate-50">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-realestate-700 hover:bg-realestate-800 text-white">
                Sign Up
              </Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="space-y-1 px-4 py-3">
            <Link to="/services" className="block py-2 text-base font-medium text-gray-700 hover:text-realestate-700">
              Services
            </Link>
            <Link to="/pricing" className="block py-2 text-base font-medium text-gray-700 hover:text-realestate-700">
              Pricing
            </Link>
            <Link to="/articles" className="block py-2 text-base font-medium text-gray-700 hover:text-realestate-700">
              Articles
            </Link>
            <Link to="/about" className="block py-2 text-base font-medium text-gray-700 hover:text-realestate-700">
              About Us
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <Link to="/signin" className="w-full">
                  <Button variant="outline" className="w-full border-realestate-500 text-realestate-700">
                    Sign In
                  </Button>
                </Link>
              </div>
              <div className="mt-3">
                <Link to="/signup" className="w-full">
                  <Button className="w-full bg-realestate-700 hover:bg-realestate-800 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
