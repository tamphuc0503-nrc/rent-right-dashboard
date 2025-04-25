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
import { format, addDays, startOfWeek } from 'date-fns';
import { Calendar as CalendarIcon, List as ListIcon } from "lucide-react";
import OrderDetailsModal from '@/components/OrderDetailsModal';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import OrdersWeekView, { WeekViewOrder } from '@/components/orders/OrdersWeekView';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

function generateRandomOrdersForWeek(start: Date) {
  const orders: WeekViewOrder[] = [];
  const names = ["John Doe", "Alice Smith", "Harry Lee", "Betty Tran", "Kay Kim"];
  const types = ["Home Inspection", "Property Assessment", "Mold Testing"];
  for (let i = 0; i < 7; i++) {
    const num = Math.floor(Math.random() * 3);
    const day = addDays(start, i);
    for (let j = 0; j < num; j++) {
      const startHour = 8 + Math.floor(Math.random() * 8);
      const startMin = Math.random() < 0.5 ? 0 : 30;
      let duration = 1 + Math.floor(Math.random() * 3);
      if (startHour + duration > 20) duration = 20 - startHour;
      const sH = startHour.toString().padStart(2, "0");
      const sM = startMin.toString().padStart(2, "0");
      const eH = (startHour + duration).toString().padStart(2, "0");
      const eM = sM;
      const dateStr = format(day, "yyyy-MM-dd");
      orders.push({
        id: `ORD-${dateStr}-${j + 1}-${Math.floor(Math.random() * 10000)}`,
        date: dateStr,
        address: `${1000 + i * 20 + j * 5} Main Street, City ${i + 1}`,
        clientName: names[(i + j) % names.length],
        status: ["scheduled", "completed", "pending"][Math.floor(Math.random() * 3)],
        inspectorName: names[(i + j + 1) % names.length],
        orderType: types[j % types.length],
        startTime: `${sH}:${sM}`,
        endTime: `${eH}:${eM}`,
      });
    }
  }
  return orders;
}

export default function MyUpcomingOrders() {
  const isMobile = useIsMobile();
  const [mode, setMode] = useState<"list" | "week">("list");
  const [weekStart, setWeekStart] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 })); // Monday
  const [orders, setOrders] = useState<WeekViewOrder[]>(() => generateRandomOrdersForWeek(weekStart));
  const [isStartPickerOpen, setIsStartPickerOpen] = useState(false);

  const handleWeekChange = (date: Date | undefined) => {
    if (date) {
      const monday = startOfWeek(date, { weekStartsOn: 1 });
      setWeekStart(monday);
      setOrders(generateRandomOrdersForWeek(monday));
    }
  };

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="min-h-screen flex bg-gray-50">
        <Sidebar isMobile={isMobile} />
        <div className={`flex-1 ${isMobile ? '' : 'ml-[var(--sidebar-width,256px)]'}`}>
          <DashboardHeader />
          <main className="p-6">
            <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Upcoming Orders</h1>
                <p className="text-gray-600">View your assigned inspection orders</p>
              </div>
              <div className="flex gap-2 items-center">
                <Button
                  variant={mode === 'list' ? 'default' : 'ghost'}
                  onClick={() => setMode('list')}
                  size="sm"
                >
                  <ListIcon className="h-4 w-4 mr-1" /> List View
                </Button>
                <Button
                  variant={mode === 'week' ? 'default' : 'ghost'}
                  onClick={() => setMode('week')}
                  size="sm"
                >
                  <CalendarIcon className="h-4 w-4 mr-1" /> Week View
                </Button>
              </div>
            </div>

            {mode === "list" ? (
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
                    {orders.map((order, idx) => (
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
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div>
                <div className="flex gap-3 mb-4 items-center">
                  <span className="text-sm text-gray-700 font-semibold">Showing week of:</span>
                  <Popover open={isStartPickerOpen} onOpenChange={setIsStartPickerOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("justify-start")}
                      >
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {weekStart ? format(weekStart, "PPP") : <span>Pick a week</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={weekStart}
                        onSelect={handleWeekChange}
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <OrdersWeekView weekStart={weekStart} orders={orders} />
              </div>
            )}

            <OrderDetailsModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              mode="view"
              order={selectedOrder}
            />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
