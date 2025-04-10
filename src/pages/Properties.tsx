
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter, Home, Building } from 'lucide-react';
import { useState } from 'react';

// Dummy property data
const properties = [
  { 
    id: 1, 
    address: '123 Main St', 
    city: 'New York', 
    state: 'NY', 
    type: 'Apartment Building', 
    units: 12, 
    occupancyRate: '92%',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
  },
  { 
    id: 2, 
    address: '456 Oak Ave', 
    city: 'Los Angeles', 
    state: 'CA', 
    type: 'Single Family Home', 
    units: 1, 
    occupancyRate: '100%',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
  },
  { 
    id: 3, 
    address: '789 Pine Blvd', 
    city: 'Chicago', 
    state: 'IL', 
    type: 'Condominium', 
    units: 8, 
    occupancyRate: '75%',
    image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
  },
  { 
    id: 4, 
    address: '321 Elm St', 
    city: 'Miami', 
    state: 'FL', 
    type: 'Apartment Building', 
    units: 20, 
    occupancyRate: '95%',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
  },
  { 
    id: 5, 
    address: '654 Maple Dr', 
    city: 'Seattle', 
    state: 'WA', 
    type: 'Townhouse', 
    units: 6, 
    occupancyRate: '83%',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
  },
  { 
    id: 6, 
    address: '987 Cedar Ln', 
    city: 'Boston', 
    state: 'MA', 
    type: 'Duplex', 
    units: 2, 
    occupancyRate: '100%',
    image: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
  },
];

const Properties = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const filteredProperties = properties.filter(property => 
    property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
            
            <Button className="mt-4 sm:mt-0 bg-realestate-700 hover:bg-realestate-800">
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
                <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                        <Building className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-600">{property.type}</span>
                      </div>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {property.occupancyRate}
                      </span>
                    </div>
                    <div className="flex justify-between mt-4">
                      <span className="text-sm text-gray-600">{property.units} Unit{property.units > 1 ? 's' : ''}</span>
                      <Button variant="outline" size="sm">View Details</Button>
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
                    <tr key={property.id} className="hover:bg-gray-50">
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
                        <Button variant="ghost" size="sm">View</Button>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Properties;
