
import React from 'react';
import PropertyCard from './PropertyCard';
import { PropertyDetailType } from '@/types/propertyDetail';

interface PropertyGridProps {
  properties: PropertyDetailType[];
  onViewProperty: (property: PropertyDetailType) => void;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ properties, onViewProperty }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard 
          key={property.id} 
          property={property} 
          onClick={onViewProperty}
        />
      ))}
    </div>
  );
};

export default PropertyGrid;
