import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
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
import { Button } from "@/components/ui/button";
import { Bell, Send, FilePlus, Percent } from "lucide-react";
import OrdersTable from "@/components/orders/OrdersTable";
import OrdersMobileCards from "@/components/orders/OrdersMobileCards";
import OrdersPagination from "@/components/orders/OrdersPagination";
import OrdersControlsBar from "@/components/orders/OrdersControlsBar";

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
  const [modalAnchorPoint, setModalAnchorPoint] = useState<{ x: number; y: number } | undefined>();
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

  const handleView = (order: InspectionOrder, e?: React.MouseEvent) => {
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
    setModalAnchorPoint(e ? { x: e.clientX, y: e.clientY } : undefined);
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
            <p className="text-gray-600">Manage and track your inspection orders.</p>
          </div>
          <OrdersControlsBar
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            layout={layout}
            setLayout={setLayout}
            handleAddClick={handleAddClick}
          />

          {isMobile ? (
            <OrdersMobileCards
              paginatedOrders={paginatedOrders}
              isLoading={isLoading}
              statusColors={statusColors}
              handleView={(order: InspectionOrder, e?: React.MouseEvent) => handleView(order, e)}
            />
          ) : (
            <OrdersTable
              paginatedOrders={paginatedOrders}
              isLoading={isLoading}
              statusColors={statusColors}
              handleView={(order: InspectionOrder, e?: React.MouseEvent) => handleView(order, e)}
              handleEdit={handleEdit}
              handleSchedule={handleSchedule}
              handleChangeStatus={handleChangeStatus}
            />
          )}

          <OrdersPagination page={page} totalPages={totalPages} setPage={setPage} />
        </main>
      </div>
      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        order={selectedOrder || undefined}
        anchorPoint={modalAnchorPoint}
      />
      <ScheduleOrderModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        order={selectedOrderForSchedule || undefined}
      />
    </div>
  );
}
