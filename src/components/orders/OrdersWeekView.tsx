
import React from "react";
import { format, addDays } from "date-fns";
import { Button } from "../ui/button";
import { useState as useReactState } from "react";
import { Eye, ExternalLink } from "lucide-react";

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

const HOURS = Array.from({ length: 13 }, (_, i) => 8 + i); // 8 to 20 inclusive

function getTimeInMinutes(t: string) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

const COLORS = [
  "bg-blue-500",       // 1
  "bg-green-500",      // 2
  "bg-yellow-500",     // 3
  "bg-pink-500",       // 4
  "bg-purple-500",     // 5
  "bg-orange-500"      // 6
];

export default function OrdersWeekView({ weekStart, orders }: OrdersWeekViewProps) {
  const [reviewOrder, setReviewOrder] = useReactState(null);
  const days = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));
  const ordersByDate: Record<string, WeekViewOrder[]> = {};
  orders.forEach(order => {
    (ordersByDate[order.date] = ordersByDate[order.date] || []).push(order);
  });

  function getColor(idx: number) {
    return COLORS[idx % COLORS.length];
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow p-4 border">
      <div className="flex">
        <div className="flex flex-col w-[120px] border-r mr-1 shrink-0">
          <div className="h-10" />
          {days.map((d) => (
            <div
              key={d.toISOString()}
              className="min-h-[7.5rem] h-[7.5rem] md:min-h-[10rem] md:h-[10rem] lg:min-h-[12rem] lg:h-[12rem] flex flex-col justify-center border-b last:border-b-0"
            >
              <div className="font-semibold text-gray-800">{format(d, "EEE")}</div>
              <div className="text-xs text-gray-500">{format(d, "MMM d")}</div>
            </div>
          ))}
        </div>
        <div className="relative flex-1 overflow-x-auto">
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
                  className="relative min-h-[7.5rem] h-[7.5rem] md:min-h-[10rem] md:h-[10rem] lg:min-h-[12rem] lg:h-[12rem] border-b flex"
                  style={{ minHeight: 90 }}
                >
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
                  {dayOrders.map((order, idx) => {
                    const start = getTimeInMinutes(order.startTime);
                    const end = getTimeInMinutes(order.endTime);
                    const leftPercent = ((start - 480) / (12 * 60)) * 100;
                    const widthPercent = Math.max(
                      ((end - start) / (12 * 60)) * 100,
                      5
                    ); // at least 5%
                    const clr = getColor(idx);
                    return (
                      <div
                        key={order.id}
                        className={`
                          absolute
                          top-2 group
                          flex flex-col items-start rounded text-xs shadow-md px-2 py-1 border cursor-pointer
                          hover:brightness-95 transition-all
                          ${clr} text-white border-white
                        `}
                        style={{
                          left: `calc(${leftPercent}% + 2px)`,
                          width: `calc(${widthPercent}% - 4px)`,
                          height: "calc(100% - 8px)",
                          zIndex: 2,
                        }}
                        title={`${order.startTime}-${order.endTime} ${order.address}`}
                      >
                        <span className="font-bold mb-0.5">{order.address}</span>
                        <span className="text-xs">{order.clientName}</span>
                        <span className="mt-2 rounded px-2 py-0.5 bg-white bg-opacity-20 text-xs font-semibold">{order.status}</span>
                        <span className="font-semibold text-xs mt-1">{order.startTime}-{order.endTime}</span>

                        {/* Quick icon actions; visible on hover */}
                        <span className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-1 z-10">
                          <Button
                            size="icon"
                            variant="outline"
                            className="bg-white/90 text-black hover:bg-black hover:text-white border"
                            onClick={() => setReviewOrder(order)}
                            aria-label="Review"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            className="bg-white/90 text-black hover:bg-black hover:text-white border"
                            onClick={() => window.open(`/orders/${order.id}`, "_blank", "noopener")}
                            aria-label="Open order"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {reviewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={() => setReviewOrder(null)}>
          <div className="bg-white rounded-xl p-6 shadow-lg min-w-[320px] max-w-[90vw]" onClick={e => e.stopPropagation()}>
            <h2 className="font-semibold text-lg mb-2">Order Review</h2>
            <div className="mb-2">{reviewOrder.address || "(No address)"}</div>
            <div>Client:&nbsp;<b>{reviewOrder.clientName}</b></div>
            <div>Type: {reviewOrder.orderType}</div>
            <div>Time: {reviewOrder.startTime} - {reviewOrder.endTime}</div>
            <Button variant="default" className="mt-4" onClick={() => setReviewOrder(null)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}
