import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import PropertyDetail from '@/components/property/PropertyDetail';
import AddPropertyDialog from '@/components/property/AddPropertyDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter, Home, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PropertyDetailType } from '@/types/propertyDetail';
import { PropertyAddress } from '@/types/property';
import { PropertyTypeIcon } from '@/components/property/PropertyTypeIcon';

const properties: PropertyDetailType[] = [
  { 
    id: 1, 
    address: '123 Main St', 
    city: 'New York', 
    state: 'NY', 
    type: 'Apartment Building', 
    units: 12, 
    occupancyRate: '92%',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    zipCode: '10001',
    price: 2500000,
    sqft: 8500,
    bedrooms: 24,
    bathrooms: 12,
    yearBuilt: 1998,
    description: 'This luxurious apartment building offers 12 units with modern amenities in the heart of Manhattan. High occupancy rate with long-term tenants and strong rental income potential.',
    amenities: ['Elevator', 'Fitness Center', 'Rooftop Terrace', 'Laundry Facilities', 'Storage Units', 'Bicycle Storage', 'Package Room'],
    agent: {
      name: 'Jessica Parker',
      phone: '(212) 555-1234',
      email: 'jessica@realestate.com',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    },
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    ],
    status: {
      offer: 'Special Offer',
      condition: 'New Construction'
    },
    facts: {
      interior: {
        bedrooms: 24,
        bathrooms: 12,
        fullBathrooms: 12,
        halfBathrooms: 0,
        appliances: ['Refrigerator', 'Dishwasher', 'Washer', 'Dryer', 'Microwave'],
        flooring: ['Hardwood', 'Tile'],
        heatingType: 'Central',
        coolingType: 'Central AC'
      },
      exterior: {
        lotSize: '0.25 acres',
        parking: 'Street parking',
        mailbox: 'Individual mailboxes in lobby',
        parcelNumber: 'NYC-10001-123'
      },
      garage: {
        type: 'Underground garage',
        capacity: 6
      },
      community: {
        hoa: '$500/month',
        communityName: 'Manhattan Luxury Apartments',
        location: 'Midtown Manhattan',
        financialDetails: 'FHA approved'
      },
      construction: {
        builder: 'CityBuild Construction',
        yearBuilt: 1998,
        homeType: 'Apartment Building',
        propertySubType: 'Mid-rise'
      },
      services: {
        parks: ['Central Park', 'Bryant Park'],
        walkingScore: 95,
        bikeScore: 75,
        internetProviders: ['Spectrum', 'Verizon Fios', 'AT&T'],
        tvProviders: ['Spectrum', 'DirecTV', 'Dish Network']
      },
      schools: {
        elementary: [
          { name: 'PS 116 Elementary', score: 8, distance: '0.3 miles' },
          { name: 'PS 40 Elementary', score: 7, distance: '0.8 miles' }
        ],
        middle: [
          { name: 'JHS 104 Middle School', score: 6, distance: '1.2 miles' }
        ],
        high: [
          { name: 'Stuyvesant High School', score: 9, distance: '1.5 miles' },
          { name: 'Millennium High School', score: 8, distance: '2.1 miles' }
        ]
      }
    },
    realtor: {
      name: 'Jessica Parker',
      phone: '(212) 555-1234',
      email: 'jessica@realestate.com',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      company: 'NYC Premier Realty',
      license: 'NY-RES-123456'
    }
  },
  { 
    id: 2, 
    address: '456 Oak Ave', 
    city: 'Los Angeles', 
    state: 'CA', 
    type: 'Single Family Home', 
    units: 1, 
    occupancyRate: '100%',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    zipCode: '90210',
    price: 1850000,
    sqft: 3200,
    bedrooms: 4,
    bathrooms: 3.5,
    yearBuilt: 2015,
    description: 'Beautiful modern home in prime Los Angeles location. Features an open floor plan, gourmet kitchen, spacious primary suite, and a backyard oasis with pool.',
    amenities: ['Swimming Pool', 'Home Office', 'Smart Home System', 'Fireplace', 'Hardwood Floors', 'Attached Garage', 'Backyard'],
    agent: {
      name: 'Michael Johnson',
      phone: '(310) 555-6789',
      email: 'michael@realestate.com',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    }
  },
  { 
    id: 3, 
    address: '789 Pine Blvd', 
    city: 'Chicago', 
    state: 'IL', 
    type: 'Condominium', 
    units: 8, 
    occupancyRate: '75%',
    image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    zipCode: '60601',
    price: 1200000,
    sqft: 6000,
    bedrooms: 16,
    bathrooms: 10,
    yearBuilt: 2005,
    description: 'Modern condominium building in downtown Chicago with stunning city views. Each unit features premium finishes and open layouts.',
    amenities: ['24/7 Security', 'Concierge Service', 'Fitness Center', 'Rooftop Deck', 'Pet Friendly', 'Meeting Rooms'],
    agent: {
      name: 'Sarah Williams',
      phone: '(312) 555-9012',
      email: 'sarah@realestate.com',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    }
  },
  { 
    id: 4, 
    address: '321 Elm St', 
    city: 'Miami', 
    state: 'FL', 
    type: 'Apartment Building', 
    units: 20, 
    occupancyRate: '95%',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    zipCode: '33101',
    price: 3400000,
    sqft: 12000,
    bedrooms: 40,
    bathrooms: 25,
    yearBuilt: 2010,
    description: 'Luxury waterfront apartment building in Miami with premium amenities and exceptional views. High occupancy rate with strong rental returns.',
    amenities: ['Swimming Pool', 'Waterfront Views', 'Tennis Court', 'Fitness Center', 'Clubhouse', 'Covered Parking', 'Boat Slips'],
    agent: {
      name: 'Robert Chen',
      phone: '(305) 555-3456',
      email: 'robert@realestate.com',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    }
  },
  { 
    id: 5, 
    address: '654 Maple Dr', 
    city: 'Seattle', 
    state: 'WA', 
    type: 'Townhouse', 
    units: 6, 
    occupancyRate: '83%',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    zipCode: '98101',
    price: 2100000,
    sqft: 7200,
    bedrooms: 12,
    bathrooms: 9,
    yearBuilt: 2018,
    description: 'Modern townhouse development in Seattle\'s vibrant downtown area. Each unit features high-end finishes, energy-efficient systems, and private outdoor spaces.',
    amenities: ['Energy Efficient', 'Private Patios', 'Garage Parking', 'Community Garden', 'Pet Friendly', 'Bike Storage'],
    agent: {
      name: 'Emma Nguyen',
      phone: '(206) 555-7890',
      email: 'emma@realestate.com',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    }
  },
  { 
    id: 6, 
    address: '987 Cedar Ln', 
    city: 'Boston', 
    state: 'MA', 
    type: 'Duplex', 
    units: 2, 
    occupancyRate: '100%',
    image: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    zipCode: '02108',
    price: 950000,
    sqft: 2800,
    bedrooms: 4,
    bathrooms: 3,
    yearBuilt: 1945,
    description: 'Classic Boston duplex with character and charm. Recently renovated while preserving original architectural details. Great rental history with long-term tenants.',
    amenities: ['Hardwood Floors', 'Crown Molding', 'Updated Kitchen', 'Basement Storage', 'Backyard', 'Period Details'],
    agent: {
      name: 'Thomas Wilson',
      phone: '(617) 555-2345',
      email: 'thomas@realestate.com',
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    }
  }
];

