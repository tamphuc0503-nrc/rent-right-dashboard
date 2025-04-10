
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Home, Users, Briefcase, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-realestate-950 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Property Management Simplified
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              Streamline your property management with our all-in-one platform. 
              Save time, reduce stress, and grow your business.
            </p>
            <div className="mt-10 flex justify-center gap-x-6">
              <Link to="/signup">
                <Button className="bg-realestate-600 hover:bg-realestate-700 text-white px-8 py-6 text-lg">
                  Get Started
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything you need to manage your properties
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools you need to efficiently manage properties, tenants, vendors, and landlords.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-full bg-realestate-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Home className="h-6 w-6 text-realestate-700" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Property Management</h3>
                <p className="mt-2 text-gray-600">
                  Easily track and manage all your properties in one place with detailed information and analytics.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-full bg-realestate-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-realestate-700" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Tenant Management</h3>
                <p className="mt-2 text-gray-600">
                  Keep track of all your tenants, their leases, payments, and maintenance requests in a single dashboard.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-full bg-realestate-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-realestate-700" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Vendor Management</h3>
                <p className="mt-2 text-gray-600">
                  Find, manage, and pay vendors for maintenance and repairs with our streamlined system.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-full bg-realestate-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Key className="h-6 w-6 text-realestate-700" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Landlord Portal</h3>
                <p className="mt-2 text-gray-600">
                  Provide landlords with a dedicated portal to view their properties, tenants, and financial reports.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Pricing Section Brief */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that's right for your property management needs
            </p>
            <div className="mt-10">
              <Link to="/pricing">
                <Button className="bg-realestate-700 hover:bg-realestate-800 text-white">
                  View Pricing Plans <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              What our customers say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <p className="italic text-gray-600 mb-4">
                  "RentRight has revolutionized how we manage our properties. Everything is now organized and accessible in one place."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Property Manager, NYC</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <p className="italic text-gray-600 mb-4">
                  "The tenant management features have saved us countless hours and improved our tenant satisfaction rates."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Michael Rodriguez</p>
                    <p className="text-sm text-gray-500">Landlord, Miami</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <p className="italic text-gray-600 mb-4">
                  "As a landlord with multiple properties, RentRight gives me peace of mind knowing everything is tracked and managed efficiently."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Emily Chen</p>
                    <p className="text-sm text-gray-500">Property Owner, Seattle</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-realestate-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to simplify your property management?
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              Join thousands of property managers who have streamlined their operations with RentRight.
            </p>
            <div className="mt-8">
              <Link to="/signup">
                <Button className="bg-white text-realestate-900 hover:bg-gray-100 px-8 py-3 text-lg">
                  Start Your Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/about" className="text-gray-600 hover:text-gray-900">About Us</Link></li>
                <li><Link to="/careers" className="text-gray-600 hover:text-gray-900">Careers</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/articles" className="text-gray-600 hover:text-gray-900">Articles</Link></li>
                <li><Link to="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
                <li><Link to="/help" className="text-gray-600 hover:text-gray-900">Help Center</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Connect</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Twitter</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">LinkedIn</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Facebook</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-500 text-center">&copy; 2025 RentRight. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
