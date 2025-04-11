
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PropertyTypeIcon } from '@/components/property/PropertyTypeIcon';
import { PropertyDetailType } from '@/types/propertyDetail';

interface PropertyCardProps {
  property: PropertyDetailType;
  onClick: (property: PropertyDetailType) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" 
      onClick={() => onClick(property)}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.address} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg text-gray-900">{property.address}</h3>
        <p className="text-gray-600">{property.city}, {property.state}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <PropertyTypeIcon type={property.type} className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-600">{property.type}</span>
          </div>
          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
            {property.occupancyRate}
          </span>
        </div>
        <div className="flex justify-between mt-4">
          <span className="text-sm text-gray-600">{property.units} Unit{property.units > 1 ? 's' : ''}</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              onClick(property);
            }}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
