import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import OrderActions from "@/components/OrderActions";
import { Bell, Send, FilePlus, Percent } from "lucide-react";
import { useState } from "react";

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

type OrdersTableProps = {
  paginatedOrders: InspectionOrder[];
  isLoading: boolean;
  statusColors: Record<StatusType, string>;
  handleView: (order: InspectionOrder, e?: React.MouseEvent) => void;
  handleEdit: (order: InspectionOrder) => void;
  handleSchedule: (order: InspectionOrder) => void;
  handleChangeStatus: (id: string, status: StatusType) => void;
};

export default function OrdersTable({
  paginatedOrders,
  isLoading,
  statusColors,
  handleView,
  handleEdit,
  handleSchedule,
  handleChangeStatus,
}: OrdersTableProps) {
  return (
    <div className="rounded-md border bg-white p-0 shadow-sm min-h-[200px] overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order #</TableHead>
            <TableHead>Property Address</TableHead>
            <TableHead>Inspector</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Quick Actions</TableHead>
            <TableHead className="text-right">Actions</TableHead>
            <TableHead className="text-right">Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <TableRow key={idx}>
                <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse" /></TableCell>
                <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse" /></TableCell>
                <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse" /></TableCell>
                <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse" /></TableCell>
                <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse" /></TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-1 justify-end">
                    <div className="h-6 w-6 rounded bg-orange-200 animate-pulse"></div>
                    <div className="h-6 w-6 rounded bg-blue-200 animate-pulse"></div>
                    <div className="h-6 w-6 rounded bg-green-200 animate-pulse"></div>
                    <div className="h-6 w-6 rounded bg-pink-200 animate-pulse"></div>
                  </div>
                </TableCell>
                <TableCell className="text-right"><div className="h-4 bg-gray-200 rounded animate-pulse" /></TableCell>
                <TableCell className="text-right"><div className="h-4 bg-gray-200 rounded animate-pulse" /></TableCell>
              </TableRow>
            ))
          ) : (
            paginatedOrders.map(order => (
              <TableRow
                key={order.id}
              >
                <TableCell className="font-medium">{order.orderNumber}</TableCell>
                <TableCell>{order.propertyAddress}</TableCell>
                <TableCell>{order.inspectorName}</TableCell>
                <TableCell>{order.inspectionDate}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold ${statusColors[order.status]} transition-colors duration-300`}>
                    {order.status.replace(/^\w/, c => c.toUpperCase())}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-orange-100 hover:bg-orange-200 text-orange-600 hover:animate-shake"
                      title="Reminder"
                      onClick={() => alert("Send reminder")}
                    >
                      <Bell className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 hover:animate-shake"
                      title="Send Invoice"
                      onClick={() => alert("Send invoice")}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-green-100 hover:bg-green-200 text-green-700 hover:animate-shake"
                      title="Add Note"
                      onClick={() => alert("Add note")}
                    >
                      <FilePlus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-pink-100 hover:bg-pink-200 text-pink-700 hover:animate-shake"
                      title="Apply Coupon"
                      onClick={() => alert("Apply coupon")}
                    >
                      <Percent className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-right relative">
                  <OrderActions
                    onView={(e?: React.MouseEvent) => handleView(order, e)}
                    onEdit={() => handleEdit(order)}
                    onSchedule={() => handleSchedule(order)}
                    onCancel={() => alert(`Cancel order #${order.orderNumber}`)}
                    onChangeStatus={(s) => handleChangeStatus(order.id, s)}
                    currentStatus={order.status}
                  />
                </TableCell>
                <TableCell className="text-right">
                  {order.cost > 0 ? `$${order.cost.toLocaleString()}` : "-"}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
