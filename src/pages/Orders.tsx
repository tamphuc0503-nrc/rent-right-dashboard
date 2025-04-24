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
import { useToast } from "@/hooks/use-toast";
import OrderDetailsModal from '@/components/OrderDetailsModal';

const generateSampleOrders = (count: number) => {
  const statuses = [
    "pending",
    "scheduled",
    "in progress",
    "inspected",
    "reported",
    "completed",
    "cancelled",
  ] as const;

  const today = new Date();

  return Array.from({ length: count }, (_, idx) => {
    const status = statuses[idx % statuses.length];
    const day = (idx % 28) + 1;
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + day);
    return {
      id: (idx + 1).toString(),
      orderNumber: `ORD-${(10001 + idx).toString().padStart(5, "0")}`,
      propertyAddress: `${(100 + idx)} Elm St, City${idx % 10}`,
      inspectorName: ["Alice Johnson", "Bob Smith", "Carlos Lee", "Dana Kim", "Evan Turner"][(idx % 5)],
      inspectionDate: date.toISOString().slice(0, 10),
      status: status,
      cost: status === "cancelled" ? 0 : 250 + (idx % 5) * 10,
    };
  });
};

type InspectionOrder = {
  id: string;
  orderNumber: string;
  propertyAddress: string;
  inspectorName: string;
  inspectionDate: string;
  status: "pending" | "cancelled" | "scheduled" | "in progress" | "inspected" | "reported" | "completed";
  cost: number;
};

const statusColors: Record<InspectionOrder["status"], string> = {
  pending: "bg-yellow-200 text-yellow-800",
  cancelled: "bg-red-100 text-red-600",
  scheduled: "bg-blue-100 text-blue-700",
  "in progress": "bg-indigo-100 text-indigo-700",
  inspected: "bg-green-100 text-green-700",
  reported: "bg-gray-100 text-gray-700",
  completed: "bg-green-200 text-green-900",
};

const ORDERS_PER_PAGE = 10;

const Orders = () => {
  const isMobile = useIsMobile();
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<InspectionOrder[]>(generateSampleOrders(100));
  const { toast } = useToast();

  const [selectedOrder, setSelectedOrder] = useState<InspectionOrder | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'add'>('view');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(
    orders.filter(order => {
      const q = search.toLowerCase();
      return (
        order.orderNumber.toLowerCase().includes(q) ||
        order.propertyAddress.toLowerCase().includes(q) ||
        order.inspectorName.toLowerCase().includes(q) ||
        order.inspectionDate.toLowerCase().includes(q) ||
        order.status.toLowerCase().includes(q)
      );
    }).length / ORDERS_PER_PAGE
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleAddClick = () => {
    setModalMode('add');
    setSelectedOrder(null);
    setIsModalOpen(true);
  };

  const handleView = (order: InspectionOrder) => {
    setModalMode('view');
    setSelectedOrder({
      ...order,
      activities: [
        {
          id: '1',
          date: new Date().toLocaleDateString(),
          type: 'Status Change',
          description: `Status changed to ${order.status}`,
        },
        {
          id: '2',
          date: new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString(),
          type: 'Order Created',
          description: 'Inspection order was created',
        },
      ],
    });
    setIsModalOpen(true);
  };

  const handleEdit = (order: InspectionOrder) => {
    setModalMode('edit');
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleChangeStatus = (orderId: string, newStatus: InspectionOrder["status"]) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
    toast({
      title: "Status Changed",
      description: `Order #${orders.find(o => o.id === orderId)?.orderNumber} is now "${newStatus.replace(/^\w/, c => c.toUpperCase())}".`,
      duration: 2000,
    });
  };

  const filteredOrders = orders.filter(order => {
    const q = search.toLowerCase();
    return (
      order.orderNumber.toLowerCase().includes(q) ||
      order.propertyAddress.toLowerCase().includes(q) ||
      order.inspectorName.toLowerCase().includes(q) ||
      order.inspectionDate.toLowerCase().includes(q) ||
      order.status.toLowerCase().includes(q)
    );
  });

  const startIdx = (page - 1) * ORDERS_PER_PAGE;
  const endIdx = startIdx + ORDERS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(startIdx, endIdx);

  if (page > totalPages && totalPages > 0) setPage(totalPages);

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
            {paginatedOrders.length === 0 ? (
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
                  {paginatedOrders.map(order => (
                    <TableRow key={order.id}>
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
                        {order.cost > 0 ? `$${order.cost.toLocaleString()}` : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <OrderActions
                          onView={() => handleView(order)}
                          onEdit={() => handleEdit(order)}
                          onSchedule={() => alert(`Schedule order #${order.orderNumber}`)}
                          onCancel={() => alert(`Cancel order #${order.orderNumber}`)}
                          onChangeStatus={(s) => handleChangeStatus(order.id, s)}
                          currentStatus={order.status}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
          <div className="flex justify-between items-center mt-6">
            <Button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4"
              variant="outline"
            >
              Previous
            </Button>
            <span className="text-sm text-gray-700">
              Page {page} of {totalPages}
            </span>
            <Button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
              className="px-4"
              variant="outline"
            >
              Next
            </Button>
          </div>
        </main>
      </div>
      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        order={selectedOrder || undefined}
      />
    </div>
  );
};

export default Orders;
