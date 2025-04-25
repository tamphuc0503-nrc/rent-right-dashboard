
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import TimelineView from './TimelineView';
import WeekViewCalendar from './WeekViewCalendar';

interface CalendarViewsProps {
  view: string;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}

const CalendarViews: React.FC<CalendarViewsProps> = ({
  view,
  selectedDate,
  setSelectedDate
}) => (
  <div className="bg-white rounded-lg shadow">
    {view === 'month' && (
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="rounded-md border"
      />
    )}
    {view === 'week' && <WeekViewCalendar />}
    {view === 'timeline' && <TimelineView />}
  </div>
);

export default CalendarViews;
