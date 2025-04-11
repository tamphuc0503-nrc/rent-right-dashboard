
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PropertyDetailType } from '@/types/propertyDetail';

interface PropertyAmenitiesProps {
  property: PropertyDetailType;
}

const PropertyAmenities: React.FC<PropertyAmenitiesProps> = ({ property }) => {
  return (
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
  );
};

export default PropertyAmenities;
