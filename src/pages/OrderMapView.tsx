import { useState } from 'react';
import { format, addDays, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import DashboardHeader from '@/components/DashboardHeader';
import Sidebar from '@/components/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import MapOrderDayGroup from "@/components/orders/MapOrderDayGroup";

const BASE_DATE = new Date(2024, 3, 26); // April 26, 2024

const generateDummyOrders = (startDate: Date) => {
  const orders = [];
  for (let dayOffset = 0; dayOffset < 3; dayOffset++) {
    const date = addDays(BASE_DATE, dayOffset);
    for (let j = 0; j < 3; j++) {
      orders.push({
        id: `s${dayOffset}-${j}`,
        date: new Date(date),
        address: `${400 + j} Sunrise Ave`,
        client: `Client Special ${dayOffset + 1}-${j + 1}`,
        type: j % 2 ? "Home Inspection" : "Property Assessment",
        coordinates: [-122.42 + (Math.random() - 0.5) * 0.1, 37.77 + (Math.random() - 0.5) * 0.1],
      });
    }
  }
  for (let i = 3; i < 9; i++) {
    const date = addDays(startDate, i);
    const numOrders = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < numOrders; j++) {
      orders.push({
        id: `${i}-${j}`,
        date: new Date(date),
        address: `${Math.floor(Math.random() * 1000)} Main St`,
        client: `Client ${i}-${j}`,
        type: ['Home Inspection', 'Property Assessment', 'Safety Check'][Math.floor(Math.random() * 3)],
        coordinates: [
          -122.4194 + (Math.random() - 0.5) * 0.2,
          37.7749 + (Math.random() - 0.5) * 0.2
        ],
      });
    }
  }
  return orders;
};

const WEEK_TAGS = [
  { value: 7, label: '1w' },
  { value: 14, label: '2w' },
  { value: 21, label: '3w' },
  { value: 28, label: '4w' }
];

const OrderMapView = () => {
  const isMobile = useIsMobile();
  const [selectedDate, setSelectedDate] = useState<Date>(BASE_DATE);
  const [weekRange, setWeekRange] = useState(7);
  const orders = generateDummyOrders(BASE_DATE);
  const [mapCenter, setMapCenter] = useState([-122.4194, 37.7749]);

  const dates = [];
  for (let i = 0; i < weekRange; i++) {
    const date = addDays(selectedDate, i);
    dates.push(date);
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isMobile={isMobile} />
      <div className={`flex-1 ${isMobile ? '' : 'ml-[var(--sidebar-width,256px)]'} transition-all duration-300`}>
        <DashboardHeader />
        <main className="p-6">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Map of Upcoming Orders</h1>
            <div className="flex items-center gap-2">
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
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {WEEK_TAGS.map(w =>
                <Button
                  key={w.value}
                  size="sm"
                  variant={weekRange === w.value ? "default" : "outline"}
                  className="px-3 py-1"
                  onClick={() => setWeekRange(w.value)}
                >
                  {w.label}
                </Button>
              )}
            </div>
          </div>
          <div className="">
            {dates.map((date) => {
              const dateOrders = orders.filter(order => isSameDay(order.date, date));
              if (!dateOrders.length) return null;
              return (
                <MapOrderDayGroup
                  key={date.toISOString()}
                  day={date}
                  count={dateOrders.length}
                >
                  <div className="mb-4 bg-gray-100 rounded h-44 flex items-center justify-center">
                    <MapPin className="h-10 w-10 text-blue-400" />
                    <span className="ml-2 text-gray-700">Map Preview: {dateOrders.length} order(s)</span>
                  </div>
                  <ul>
                    {dateOrders.map(order => (
                      <li key={order.id} className="mb-2 flex items-center gap-4">
                        <span className="inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-700 w-8 h-8 mr-2"><MapPin className="h-4 w-4" /></span>
                        <span className="font-semibold">{order.address}</span>
                        <span className="text-gray-500 text-sm">{order.client}</span>
                        <span className="ml-auto text-xs bg-gray-200 px-2 py-1 rounded">{order.type}</span>
                      </li>
                    ))}
                  </ul>
                </MapOrderDayGroup>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrderMapView;
