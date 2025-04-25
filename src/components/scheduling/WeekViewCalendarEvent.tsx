
import React from 'react';
import { format } from 'date-fns';

interface WeekViewCalendarEventProps {
  event: {
    id: string;
    title: string;
    start: number;
    end: number;
    inspector: string;
    color: string;
  };
  onDragStart: (e: React.DragEvent, eventId: string) => void;
}

const WeekViewCalendarEvent: React.FC<WeekViewCalendarEventProps> = ({ event, onDragStart }) => {
  const startDate = new Date(event.start);
  const endDate = new Date(event.end);
  const height = (endDate.getHours() - startDate.getHours()) * 60;
  return (
    <div
      className={`absolute top-0 left-1 right-1 p-1 text-xs text-white rounded cursor-grab ${event.color}`}
      style={{ height: `${height}px` }}
      title={`${format(event.start, 'HH:mm')} - ${format(event.end, 'HH:mm')}: ${event.title}`}
      draggable
      onDragStart={e => onDragStart(e, event.id)}
    >
      <div className="truncate">{event.title}</div>
      <div className="text-xs opacity-90">{event.inspector}</div>
    </div>
  );
};

export default WeekViewCalendarEvent;

