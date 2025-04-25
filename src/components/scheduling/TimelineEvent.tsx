
import React from "react";
import { format } from "date-fns";

interface TimelineEventProps {
  event: {
    id: string;
    title: string;
    start: number;
    end: number;
  };
  color: string;
  onDragStart: (e: React.DragEvent) => void;
  startTime: string;
  endTime: string;
}

const TimelineEvent: React.FC<TimelineEventProps> = ({
  event,
  color,
  onDragStart,
  startTime,
  endTime,
}) => (
  <div
    className={`absolute top-2 left-1 right-1 p-1 text-xs text-white rounded cursor-grab ${color}`}
    title={`${startTime} - ${endTime}: ${event.title}`}
    draggable
    onDragStart={onDragStart}
    style={{ zIndex: 2 }}
  >
    {startTime} {event.title}
  </div>
);

export default TimelineEvent;
