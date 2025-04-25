
// Used in OrderMapView.tsx for grouping Map and orders per day
import React, { useState } from "react";
import { CalendarIcon } from "lucide-react";

type MapOrderDayGroupProps = {
  day: Date;
  count: number;
  children: {
    map: React.ReactNode;
    orders: React.ReactNode;
  };
};

export default function MapOrderDayGroup({ day, children, count }: MapOrderDayGroupProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-6 border rounded-lg shadow-sm overflow-hidden bg-white">
      <div className="flex items-center px-4 py-2 cursor-pointer bg-gray-50 transition-all select-none" onClick={() => setOpen(o => !o)}>
        <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
        <div className="font-semibold text-gray-900">
          {day.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "short", day: "numeric" })}
        </div>
        <span className="ml-3 inline-block text-xs rounded-full bg-blue-100 text-blue-700 px-2 py-1">
          {count} order{count !== 1 ? "s" : ""}
        </span>
        <span className={"ml-auto transition-transform " + (open ? "rotate-180" : "rotate-0")}>
          ▼
        </span>
      </div>
      <div className={`transition-all duration-300 ease-in-out ${open ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
        {open && (
          <div className="flex flex-col md:flex-row gap-6 p-4">
            <div className="md:w-1/2 w-full">{children.map}</div>
            <div className="md:w-1/2 w-full">{children.orders}</div>
          </div>
        )}
      </div>
    </div>
  );
}
