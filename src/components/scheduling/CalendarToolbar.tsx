
import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, LayoutGrid, Clock, List } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';

interface CalendarToolbarProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  view: string;
  setView: (view: string) => void;
}

const CalendarToolbar: React.FC<CalendarToolbarProps> = ({
  selectedDate,
  setSelectedDate,
  view,
  setView
}) => (
  <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
    <h1 className="text-2xl font-bold text-gray-900">Scheduler</h1>
    <div className="flex items-center gap-4">
      <Tabs value={view} className="w-[400px]">
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
);

export default CalendarToolbar;
