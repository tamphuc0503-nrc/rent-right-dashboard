
import React from 'react';
import { Building } from 'lucide-react';
import { PropertyAddress } from '@/types/property';
import { PropertyTypeIcon } from './PropertyTypeIcon';

interface SelectedPropertyProps {
  property: PropertyAddress;
}

const SelectedProperty: React.FC<SelectedPropertyProps> = ({ property }) => {
  return (
    <div className="p-4 border rounded-md bg-gray-50">
      <div className="flex items-center gap-2 mb-2">
        <PropertyTypeIcon type={property.propertyType} className="h-5 w-5 text-realestate-700" />
        <h3 className="font-medium">{property.propertyType}</h3>
      </div>
      
      {property.units > 1 && (
        <div className="mt-2 flex items-center gap-2">
          <Building className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-700">{property.units} Units</span>
        </div>
      )}
      
      <p className="mt-1 text-sm text-gray-600">
        {property.address}, {property.city}, {property.state} {property.zipCode}
      </p>
    </div>
  );
};

export default SelectedProperty;
