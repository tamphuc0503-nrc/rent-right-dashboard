
import React from 'react';
import { Building, BedDouble, Bath, Maximize, Home, Calendar, DollarSign, Percent, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PropertyDetailType } from '@/types/propertyDetail';

interface PropertyOverviewProps {
  property: PropertyDetailType;
}

const PropertyOverview: React.FC<PropertyOverviewProps> = ({ property }) => {
  const fullAddress = `${property.address}, ${property.city}, ${property.state}${property.zipCode ? ` ${property.zipCode}` : ''}`;

  return (
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
  );
};

export default PropertyOverview;
