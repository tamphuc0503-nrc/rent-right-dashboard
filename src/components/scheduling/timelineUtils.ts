
import { addDays } from 'date-fns';
import { dummyInspectors } from './calendarUtils';

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
