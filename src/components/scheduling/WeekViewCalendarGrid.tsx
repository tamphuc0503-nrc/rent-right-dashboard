
import React from 'react';
import WeekViewCalendarEvent from './WeekViewCalendarEvent';

interface CalendarEvent {
  id: string;
  title: string;
  start: number;
  end: number;
  inspector: string;
  color: string;
}

interface WeekViewCalendarGridProps {
  days: Date[];
  hours: number[];
  events: CalendarEvent[];
  handleDrop: (e: React.DragEvent, day: Date, hour: number) => void;
  handleDragStart: (e: React.DragEvent, eventId: string) => void;
}

const WeekViewCalendarGrid: React.FC<WeekViewCalendarGridProps> = ({
  days,
  hours,
  events,
  handleDrop,
  handleDragStart,
}) => (
  <>
    {hours.map(hour => (
      <div key={hour} className="grid grid-cols-[100px_repeat(7,1fr)] border-b">
        <div className="p-2 text-sm">{`${hour === 12 ? 12 : hour % 12 || 12}${hour < 12 ? 'am' : 'pm'}`}</div>
        {days.map(day => {
          const slotStart = new Date(day);
          slotStart.setHours(hour, 0, 0, 0);
          const slotEnd = new Date(day);
          slotEnd.setHours(hour + 1, 0, 0, 0);

          const slotEvents = events.filter(
            event =>
              event.start >= slotStart.getTime() && event.start < slotEnd.getTime()
          );
          return (
            <div
              key={`${day.toISOString()}-${hour}`}
              className="border-l p-1 min-h-[60px] relative"
              onDragOver={e => e.preventDefault()}
              onDrop={e => handleDrop(e, new Date(day), hour)}
              style={{ minHeight: 48 }}
            >
              {slotEvents.map(event => (
                <WeekViewCalendarEvent
                  key={event.id}
                  event={event}
                  onDragStart={handleDragStart}
                />
              ))}
            </div>
          );
        })}
      </div>
    ))}
  </>
);

export default WeekViewCalendarGrid;
