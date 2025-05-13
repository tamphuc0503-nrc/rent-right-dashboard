
import React from 'react';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type TimeframeType = '1week' | '2weeks' | '3weeks' | '1month' | 'custom';

interface TimeframeSelectorProps {
  timeframe: TimeframeType;
  dateRange: DateRange | undefined;
  onTimeframeChange: (newTimeframe: TimeframeType) => void;
  setDateRange: (range: DateRange | undefined) => void;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({
  timeframe,
  dateRange,
  onTimeframeChange,
  setDateRange,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button 
        variant={timeframe === '1week' ? 'default' : 'outline'} 
        onClick={() => onTimeframeChange('1week')}
      >
        1 Week
      </Button>
      <Button 
        variant={timeframe === '2weeks' ? 'default' : 'outline'} 
        onClick={() => onTimeframeChange('2weeks')}
      >
        2 Weeks
      </Button>
      <Button 
        variant={timeframe === '3weeks' ? 'default' : 'outline'} 
        onClick={() => onTimeframeChange('3weeks')}
      >
        3 Weeks
      </Button>
      <Button 
        variant={timeframe === '1month' ? 'default' : 'outline'} 
        onClick={() => onTimeframeChange('1month')}
      >
        1 Month
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant={timeframe === 'custom' ? 'default' : 'outline'} 
            onClick={() => onTimeframeChange('custom')}
            className="flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            <span>
              {dateRange?.from && dateRange?.to ? (
                <>
                  {format(dateRange.from, 'MMM d, yyyy')} - {format(dateRange.to, 'MMM d, yyyy')}
                </>
              ) : (
                "Custom Range"
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            defaultMonth={dateRange?.from}
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TimeframeSelector;
