
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { format, addWeeks, startOfWeek, endOfWeek } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const timeRanges = [
  { label: 'Current Week', weeks: 0 },
  { label: '2 Weeks', weeks: 1 },
  { label: '3 Weeks', weeks: 2 },
  { label: '4 Weeks', weeks: 3 },
];

const SchedulingCalendar = () => {
  const isMobile = useIsMobile();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeRange, setActiveRange] = useState(0);

  const rangeEnd = selectedDate ? addWeeks(selectedDate, activeRange) : undefined;

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isMobile={isMobile} />
      <div className={`flex-1 ${isMobile ? '' : 'ml-[var(--sidebar-width,256px)]'} transition-all duration-300`}>
        <DashboardHeader />
        <main className="p-6">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
            <h1 className="text-2xl font-bold text-gray-900">My Upcoming Orders</h1>
            <div className="flex flex-wrap gap-2">
              {timeRanges.map((range, index) => (
                <Button
                  key={range.label}
                  variant={activeRange === index ? "default" : "outline"}
                  onClick={() => setActiveRange(index)}
                  className="px-4"
                >
                  {range.label}
                </Button>
              ))}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">
                Orders {selectedDate && rangeEnd ? `(${format(selectedDate, 'MMM d')} - ${format(rangeEnd, 'MMM d')})` : ''}
              </h2>
              <div className="space-y-4">
                {/* Order list will be populated here */}
                <p className="text-gray-500 text-center py-4">No orders scheduled for this period</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SchedulingCalendar;
