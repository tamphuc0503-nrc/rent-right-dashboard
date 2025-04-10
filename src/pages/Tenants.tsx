
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter, UserPlus } from 'lucide-react';
import { useState } from 'react';

// Dummy tenant data
const tenants = [
  { id: 1, name: 'John Smith', property: '123 Main St, Apt 4B', leaseEnd: '2025-08-15', status: 'Active', rent: '$1,200' },
  { id: 2, name: 'Sarah Johnson', property: '456 Oak Ave, Unit 7', leaseEnd: '2025-06-30', status: 'Active', rent: '$1,450' },
  { id: 3, name: 'Michael Brown', property: '789 Pine Blvd, #2C', leaseEnd: '2025-05-20', status: 'Late Payment', rent: '$1,350' },
  { id: 4, name: 'Jennifer Davis', property: '321 Elm St, Apt 10', leaseEnd: '2025-09-01', status: 'Active', rent: '$1,100' },
  { id: 5, name: 'Robert Wilson', property: '654 Maple Dr, Unit 5', leaseEnd: '2025-07-15', status: 'Active', rent: '$1,250' },
];

const Tenants = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredTenants = tenants.filter(tenant => 
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.property.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isMobile={isMobile} />
      
      <div className={`flex-1 ${isMobile ? '' : 'ml-64'}`}>
        <DashboardHeader />
        
        <main className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tenants</h1>
              <p className="text-gray-600">Manage your property tenants</p>
            </div>
            
            <Button className="mt-4 sm:mt-0 bg-realestate-700 hover:bg-realestate-800">
              <UserPlus className="h-4 w-4 mr-2" />
              Add New Tenant
            </Button>
          </div>
          
          <Card className="mb-8">
            <CardHeader className="pb-2">
              <CardTitle>Find Tenants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search by name or property" 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lease End</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Rent</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{tenant.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{tenant.property}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{tenant.leaseEnd}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        tenant.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {tenant.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{tenant.rent}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Tenants;
