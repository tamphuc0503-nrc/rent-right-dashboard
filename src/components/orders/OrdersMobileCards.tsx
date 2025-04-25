
import { Button } from "@/components/ui/button";
import { Bell, Send, FilePlus, Percent } from "lucide-react";

type StatusType =
  | "pending"
  | "cancelled"
  | "scheduled"
  | "in progress"
  | "inspected"
  | "reported"
  | "completed";

type InspectionOrder = {
  id: string;
  orderNumber: string;
  propertyAddress: string;
  inspectorName: string;
  inspectionDate: string;
  status: StatusType;
  cost: number;
};

type OrdersMobileCardsProps = {
  paginatedOrders: InspectionOrder[];
  isLoading: boolean;
  statusColors: Record<StatusType, string>;
  handleView: (order: InspectionOrder) => void;
};

export default function OrdersMobileCards({
  paginatedOrders,
  isLoading,
  statusColors,
  handleView,
}: OrdersMobileCardsProps) {
  return (
    <div className="space-y-3">
      {isLoading
        ? Array.from({ length: 5 }).map((_, idx) => (
            <div className="bg-white rounded-lg p-4 shadow flex flex-col gap-3 animate-pulse" key={idx}>
              <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
              <div className="h-3 w-2/3 bg-gray-100 rounded"></div>
              <div className="flex gap-2">
                <div className="h-4 w-10 bg-violet-200 rounded"></div>
                <div className="h-4 w-10 bg-orange-200 rounded"></div>
              </div>
            </div>
          ))
        : paginatedOrders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold">{order.orderNumber}</div>
                  <div className="text-xs text-gray-500">{order.propertyAddress}</div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                  {order.status.replace(/^\w/, c => c.toUpperCase())}
                </span>
              </div>
              <div className="text-xs text-gray-700">Inspector: {order.inspectorName}</div>
              <div className="text-xs text-gray-700">Date: {order.inspectionDate}</div>
              <div className="flex gap-1 mt-2 flex-wrap">
                <Button size="icon" variant="ghost" className="bg-orange-100 hover:bg-orange-200 text-orange-600"
                  title="Reminder" onClick={() => alert("Send reminder")}>
                  <Bell className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="bg-blue-100 hover:bg-blue-200 text-blue-700"
                  title="Send Invoice" onClick={() => alert("Send invoice")}>
                  <Send className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="bg-green-100 hover:bg-green-200 text-green-700"
                  title="Add Note" onClick={() => alert("Add note")}>
                  <FilePlus className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="bg-pink-100 hover:bg-pink-200 text-pink-700"
                  title="Apply Coupon" onClick={() => alert("Apply coupon")}>
                  <Percent className="h-4 w-4" />
                </Button>
                <Button size="sm" className="bg-purple-700 text-white hover:bg-purple-800 ml-auto"
                  onClick={() => handleView(order)}>
                  View
                </Button>
              </div>
            </div>
          ))
      }
    </div>
  );
}
