import React, { useState } from "react";
import { format, addDays } from "date-fns";
import { dummyInspectors } from "./calendarUtils";
import { generateTimelineEvents } from "./timelineUtils";
import TimelineEvent from "./TimelineEvent";
import {
  setTimelineDragData,
  getTimelineDragEventData,
} from "./timelineDnDUtils";

const TimelineView = () => {
  const [timelineEvents, setTimelineEvents] = useState(generateTimelineEvents());
  const days = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));

  function handleDragStart(
    e: React.DragEvent,
    inspectorIdx: number,
    eventIdx: number
  ) {
    setTimelineDragData(e, inspectorIdx, eventIdx);
  }

  function handleDrop(e: React.DragEvent, inspectorIdx: number, date: Date) {
    const data = getTimelineDragEventData(e);
    if (!data || data.type !== "timeline") return;
    setTimelineEvents((prev) => {
      const prevEvents = [...prev];
      const event = {
        ...prev[prevEvents[data.fromInspector].inspector.id - 1].events[
          data.fromEventIdx
        ],
      };
      const origStart = new Date(event.start);
      const origEnd = new Date(event.end);
      const newStart = new Date(date);
      newStart.setHours(
        origStart.getHours(),
        origStart.getMinutes(),
        0,
        0
      );
      const newEnd = new Date(date);
      newEnd.setHours(
        origEnd.getHours(),
        origEnd.getMinutes(),
        0,
        0
      );
      prevEvents[data.fromInspector].events.splice(data.fromEventIdx, 1);
      prevEvents[inspectorIdx].events.push({
        ...event,
        start: newStart,
        end: newEnd,
      });
      return prevEvents;
    });
  }

  return (
    <div className="border rounded-lg p-4 overflow-x-auto">
      <div className="min-w-[1200px]">
        <div className="grid grid-cols-[200px_repeat(14,1fr)] gap-1">
          <div className="h-12 flex items-center font-semibold">Inspector</div>
          {days.map((day) => (
            <div key={day.toISOString()} className="h-12 text-center border-l">
              <div className="text-sm font-medium">{format(day, "EEE")}</div>
              <div className="text-xs">{format(day, "MMM d")}</div>
            </div>
          ))}
          {timelineEvents.map(({ inspector, events }, inspectorIdx) => (
            <React.Fragment key={inspector.id}>
              <div className="h-20 flex items-center px-2 font-medium">
                {inspector.name}
              </div>
              {days.map((day) => (
                <div
                  key={day.toISOString()}
                  className="h-20 border-l relative"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, inspectorIdx, day)}
                  style={{ minHeight: 48, minWidth: 48 }}
                >
                  {events
                    .filter(
                      (event) =>
                        format(event.start, "yyyy-MM-dd") ===
                        format(day, "yyyy-MM-dd")
                    )
                    .map((event, eventIdx) => {
                      const startTime = format(event.start, "HH:mm");
                      const endTime = format(event.end, "HH:mm");
                      return (
                        <TimelineEvent
                          key={event.id}
                          event={event}
                          color={inspector.color}
                          startTime={startTime}
                          endTime={endTime}
                          onDragStart={(e) =>
                            handleDragStart(e, inspectorIdx, events.indexOf(event))
                          }
                        />
                      );
                    })}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineView;
