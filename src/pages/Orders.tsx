import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import OrderActions from "@/components/OrderActions";

type InspectionOrder = {
  id: string;
  orderNumber: string;
  propertyAddress: string;
  inspectorName: string;
  inspectionDate: string;
  status: "pending" | "cancelled" | "scheduled" | "in progress" | "inspected" | "reported" | "completed";
  cost: number;
};

const dummyOrders: InspectionOrder[] = [
  {
    id: "1",
    orderNumber: "ORD-10001",
    propertyAddress: "123 Main St, Springfield",
    inspectorName: "Alice Johnson",
    inspectionDate: "2025-04-25",
    status: "pending",
    cost: 250,
  },
  {
    id: "2",
    orderNumber: "ORD-10002",
    propertyAddress: "456 Elm St, Rivertown",
    inspectorName: "Bob Smith",
    inspectionDate: "2025-04-26",
    status: "scheduled",
    cost: 300,
  },
  {
    id: "3",
    orderNumber: "ORD-10003",
    propertyAddress: "789 Oak Ave, Pineville",
    inspectorName: "Carlos Lee",
    inspectionDate: "2025-04-27",
    status: "in progress",
    cost: 275,
  },
  {
    id: "4",
    orderNumber: "ORD-10004",
    propertyAddress: "321 Maple Dr, Lakeside",
    inspectorName: "Dana Kim",
    inspectionDate: "2025-04-28",
    status: "completed",
    cost: 260,
  },
  {
    id: "5",
    orderNumber: "ORD-10005",
    propertyAddress: "555 Walnut Rd, Hillview",
    inspectorName: "Evan Turner",
    inspectionDate: "2025-04-29",
    status: "cancelled",
    cost: 0,
  },
];

const statusColors: Record<InspectionOrder["status"], string> = {
  pending: "bg-yellow-200 text-yellow-800",
  cancelled: "bg-red-100 text-red-600",
  scheduled: "bg-blue-100 text-blue-700",
  "in progress": "bg-indigo-100 text-indigo-700",
  inspected: "bg-green-100 text-green-700",
  reported: "bg-gray-100 text-gray-700",
  completed: "bg-green-200 text-green-900",
};

const Orders = () => {
  const isMobile = useIsMobile();
  const [search, setSearch] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleAddClick = () => {
    alert("Add inspection order clicked!");
  };

  const orders = dummyOrders.filter(order => {
    const q = search.toLowerCase();
    return (
      order.orderNumber.toLowerCase().includes(q) ||
      order.propertyAddress.toLowerCase().includes(q) ||
      order.inspectorName.toLowerCase().includes(q) ||
      order.inspectionDate.toLowerCase().includes(q) ||
      order.status.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isMobile={isMobile} />
      <div className={`flex-1 ${isMobile ? '' : 'ml-64'}`}>
        <DashboardHeader />
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Inspection Orders</h1>
            <p className="text-gray-600">
              Manage and track your inspection orders.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <div className="w-full sm:w-auto flex-1">
              <Input
                type="search"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search inspection orders…"
                className="w-full max-w-md"
              />
            </div>
            <Button
              onClick={handleAddClick}
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold px-6 py-2 rounded-md flex items-center gap-2 transition-all duration-200"
              size="lg"
            >
              <Plus className="w-5 h-5" />
              Add inspection order
            </Button>
          </div>
          <div className="rounded-md border bg-white p-0 shadow-sm min-h-[200px]">
            {orders.length === 0 ? (
              <div className="p-6 flex items-center justify-center text-gray-500">
                <span>No inspection orders found.</span>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Property Address</TableHead>
                    <TableHead>Inspector</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Cost</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.orderNumber}</TableCell>
                      <TableCell>{order.propertyAddress}</TableCell>
                      <TableCell>{order.inspectorName}</TableCell>
                      <TableCell>{order.inspectionDate}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-md text-xs font-semibold ${statusColors[order.status]}`}>
                          {order.status.replace(/^\w/, c => c.toUpperCase())}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {order.cost > 0 ? `$${order.cost.toLocaleString()}` : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <OrderActions
                          onView={() => alert(`View order #${order.orderNumber}`)}
                          onEdit={() => alert(`Edit order #${order.orderNumber}`)}
                          onSchedule={() => alert(`Schedule order #${order.orderNumber}`)}
                          onCancel={() => alert(`Cancel order #${order.orderNumber}`)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Orders;
