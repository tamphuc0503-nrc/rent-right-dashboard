
import React from 'react';
import { format } from 'date-fns';

interface WeekViewCalendarHeaderProps {
  days: Date[];
}

const WeekViewCalendarHeader: React.FC<WeekViewCalendarHeaderProps> = ({ days }) => (
  <div className="grid grid-cols-[100px_repeat(7,1fr)] border-b">
    <div className="p-2 font-medium">Time</div>
    {days.map(day => (
      <div key={day.toISOString()} className="p-2 text-center border-l">
        <div className="font-medium">{format(day, 'EEE')}</div>
        <div className="text-sm text-muted-foreground">{format(day, 'MMM d')}</div>
      </div>
    ))}
  </div>
);

export default WeekViewCalendarHeader;

