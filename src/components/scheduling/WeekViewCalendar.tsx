import React, { useState } from 'react';
import { addDays, startOfWeek } from 'date-fns';
import WeekViewCalendarHeader from './WeekViewCalendarHeader';
import WeekViewCalendarGrid from './WeekViewCalendarGrid';
import { getWeekViewDragEventData, generateWeekViewEvents } from './weekViewUtils';

const HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 8 PM

const WeekViewCalendar = () => {
  const [events, setEvents] = useState(generateWeekViewEvents());
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
    const data = getWeekViewDragEventData(e);
    if (!data || data.type !== 'week') return;
    setEvents(prev => {
      const idx = prev.findIndex(ev => ev.id === data.eventId);
      if (idx === -1) return prev;
      const event = { ...prev[idx] };
      const origDuration = new Date(event.end).getHours() - new Date(event.start).getHours();
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
        <WeekViewCalendarHeader days={days} />
        <WeekViewCalendarGrid
          days={days}
          hours={HOURS}
          events={events}
          handleDrop={handleDrop}
          handleDragStart={handleDragStart}
        />
      </div>
    </div>
  );
};

export default WeekViewCalendar;
