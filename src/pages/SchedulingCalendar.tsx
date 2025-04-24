
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { format, addWeeks, startOfWeek, endOfWeek, addDays } from 'date-fns';
import { Calendar as CalendarIcon, LayoutGrid, Clock, List } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const dummyInspectors = [
  { id: 1, name: 'John Smith', color: 'bg-blue-500' },
  { id: 2, name: 'Sarah Johnson', color: 'bg-green-500' },
  { id: 3, name: 'Mike Brown', color: 'bg-purple-500' },
  { id: 4, name: 'Emma Davis', color: 'bg-yellow-500' },
  { id: 5, name: 'James Wilson', color: 'bg-pink-500' },
  { id: 6, name: 'Lisa Anderson', color: 'bg-orange-500' },
];

const generateTimelineEvents = () => {
  const events = [];
  const startDate = new Date();
  
  for (let i = 0; i < 6; i++) {
    const inspectorEvents = [];
    for (let j = 0; j < 3; j++) {
      const dayOffset = Math.floor(Math.random() * 14);
      const startHour = 8 + Math.floor(Math.random() * 6);
      const duration = 2 + Math.floor(Math.random() * 2);
      
      inspectorEvents.push({
        id: `${i}-${j}`,
        title: `Inspection at ${1000 + j} Oak St`,
        start: addDays(startDate, dayOffset).setHours(startHour, 0, 0, 0),
        end: addDays(startDate, dayOffset).setHours(startHour + duration, 0, 0, 0),
      });
    }
    events.push({
      inspector: dummyInspectors[i],
      events: inspectorEvents,
    });
  }
  return events;
};

const TimelineView = () => {
  const timelineEvents = generateTimelineEvents();
  const days = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));

  return (
    <div className="border rounded-lg p-4 overflow-x-auto">
      <div className="min-w-[1200px]">
        <div className="grid grid-cols-[200px_repeat(14,1fr)] gap-1">
          {/* Header */}
          <div className="h-12 flex items-center font-semibold">Inspector</div>
          {days.map((day) => (
            <div 
              key={day.toISOString()} 
              className="h-12 text-center border-l"
            >
              <div className="text-sm font-medium">{format(day, 'EEE')}</div>
              <div className="text-xs">{format(day, 'MMM d')}</div>
            </div>
          ))}

          {/* Timeline rows */}
          {timelineEvents.map(({ inspector, events }) => (
            <React.Fragment key={inspector.id}>
              <div className="h-20 flex items-center px-2 font-medium">
                {inspector.name}
              </div>
              {days.map((day) => (
                <div key={day.toISOString()} className="h-20 border-l relative">
                  {events
                    .filter(event => 
                      format(event.start, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                    )
                    .map(event => (
                      <div
                        key={event.id}
                        className={`absolute top-2 left-1 right-1 p-1 text-xs text-white rounded ${inspector.color}`}
                        title={`${format(event.start, 'HH:mm')} - ${format(event.end, 'HH:mm')}: ${event.title}`}
                      >
                        {format(event.start, 'HH:mm')} {event.title}
                      </div>
                    ))}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

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
          
          <div className="bg-white rounded-lg shadow">
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
                <div className="text-center text-gray-500">Coming soon: Week View Calendar</div>
              </div>
            )}
            {view === 'timeline' && <TimelineView />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SchedulingCalendar;
