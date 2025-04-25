import { addDays, startOfWeek } from 'date-fns';
import { dummyInspectors } from './calendarUtils';

// Helper to get drag event data for week view
export function getWeekViewDragEventData(e: React.DragEvent) {
  try {
    return JSON.parse(e.dataTransfer.getData('application/json'));
  } catch {
    return null;
  }
}

export function generateWeekViewEvents() {
  const events = [];
  const startDate = startOfWeek(new Date());
  dummyInspectors.forEach(inspector => {
    for (let i = 0; i < 5; i++) {
      const dayOffset = Math.floor(Math.random() * 7);
      const startHour = 8 + Math.floor(Math.random() * 6);
      const duration = 1 + Math.floor(Math.random() * 3);
      events.push({
        id: `${inspector.id}-${i}`,
        title: `Inspection at ${1000 + Math.floor(Math.random() * 100)} Oak St`,
        inspector: inspector.name,
        start: addDays(startDate, dayOffset).setHours(startHour, 0, 0, 0),
        end: addDays(startDate, dayOffset).setHours(startHour + duration, 0, 0, 0),
        color: inspector.color,
      });
    }
  });
  return events;
}
