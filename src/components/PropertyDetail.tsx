
import { useState } from 'react';
import { X, MapPin, Building, BedDouble, Bath, Maximize, Home, Calendar, DollarSign, Percent, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';

export type PropertyType = {
  id: number;
  address: string;
  city: string;
  state: string;
  type: string;
  units: number;
  occupancyRate: string;
  image: string;
  // Extended property details
  zipCode?: string;
  price?: number;
  sqft?: number;
  bedrooms?: number;
  bathrooms?: number;
  yearBuilt?: number;
  description?: string;
  amenities?: string[];
  agent?: {
    name: string;
    phone: string;
    email: string;
    image: string;
  };
};

interface PropertyDetailProps {
  property: PropertyType;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyDetail = ({ property, isOpen, onClose }: PropertyDetailProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'amenities' | 'contact'>('overview');

  const fullAddress = `${property.address}, ${property.city}, ${property.state}${property.zipCode ? ` ${property.zipCode}` : ''}`;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{property.address}</DialogTitle>
          <p className="text-gray-600">{property.city}, {property.state}</p>
        </DialogHeader>
        
        <div className="mt-4 relative">
          <div className="h-80 overflow-hidden rounded-lg">
            <img 
              src={property.image} 
              alt={property.address} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full shadow-md">
            <span className="font-semibold text-realestate-700">
              {property.price ? `$${property.price.toLocaleString()}` : 'Price on request'}
            </span>
          </div>
          
          <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-full shadow-md">
            <span className="font-semibold text-realestate-700">
              {property.type}
            </span>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex border-b">
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'border-b-2 border-realestate-700 text-realestate-700' : 'text-gray-600'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'amenities' ? 'border-b-2 border-realestate-700 text-realestate-700' : 'text-gray-600'}`}
              onClick={() => setActiveTab('amenities')}
            >
              Amenities
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'contact' ? 'border-b-2 border-realestate-700 text-realestate-700' : 'text-gray-600'}`}
              onClick={() => setActiveTab('contact')}
            >
              Contact
            </button>
          </div>
          
          {activeTab === 'overview' && (
            <div className="mt-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Building className="h-5 w-5 text-realestate-700 mb-1" />
                  <span className="text-sm text-gray-600">Property Type</span>
                  <span className="font-medium">{property.type}</span>
                </div>
                
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <BedDouble className="h-5 w-5 text-realestate-700 mb-1" />
                  <span className="text-sm text-gray-600">Bedrooms</span>
                  <span className="font-medium">{property.bedrooms || 'N/A'}</span>
                </div>
                
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Bath className="h-5 w-5 text-realestate-700 mb-1" />
                  <span className="text-sm text-gray-600">Bathrooms</span>
                  <span className="font-medium">{property.bathrooms || 'N/A'}</span>
                </div>
                
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Maximize className="h-5 w-5 text-realestate-700 mb-1" />
                  <span className="text-sm text-gray-600">Square Feet</span>
                  <span className="font-medium">{property.sqft ? property.sqft.toLocaleString() : 'N/A'}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Home className="h-5 w-5 text-realestate-700 mb-1" />
                  <span className="text-sm text-gray-600">Units</span>
                  <span className="font-medium">{property.units}</span>
                </div>
                
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-realestate-700 mb-1" />
                  <span className="text-sm text-gray-600">Year Built</span>
                  <span className="font-medium">{property.yearBuilt || 'N/A'}</span>
                </div>
                
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-realestate-700 mb-1" />
                  <span className="text-sm text-gray-600">Price/sqft</span>
                  <span className="font-medium">
                    {property.price && property.sqft 
                      ? `$${Math.round(property.price / property.sqft)}`
                      : 'N/A'
                    }
                  </span>
                </div>
                
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Percent className="h-5 w-5 text-realestate-700 mb-1" />
                  <span className="text-sm text-gray-600">Occupancy</span>
                  <span className="font-medium">{property.occupancyRate}</span>
                </div>
              </div>
              
              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    {property.description || 
                      `This ${property.type.toLowerCase()} is located at ${fullAddress}. 
                      It has ${property.units} unit${property.units > 1 ? 's' : ''} 
                      with a current occupancy rate of ${property.occupancyRate}.`
                    }
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <MapPin className="h-5 w-5 text-realestate-700 mr-2" />
                    <span className="text-gray-700">{fullAddress}</span>
                  </div>
                  <div className="h-60 bg-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Map view would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {activeTab === 'amenities' && (
            <div className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Property Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  {property.amenities && property.amenities.length > 0 ? (
                    <ul className="grid grid-cols-2 gap-2">
                      {property.amenities.map((amenity, index) => (
                        <li key={index} className="flex items-center">
                          <div className="h-2 w-2 bg-realestate-700 rounded-full mr-2"></div>
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No amenities information available for this property.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
          
          {activeTab === 'contact' && (
            <div className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Property Agent</CardTitle>
                </CardHeader>
                <CardContent>
                  {property.agent ? (
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                        <img 
                          src={property.agent.image} 
                          alt={property.agent.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{property.agent.name}</h4>
                        <div className="flex items-center text-gray-600 mb-1">
                          <Phone className="h-4 w-4 mr-2" />
                          {property.agent.phone}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Mail className="h-4 w-4 mr-2" />
                          {property.agent.email}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-600 mb-4">Contact our office for more information about this property.</p>
                      <Button>Contact Us</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={onClose} className="mr-2">Close</Button>
          <Button>Schedule a Viewing</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDetail;
