
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { format, addWeeks, startOfWeek, endOfWeek } from 'date-fns';
import { Calendar as CalendarIcon, LayoutGrid, Clock, List } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SchedulingCalendar = () => {
  const isMobile = useIsMobile();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeRange, setActiveRange] = useState(0);
  const [view, setView] = useState('month');

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isMobile={isMobile} />
      <div className={`flex-1 ${isMobile ? '' : 'ml-[var(--sidebar-width,256px)]'} transition-all duration-300`}>
        <DashboardHeader />
        <main className="p-6">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Scheduler</h1>
            <div className="flex items-center gap-4">
              <Tabs defaultValue="month" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="month" onClick={() => setView('month')}>
                    <LayoutGrid className="h-4 w-4 mr-2" />
                    Month
                  </TabsTrigger>
                  <TabsTrigger value="week" onClick={() => setView('week')}>
                    <Clock className="h-4 w-4 mr-2" />
                    Week
                  </TabsTrigger>
                  <TabsTrigger value="timeline" onClick={() => setView('timeline')}>
                    <List className="h-4 w-4 mr-2" />
                    Timeline
                  </TabsTrigger>
                </TabsList>
              </Tabs>
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
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            {view === 'month' && (
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            )}
            {view === 'week' && (
              <div className="h-[600px] border rounded-lg p-4">
                <div className="text-center text-gray-500">Week View Calendar will be implemented here</div>
              </div>
            )}
            {view === 'timeline' && (
              <div className="h-[600px] border rounded-lg p-4">
                <div className="text-center text-gray-500">Timeline View with inspector names will be implemented here</div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SchedulingCalendar;
