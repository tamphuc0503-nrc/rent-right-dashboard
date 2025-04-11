
import React from 'react';
import { PropertyDetailType } from '@/types/propertyDetail';

interface PropertyHeaderProps {
  property: PropertyDetailType;
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({ property }) => {
  return (
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
  );
};

export default PropertyHeader;
