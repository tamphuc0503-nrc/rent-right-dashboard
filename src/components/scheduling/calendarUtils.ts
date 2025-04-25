
import { addDays, startOfWeek } from 'date-fns';

export const dummyInspectors = [
  { id: 1, name: 'John Smith', color: 'bg-blue-500' },
  { id: 2, name: 'Sarah Johnson', color: 'bg-green-500' },
  { id: 3, name: 'Mike Brown', color: 'bg-purple-500' },
  { id: 4, name: 'Emma Davis', color: 'bg-yellow-500' },
  { id: 5, name: 'James Wilson', color: 'bg-pink-500' },
  { id: 6, name: 'Lisa Anderson', color: 'bg-orange-500' },
];

export function getDragEventData(e: React.DragEvent) {
  try {
    return JSON.parse(e.dataTransfer.getData('application/json'));
  } catch {
    return null;
  }
}

export function generateTimelineEvents() {
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
