
import React, { useState } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { dummyInspectors, getDragEventData, generateWeekViewEvents } from './calendarUtils';

const WeekViewCalendar = () => {
  const [events, setEvents] = useState(generateWeekViewEvents());
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 8 PM
  const days = Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(new Date()), i));

  function handleDragStart(e: React.DragEvent, eventId: string) {
    e.dataTransfer.setData(
      'application/json',
      JSON.stringify({
        eventId,
        type: 'week',
      })
    );
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleDrop(e: React.DragEvent, day: Date, hour: number) {
    const data = getDragEventData(e);
    if (!data || data.type !== 'week') return;
    setEvents(prev => {
      const idx = prev.findIndex(ev => ev.id === data.eventId);
      if (idx === -1) return prev;
      const event = { ...prev[idx] };
      const origDuration = (new Date(event.end).getHours() - new Date(event.start).getHours());
      const start = new Date(day);
      start.setHours(hour, 0, 0, 0);
      const end = new Date(day);
      end.setHours(hour + origDuration, 0, 0, 0);
      event.start = start.getTime();
      event.end = end.getTime();
      const updated = [...prev];
      updated[idx] = event;
      return updated;
    });
  }

  return (
    <div className="h-[600px] border rounded-lg p-4 overflow-auto">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-[100px_repeat(7,1fr)] border-b">
          <div className="p-2 font-medium">Time</div>
          {days.map(day => (
            <div key={day.toISOString()} className="p-2 text-center border-l">
              <div className="font-medium">{format(day, 'EEE')}</div>
              <div className="text-sm text-muted-foreground">{format(day, 'MMM d')}</div>
            </div>
          ))}
        </div>
        {hours.map(hour => (
          <div key={hour} className="grid grid-cols-[100px_repeat(7,1fr)] border-b">
            <div className="p-2 text-sm">{format(new Date().setHours(hour), 'ha')}</div>
            {days.map(day => {
              const currentSlotStart = day.setHours(hour, 0, 0, 0);
              const currentSlotEnd = day.setHours(hour + 1, 0, 0, 0);
              const slotEvents = events.filter(event =>
                event.start >= currentSlotStart && event.start < currentSlotEnd
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
                    <div
                      key={event.id}
                      className={`absolute top-0 left-1 right-1 p-1 text-xs text-white rounded cursor-grab ${event.color}`}
                      style={{
                        height: `${(new Date(event.end).getHours() - new Date(event.start).getHours()) * 60}px`
                      }}
                      title={`${format(event.start, 'HH:mm')} - ${format(event.end, 'HH:mm')}: ${event.title}`}
                      draggable
                      onDragStart={e => handleDragStart(e, event.id)}
                    >
                      <div className="truncate">{event.title}</div>
                      <div className="text-xs opacity-90">{event.inspector}</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekViewCalendar;
