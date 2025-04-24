
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { format, addDays } from 'date-fns';
import { Eye } from "lucide-react";
import OrderDetailsModal from '@/components/OrderDetailsModal';

function getDummyOrders() {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `ORD-${2024000 + i}`,
    date: format(addDays(new Date(), i), 'yyyy-MM-dd'),
    address: `${1000 + i} Oak Street, City ${i + 1}`,
    clientName: `Client ${i + 1}`,
    status: i % 3 === 0 ? "scheduled" : i % 3 === 1 ? "completed" : "pending",
    inspectorName: `Inspector ${i % 3 + 1}`,
    orderType: i % 2 === 0 ? "Home Inspection" : "Property Assessment",
  }));
}

export default function MyUpcomingOrders() {
  const isMobile = useIsMobile();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const orders = getDummyOrders();

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isMobile={isMobile} />
      <div className={`flex-1 ${isMobile ? '' : 'ml-[var(--sidebar-width,256px)]'}`}>
        <DashboardHeader />
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">My Upcoming Orders</h1>
            <p className="text-gray-600">View your assigned inspection orders</p>
          </div>

          <div className="rounded-md border bg-white shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Inspector</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.address}</TableCell>
                    <TableCell>{order.clientName}</TableCell>
                    <TableCell>{order.inspectorName}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>{order.orderType}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedOrder(order);
                          setIsModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <OrderDetailsModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            mode="view"
            order={selectedOrder}
          />
        </main>
      </div>
    </div>
  );
}
