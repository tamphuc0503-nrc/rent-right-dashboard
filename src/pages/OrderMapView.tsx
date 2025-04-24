
import { useState } from 'react';
import { format, addDays } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import DashboardHeader from '@/components/DashboardHeader';
import Sidebar from '@/components/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

// Dummy data generation
const generateDummyOrders = (startDate: Date) => {
  const orders = [];
  for (let i = 0; i < 9; i++) {
    const date = addDays(startDate, i);
    const numOrders = Math.floor(Math.random() * 3) + 1; // 1-3 orders per day
    
    for (let j = 0; j < numOrders; j++) {
      orders.push({
        id: `${i}-${j}`,
        date: date,
        address: `${Math.floor(Math.random() * 1000)} Main St`,
        client: `Client ${i}-${j}`,
        type: ['Home Inspection', 'Property Assessment', 'Safety Check'][Math.floor(Math.random() * 3)],
        coordinates: [
          -122.4194 + (Math.random() - 0.5) * 0.2, // SF area coordinates
          37.7749 + (Math.random() - 0.5) * 0.2
        ],
      });
    }
  }
  return orders;
};

const OrderMapView = () => {
  const isMobile = useIsMobile();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const orders = generateDummyOrders(new Date());
  const [mapCenter, setMapCenter] = useState([-122.4194, 37.7749]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isMobile={isMobile} />
      <div className={`flex-1 ${isMobile ? '' : 'ml-[var(--sidebar-width,256px)]'} transition-all duration-300`}>
        <DashboardHeader />
        <main className="p-6">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Map of Upcoming Orders</h1>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {format(selectedDate, 'PPP')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-4 min-h-[600px]">
              <div className="font-semibold mb-4">Map View</div>
              <div className="h-[550px] bg-gray-100 rounded-lg flex items-center justify-center">
                Map will be integrated here
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="font-semibold mb-4">Orders for {format(selectedDate, 'MMMM d, yyyy')}</div>
              <div className="space-y-4">
                {orders
                  .filter(order => format(order.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
                  .map((order) => (
                    <div key={order.id} className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{order.type}</h3>
                          <p className="text-sm text-gray-500">{order.address}</p>
                          <p className="text-sm text-gray-500">{order.client}</p>
                        </div>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrderMapView;