const Properties = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProperty, setSelectedProperty] = useState<PropertyDetailType | null>(null);
  const [showAddPropertyDialog, setShowAddPropertyDialog] = useState(false);
  const [propertiesList, setPropertiesList] = useState<PropertyDetailType[]>(properties);
  const { toast } = useToast();
  
  const filteredProperties = propertiesList.filter(property => 
    property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProperty = (property: PropertyDetailType) => {
    setSelectedProperty(property);
  };
  
  const handleAddProperty = (propertyData: PropertyAddress) => {
    const newProperty: PropertyDetailType = {
      id: propertiesList.length + 1,
      address: propertyData.address,
      city: propertyData.city,
      state: propertyData.state,
      type: propertyData.propertyType,
      units: propertyData.units,
      occupancyRate: '0%',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      zipCode: propertyData.zipCode,
    };
    
    setPropertiesList([newProperty, ...propertiesList]);
    toast({
      title: "Property Added",
      description: `${propertyData.address} has been added to your properties.`,
    });
  };
  
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isMobile={isMobile} />
      
      <div className={`flex-1 ${isMobile ? '' : 'ml-64'}`}>
        <DashboardHeader />
        
        <main className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
              <p className="text-gray-600">Manage your real estate properties</p>
            </div>
            
            <Button 
              className="mt-4 sm:mt-0 bg-realestate-700 hover:bg-realestate-800"
              onClick={() => setShowAddPropertyDialog(true)}
            >
              <Home className="h-4 w-4 mr-2" />
              Add New Property
            </Button>
          </div>
          
          <Card className="mb-8">
            <CardHeader className="pb-2">
              <CardTitle>Find Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search by address, city, or type" 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                  
                  <div className="flex rounded-md overflow-hidden border border-gray-200">
                    <Button 
                      variant={viewMode === 'grid' ? 'default' : 'outline'} 
                      className={`rounded-none ${viewMode === 'grid' ? 'bg-realestate-600' : ''}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                      </svg>
                    </Button>
                    <Button 
                      variant={viewMode === 'list' ? 'default' : 'outline'} 
                      className={`rounded-none ${viewMode === 'list' ? 'bg-realestate-600' : ''}`}
                      onClick={() => setViewMode('list')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="8" y1="6" x2="21" y2="6"></line>
                        <line x1="8" y1="12" x2="21" y2="12"></line>
                        <line x1="8" y1="18" x2="21" y2="18"></line>
                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleViewProperty(property)}>
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
                      <Button variant="outline" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        handleViewProperty(property);
                      }}>View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupancy</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProperties.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleViewProperty(property)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{property.address}</div>
                        <div className="text-sm text-gray-500">{property.city}, {property.state}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{property.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{property.units}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          {property.occupancyRate}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewProperty(property);
                          }}
                        >
                          View
                        </Button>
                        <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
      
      {selectedProperty && (
        <PropertyDetail 
          property={selectedProperty} 
          isOpen={!!selectedProperty} 
          onClose={() => setSelectedProperty(null)} 
        />
      )}
      
      <AddPropertyDialog 
        isOpen={showAddPropertyDialog}
        onClose={() => setShowAddPropertyDialog(false)}
        onAddProperty={handleAddProperty}
      />
    </div>
  );
};

export default Properties;
