
import React from 'react';
import { Phone, Mail, Building, User, Briefcase, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PropertyDetailType } from '@/types/propertyDetail';

interface PropertyContactProps {
  property: PropertyDetailType;
}

const PropertyContact: React.FC<PropertyContactProps> = ({ property }) => {
  // Use realtor info if available, otherwise fall back to agent info
  const contactPerson = property.realtor || property.agent;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Listing Information</CardTitle>
        </CardHeader>
        <CardContent>
          {contactPerson ? (
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img 
                  src={contactPerson.image} 
                  alt={contactPerson.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 text-lg">{contactPerson.name}</h4>
                {property.realtor?.license && (
                  <div className="flex items-center text-gray-600 mb-1">
                    <Award className="h-4 w-4 mr-2" />
                    License: {property.realtor.license}
                  </div>
                )}
                {contactPerson.company && (
                  <div className="flex items-center text-gray-600 mb-1">
                    <Building className="h-4 w-4 mr-2" />
                    {contactPerson.company}
                  </div>
                )}
                <div className="flex items-center text-gray-600 mb-1">
                  <Phone className="h-4 w-4 mr-2" />
                  {contactPerson.phone}
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {contactPerson.email}
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col gap-2">
                <Button>Contact Agent</Button>
                <Button variant="outline">Request a Tour</Button>
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
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Additional Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            This property is listed by {contactPerson?.company || "an agent"} and has been on the market 
            for {Math.floor(Math.random() * 90) + 1} days. For more details or to schedule a viewing,
            please contact the listing agent.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 border rounded-md">
              <span className="text-sm text-gray-600">MLS #</span>
              <div className="font-medium">MLS{Math.floor(Math.random() * 10000000)}</div>
            </div>
            <div className="p-3 border rounded-md">
              <span className="text-sm text-gray-600">Property ID</span>
              <div className="font-medium">P-{property.id.toString().padStart(6, '0')}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyContact;
