
import React from 'react';
import { 
  Home, Building, Bed, Bath, Maximize, Calendar, CarFront, 
  Mailbox, MapPin, Landmark, ParkingCircle, School, Wifi, Tv 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PropertyDetailType } from '@/types/propertyDetail';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PropertyFeaturesProps {
  property: PropertyDetailType;
}

const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({ property }) => {
  const { facts } = property;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Facts & Features</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="interior" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4 h-auto">
              <TabsTrigger value="interior" className="py-2">Interior</TabsTrigger>
              <TabsTrigger value="exterior" className="py-2">Exterior</TabsTrigger>
              <TabsTrigger value="community" className="py-2">Community</TabsTrigger>
              <TabsTrigger value="schools" className="py-2">Schools</TabsTrigger>
            </TabsList>
            
            <TabsContent value="interior" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FeatureCard 
                  icon={<Bed className="h-5 w-5 text-realestate-700" />}
                  title="Bedrooms"
                  value={facts?.interior?.bedrooms || property.bedrooms || 'N/A'}
                />
                <FeatureCard 
                  icon={<Bath className="h-5 w-5 text-realestate-700" />}
                  title="Bathrooms"
                  value={facts?.interior?.bathrooms || property.bathrooms || 'N/A'}
                  subtitle={
                    facts?.interior?.fullBathrooms && facts?.interior?.halfBathrooms
                      ? `${facts.interior.fullBathrooms} Full, ${facts.interior.halfBathrooms} Half`
                      : undefined
                  }
                />
                <FeatureCard 
                  icon={<Maximize className="h-5 w-5 text-realestate-700" />}
                  title="Square Feet"
                  value={property.sqft ? property.sqft.toLocaleString() : 'N/A'}
                />
                <FeatureCard 
                  icon={<Calendar className="h-5 w-5 text-realestate-700" />}
                  title="Year Built"
                  value={facts?.construction?.yearBuilt || property.yearBuilt || 'N/A'}
                />
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2">Appliances & Interior Features</h4>
                <ul className="grid grid-cols-2 gap-2">
                  {facts?.interior?.appliances?.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <div className="h-2 w-2 bg-realestate-700 rounded-full mr-2"></div>
                      {item}
                    </li>
                  ))}
                  {facts?.interior?.flooring?.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <div className="h-2 w-2 bg-realestate-700 rounded-full mr-2"></div>
                      {item} Flooring
                    </li>
                  ))}
                  {facts?.interior?.heatingType && (
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-realestate-700 rounded-full mr-2"></div>
                      {facts.interior.heatingType} Heating
                    </li>
                  )}
                  {facts?.interior?.coolingType && (
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-realestate-700 rounded-full mr-2"></div>
                      {facts.interior.coolingType} Cooling
                    </li>
                  )}
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="exterior" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FeatureCard 
                  icon={<Maximize className="h-5 w-5 text-realestate-700" />}
                  title="Lot Size"
                  value={facts?.exterior?.lotSize || 'N/A'}
                />
                <FeatureCard 
                  icon={<ParkingCircle className="h-5 w-5 text-realestate-700" />}
                  title="Parking"
                  value={facts?.exterior?.parking || 'N/A'}
                />
                <FeatureCard 
                  icon={<CarFront className="h-5 w-5 text-realestate-700" />}
                  title="Garage"
                  value={facts?.garage?.capacity 
                    ? `${facts.garage.capacity} Car ${facts.garage.type || ''}`
                    : 'N/A'
                  }
                />
                <FeatureCard 
                  icon={<Mailbox className="h-5 w-5 text-realestate-700" />}
                  title="Mailbox & Parcel"
                  value={facts?.exterior?.mailbox || 'N/A'}
                  subtitle={facts?.exterior?.parcelNumber}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="community" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FeatureCard 
                  icon={<Building className="h-5 w-5 text-realestate-700" />}
                  title="HOA"
                  value={facts?.community?.hoa || 'None'}
                />
                <FeatureCard 
                  icon={<MapPin className="h-5 w-5 text-realestate-700" />}
                  title="Community"
                  value={facts?.community?.communityName || 'N/A'}
                />
                <FeatureCard 
                  icon={<Landmark className="h-5 w-5 text-realestate-700" />}
                  title="Construction"
                  value={facts?.construction?.homeType || property.type || 'N/A'}
                  subtitle={facts?.construction?.builder 
                    ? `Builder: ${facts.construction.builder}`
                    : undefined
                  }
                />
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2">Services Available</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {facts?.services?.internetProviders && (
                    <FeatureCard 
                      icon={<Wifi className="h-5 w-5 text-realestate-700" />}
                      title="Internet Providers"
                      value={facts.services.internetProviders.join(', ')}
                    />
                  )}
                  {facts?.services?.tvProviders && (
                    <FeatureCard 
                      icon={<Tv className="h-5 w-5 text-realestate-700" />}
                      title="TV Providers"
                      value={facts.services.tvProviders.join(', ')}
                    />
                  )}
                </div>
                
                {(facts?.services?.walkingScore || facts?.services?.bikeScore) && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {facts.services.walkingScore !== undefined && (
                      <div className="p-3 border rounded-md">
                        <span className="text-sm text-gray-600">Walking Score</span>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{facts.services.walkingScore}/100</span>
                          <ScoreIndicator score={facts.services.walkingScore} />
                        </div>
                      </div>
                    )}
                    {facts.services.bikeScore !== undefined && (
                      <div className="p-3 border rounded-md">
                        <span className="text-sm text-gray-600">Bike Score</span>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{facts.services.bikeScore}/100</span>
                          <ScoreIndicator score={facts.services.bikeScore} />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="schools" className="mt-4">
              {facts?.schools ? (
                <div className="space-y-4">
                  {facts.schools.elementary && facts.schools.elementary.length > 0 && (
                    <SchoolSection 
                      title="Elementary Schools" 
                      schools={facts.schools.elementary} 
                    />
                  )}
                  {facts.schools.middle && facts.schools.middle.length > 0 && (
                    <SchoolSection 
                      title="Middle Schools" 
                      schools={facts.schools.middle} 
                    />
                  )}
                  {facts.schools.high && facts.schools.high.length > 0 && (
                    <SchoolSection 
                      title="High Schools" 
                      schools={facts.schools.high} 
                    />
                  )}
                </div>
              ) : (
                <p className="text-gray-600">No school information available for this property.</p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Amenities</CardTitle>
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

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, title, value, subtitle 
}) => {
  return (
    <div className="flex items-start p-3 border rounded-md">
      <div className="mr-3 mt-1">{icon}</div>
      <div>
        <span className="text-sm text-gray-600">{title}</span>
        <div className="font-medium">{value}</div>
        {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
      </div>
    </div>
  );
};

interface SchoolSectionProps {
  title: string;
  schools: {
    name: string;
    score?: number;
    distance?: string;
  }[];
}

const SchoolSection: React.FC<SchoolSectionProps> = ({ title, schools }) => {
  return (
    <div>
      <h4 className="font-medium mb-2">{title}</h4>
      <div className="space-y-3">
        {schools.map((school, index) => (
          <div key={index} className="p-3 border rounded-md">
            <div className="flex justify-between items-center">
              <h5 className="font-medium">{school.name}</h5>
              {school.score !== undefined && (
                <ScoreIndicator score={school.score} />
              )}
            </div>
            {school.distance && (
              <div className="text-sm text-gray-600 mt-1">
                {school.distance} away
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

interface ScoreIndicatorProps {
  score: number;
}

const ScoreIndicator: React.FC<ScoreIndicatorProps> = ({ score }) => {
  let bgColor = '';
  let textColor = '';
  
  if (score >= 80) {
    bgColor = 'bg-green-100';
    textColor = 'text-green-800';
  } else if (score >= 60) {
    bgColor = 'bg-yellow-100';
    textColor = 'text-yellow-800';
  } else {
    bgColor = 'bg-orange-100';
    textColor = 'text-orange-800';
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {score}/10
    </span>
  );
};

export default PropertyFeatures;
