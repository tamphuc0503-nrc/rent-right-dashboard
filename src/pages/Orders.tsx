import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, LayoutGrid, LayoutList, Filter } from "lucide-react";
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
import ScheduleOrderModal from '@/components/ScheduleOrderModal';

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

type Activity = {
  id: string;
  date: string;
  type: string;
  description: string;
};

type InspectionOrder = {
  id: string;
  orderNumber: string;
  propertyAddress: string;
  inspectorName: string;
  inspectionDate: string;
  status: "pending" | "cancelled" | "scheduled" | "in progress" | "inspected" | "reported" | "completed";
  cost: number;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  clientTags?: string[];
  activities?: Activity[];
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

export default function Orders() {
  const isMobile = useIsMobile();
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<InspectionOrder[]>([]);
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<InspectionOrder | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'add'>('view');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedOrderForSchedule, setSelectedOrderForSchedule] = useState<InspectionOrder | null>(null);
  const [layout, setLayout] = useState<'grid' | 'list'>('list');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOrders(generateSampleOrders(100));
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
      clientName: "John Doe",
      clientEmail: "john@example.com",
      clientPhone: "(555) 123-4567",
      clientTags: ["walk-ins", "call-first"],
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

  const handleSchedule = (order: InspectionOrder) => {
    setSelectedOrderForSchedule(order);
    setIsScheduleModalOpen(true);
  };

  const filteredOrders = orders.filter(order => {
    const q = search.toLowerCase();
    const matchesSearch = (
      order.orderNumber.toLowerCase().includes(q) ||
      order.propertyAddress.toLowerCase().includes(q) ||
      order.inspectorName.toLowerCase().includes(q) ||
      order.inspectionDate.toLowerCase().includes(q) ||
      order.status.toLowerCase().includes(q)
    );
    return matchesSearch && (statusFilter === 'all' || order.status === statusFilter);
  });

  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const startIdx = (page - 1) * ORDERS_PER_PAGE;
  const endIdx = startIdx + ORDERS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(startIdx, endIdx);

  if (page > totalPages && totalPages > 0) setPage(totalPages);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isMobile={isMobile} />
      <div className={`flex-1 ${isMobile ? '' : 'ml-[var(--sidebar-width,256px)]'} transition-all duration-300`}>
        <DashboardHeader />
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Inspection Orders</h1>
            <p className="text-gray-600">
              Manage and track your inspection orders.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <div className="w-full sm:w-auto flex-1 flex gap-2">
              <Input
                type="search"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search inspection orders…"
                className="w-full max-w-md"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="in progress">In Progress</SelectItem>
                  <SelectItem value="inspected">Inspected</SelectItem>
                  <SelectItem value="reported">Reported</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <div className="border rounded-md p-1">
                <Button
                  variant={layout === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setLayout('list')}
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
                <Button
                  variant={layout === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setLayout('grid')}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
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
          </div>
          <div className="rounded-md border bg-white p-0 shadow-sm min-h-[200px]">
            {layout === 'list' ? (
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
                    <TableHead className="text-right">Quick Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, idx) => (
                      <TableRow key={idx}>
                        {Array.from({ length: 8 }).map((_, cellIdx) => (
                          <TableCell key={cellIdx}>
                            <div className="h-4 bg-gray-200 rounded animate-pulse" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    paginatedOrders.map(order => (
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
                            onSchedule={() => handleSchedule(order)}
                            onCancel={() => alert(`Cancel order #${order.orderNumber}`)}
                            onChangeStatus={(s) => handleChangeStatus(order.id, s)}
                            currentStatus={order.status}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button
                              size="sm"
                              variant="ghost"
                              title="Reminder"
                              onClick={() => alert("Send reminder")}
                            >
                              <span className="sr-only">Reminder</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M14 17h6m-3-3v6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              title="Send Invoice"
                              onClick={() => alert("Send invoice")}
                            >
                              <span className="sr-only">Send Invoice</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="3 7 12 13 21 7" /></svg>
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              title="Add Note"
                              onClick={() => alert("Add note")}
                            >
                              <span className="sr-only">Add Note</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M21 15V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h9"/></svg>
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              title="Apply Coupon"
                              onClick={() => alert("Apply coupon")}
                            >
                              <span className="sr-only">Apply Coupon</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="17" cy="7" r="1"/><circle cx="7" cy="17" r="1"/><line x1="6" x2="18" y1="18" y2="6"/></svg>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} className="border rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                        <div className="flex justify-between items-center pt-2">
                          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
                          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  paginatedOrders.map(order => (
                    <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{order.orderNumber}</h3>
                        <OrderActions
                          onView={() => handleView(order)}
                          onEdit={() => handleEdit(order)}
                          onSchedule={() => handleSchedule(order)}
                          onCancel={() => alert(`Cancel order #${order.orderNumber}`)}
                          onChangeStatus={(s) => handleChangeStatus(order.id, s)}
                          currentStatus={order.status}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{order.propertyAddress}</p>
                      <div className="flex justify-between items-center">
                        <span className={`px-2 py-1 rounded-md text-xs font-semibold ${statusColors[order.status]}`}>
                          {order.status.replace(/^\w/, c => c.toUpperCase())}
                        </span>
                        <span className="text-sm font-medium">
                          ${order.cost.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex gap-2 justify-end mt-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          title="Reminder"
                          onClick={() => alert("Send reminder")}
                        >
                          <span className="sr-only">Reminder</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M14 17h6m-3-3v6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          title="Send Invoice"
                          onClick={() => alert("Send invoice")}
                        >
                          <span className="sr-only">Send Invoice</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="3 7 12 13 21 7" /></svg>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          title="Add Note"
                          onClick={() => alert("Add note")}
                        >
                          <span className="sr-only">Add Note</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M21 15V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h9"/></svg>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          title="Apply Coupon"
                          onClick={() => alert("Apply coupon")}
                        >
                          <span className="sr-only">Apply Coupon</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="17" cy="7" r="1"/><circle cx="7" cy="17" r="1"/><line x1="6" x2="18" y1="18" y2="6"/></svg>
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
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
      <ScheduleOrderModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        order={selectedOrderForSchedule || undefined}
      />
    </div>
  );
}
