
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Building, DollarSign, Home, Users } from 'lucide-react';

const Dashboard = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isMobile={isMobile} />
      
      <div className={`flex-1 ${isMobile ? '' : 'ml-64'}`}>
        <DashboardHeader />
        
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back to your property management dashboard.</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Properties</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">24</h3>
                  </div>
                  <div className="rounded-full bg-realestate-100 p-3">
                    <Building className="h-6 w-6 text-realestate-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Tenants</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">142</h3>
                  </div>
                  <div className="rounded-full bg-green-100 p-3">
                    <Users className="h-6 w-6 text-green-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Vacant Units</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">8</h3>
                  </div>
                  <div className="rounded-full bg-yellow-100 p-3">
                    <Home className="h-6 w-6 text-yellow-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Revenue</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">$48,294</h3>
                  </div>
                  <div className="rounded-full bg-purple-100 p-3">
                    <DollarSign className="h-6 w-6 text-purple-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent property management activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Users className="h-4 w-4 text-blue-700" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New tenant added</p>
                      <p className="text-sm text-gray-500">John Smith was added to 123 Main St, Apt 4B</p>
                      <p className="text-xs text-gray-400 mt-1">Today at 10:30 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-green-100 p-2">
                      <DollarSign className="h-4 w-4 text-green-700" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Payment received</p>
                      <p className="text-sm text-gray-500">$1,200 received from Sarah Johnson</p>
                      <p className="text-xs text-gray-400 mt-1">Yesterday at 2:15 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-red-100 p-2">
                      <Building className="h-4 w-4 text-red-700" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Maintenance request</p>
                      <p className="text-sm text-gray-500">Plumbing issue reported at 456 Oak Ave, Unit 7</p>
                      <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-yellow-100 p-2">
                      <Home className="h-4 w-4 text-yellow-700" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Lease expiring soon</p>
                      <p className="text-sm text-gray-500">Mike Brown's lease expires in 14 days</p>
                      <p className="text-xs text-gray-400 mt-1">3 days ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-purple-100 p-2">
                      <Users className="h-4 w-4 text-purple-700" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New vendor added</p>
                      <p className="text-sm text-gray-500">ABC Plumbing Services added to vendors list</p>
                      <p className="text-xs text-gray-400 mt-1">5 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
                <CardDescription>Monthly performance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Occupancy Rate</p>
                    <div className="flex items-center justify-between mt-1">
                      <h4 className="text-lg font-bold text-gray-900">92%</h4>
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">↑ 2%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Rent Collection</p>
                    <div className="flex items-center justify-between mt-1">
                      <h4 className="text-lg font-bold text-gray-900">95%</h4>
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">↑ 1%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-realestate-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Maintenance Costs</p>
                    <div className="flex items-center justify-between mt-1">
                      <h4 className="text-lg font-bold text-gray-900">$4,285</h4>
                      <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">↑ 5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">New Leases</p>
                    <div className="flex items-center justify-between mt-1">
                      <h4 className="text-lg font-bold text-gray-900">12</h4>
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">↑ 3</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
