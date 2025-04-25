
import React from "react";
import { format, addDays, setHours, startOfWeek } from "date-fns";

export type WeekViewOrder = {
  id: string;
  date: string; // yyyy-MM-dd
  address: string;
  clientName: string;
  status: string;
  inspectorName: string;
  orderType: string;
  startTime: string; // "HH:mm"
  endTime: string;   // "HH:mm"
};

type OrdersWeekViewProps = {
  weekStart: Date;
  orders: WeekViewOrder[];
};

const HOURS = Array.from({ length: 13 }, (_, i) => 8 + i); // 8 to 20 inclusive (8am - 8pm)

function getTimeInMinutes(t: string) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

// Order bar height and offset utilities for CSS grid
function calcTopOffset(startTime: string) {
  const mins = getTimeInMinutes(startTime);
  return ((mins - 8 * 60) / (12 * 60)) * 100;
}

function calcOrderHeight(startTime: string, endTime: string) {
  const diff = getTimeInMinutes(endTime) - getTimeInMinutes(startTime);
  return (diff / (12 * 60)) * 100; // grid cell height in percent of full day
}

export default function OrdersWeekView({ weekStart, orders }: OrdersWeekViewProps) {
  const days = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));

  // Group orders by date (yyyy-MM-dd)
  const ordersByDate: Record<string, WeekViewOrder[]> = {};
  orders.forEach(order => {
    (ordersByDate[order.date] = ordersByDate[order.date] || []).push(order);
  });

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow p-4 border">
      <div className="flex">
        {/* Dates column */}
        <div className="flex flex-col w-[120px] border-r mr-1 shrink-0">
          <div className="h-10" /> {/* header space */}
          {days.map((d) => (
            <div
              key={d.toISOString()}
              className="h-32 md:h-40 lg:h-48 flex flex-col justify-center border-b last:border-b-0"
            >
              <div className="font-semibold text-gray-800">{format(d, "EEE")}</div>
              <div className="text-xs text-gray-500">{format(d, "MMM d")}</div>
            </div>
          ))}
        </div>
        {/* Hour grid and orders */}
        <div className="relative flex-1 overflow-x-auto">
          {/* Hour headers */}
          <div className="flex">
            {HOURS.map((h) => (
              <div
                key={h}
                className="h-10 min-w-[80px] flex items-center justify-center font-medium text-sm bg-gray-50 border-b border-l first:border-l-0 text-gray-700"
              >
                {`${h}:00`}
              </div>
            ))}
          </div>
          <div>
            {days.map((d) => {
              const dayStr = format(d, "yyyy-MM-dd");
              const dayOrders = ordersByDate[dayStr] ?? [];
              return (
                <div
                  key={dayStr}
                  className="relative h-32 md:h-40 lg:h-48 border-b flex"
                  style={{ minHeight: 90 }} // fallback
                >
                  {/* Vertical hour cell backgrounds (grid lines) */}
                  {HOURS.map((_, idx) => (
                    <div
                      key={idx}
                      className="absolute inset-y-0"
                      style={{
                        left: `calc(${(idx / HOURS.length) * 100}% + 2px)`,
                        width: idx === HOURS.length - 1 ? 0 : `calc(100% / ${HOURS.length})`,
                        borderLeft: idx !== 0 ? '1px solid #eee' : undefined,
                        zIndex: 0,
                      }}
                    />
                  ))}
                  {/* Orders as bars */}
                  {dayOrders.map((order, idx) => {
                    // Compute absolute positioning within the grid
                    const start = getTimeInMinutes(order.startTime); // e.g., 9:30 -> 570
                    const end = getTimeInMinutes(order.endTime);
                    const colStart = Math.floor((start - 480) / 60); // 480 = 8*60
                    const leftPercent = ((start - 480) / (12 * 60)) * 100;
                    const widthPercent = Math.max(
                      ((end - start) / (12 * 60)) * 100,
                      5
                    ); // at least 5%
                    return (
                      <button
                        key={order.id}
                        className="
                          absolute
                          top-2
                          flex flex-col items-start rounded text-xs shadow-md px-2 py-1 border cursor-pointer
                          hover:brightness-95 transition-all
                          bg-blue-100 text-blue-900 border-blue-300
                          "
                        style={{
                          left: `calc(${leftPercent}% + 2px)`,
                          width: `calc(${widthPercent}% - 4px)`,
                          height: "calc(100% - 8px)",
                          zIndex: 2,
                        }}
                        title={`${order.startTime}-${order.endTime} ${order.address}`}
                        onClick={e => {
                          e.preventDefault();
                          window.open(`/orders/${order.id}`, "_blank", "noopener,noreferrer");
                        }}
                      >
                        <span className="font-bold mb-0.5 text-blue-950">{order.address}</span>
                        <span className="text-xs text-blue-700">{order.clientName}</span>
                        <span className="mt-2 rounded px-2 py-0.5 bg-white text-blue-700 border border-blue-200 text-xs font-semibold">{order.status}</span>
                        <span className="font-semibold text-xs mt-1">{order.startTime}-{order.endTime}</span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

