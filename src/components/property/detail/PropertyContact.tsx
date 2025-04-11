
import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PropertyDetailType } from '@/types/propertyDetail';

interface PropertyContactProps {
  property: PropertyDetailType;
}

const PropertyContact: React.FC<PropertyContactProps> = ({ property }) => {
  return (
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
  );
};

export default PropertyContact;
