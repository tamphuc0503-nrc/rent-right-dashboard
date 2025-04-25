
import React from "react";
import { format, isWithinInterval, addDays, isAfter, isBefore } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";

type Order = {
  id: string;
  date: string; // yyyy-MM-dd
  address: string;
  clientName: string;
  status: string;
  inspectorName: string;
  orderType: string;
};

type OrdersTimelineProps = {
  orders: Order[];
  start: Date;
  end: Date;
  onOrderClick: (order: Order) => void;
};

function eachDayOfInterval(start: Date, end: Date) {
  const days = [];
  let cur = start;
  while (cur <= end) {
    days.push(cur);
    cur = addDays(cur, 1);
  }
  return days;
}

export default function OrdersTimeline({ orders, start, end, onOrderClick }: OrdersTimelineProps) {
  const days = eachDayOfInterval(start, end);

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col gap-6 min-w-[600px]">
        {days.map((day) => {
          const dayStr = format(day, "yyyy-MM-dd");
          const dayOrders = orders.filter(
            (order) => order.date === dayStr
          );

          return (
            <div key={dayStr} className="border-b last:border-b-0 py-2">
              <div className="flex items-center gap-2 mb-2">
                <CalendarIcon className="h-4 w-4 text-gray-400" />
                <span className="font-semibold text-gray-800">{format(day, "EEEE, MMMM d, yyyy")}</span>
                <span className="text-xs text-gray-500 ml-2">{dayOrders.length} order{dayOrders.length !== 1 ? "s" : ""}</span>
              </div>
              <div className="flex flex-wrap gap-4 pl-7">
                {dayOrders.length === 0 ? (
                  <span className="text-gray-400 text-sm">No orders</span>
                ) : dayOrders.map(order => (
                  <Button
                    key={order.id}
                    className={`
                      transition-all duration-250
                      bg-blue-50 hover:bg-blue-100 text-blue-900 border
                      border-blue-200 rounded-lg shadow-sm
                      px-5 py-3 min-w-[200px] flex flex-col items-start cursor-pointer
                      hover:scale-105
                    `}
                    onClick={() => onOrderClick(order)}
                  >
                    <div className="font-bold mb-1">{order.address}</div>
                    <div className="text-xs text-gray-700">{order.clientName} • {order.orderType}</div>
                    <div className="mt-2 text-xs rounded px-2 py-1" style={{
                      background: order.status === "completed"
                        ? "#bbf7d0"
                        : order.status === "scheduled"
                        ? "#dbeafe"
                        : "#fef9c3",
                      color: order.status === "completed"
                        ? "#166534"
                        : order.status === "scheduled"
                        ? "#2563eb"
                        : "#b45309"
                    }}>
                      {order.status}
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
