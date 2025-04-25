import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Button } from "@/components/ui/button";
import OrdersTimeline from "@/components/orders/OrdersTimeline";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { format, addDays } from 'date-fns';
import { Eye, Calendar as CalendarIcon, List as ListIcon } from "lucide-react";
import OrderDetailsModal from '@/components/OrderDetailsModal';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

function getDummyOrders(timelineStart: Date, timelineEnd: Date) {
  const days = [];
  let cur = new Date(timelineStart);
  while (cur <= timelineEnd) {
    days.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  const orders = [];
  days.forEach((day, i) => {
    for (let j = 0; j < 2; j++) {
      const inspectionHour = j === 0 ? 9 : 14;
      const dateObj = new Date(day);
      dateObj.setHours(inspectionHour, 0, 0, 0);
      orders.push({
        id: `ORD-${format(dateObj, "yyyyMMdd")}-${j + 1}`,
        date: format(dateObj, 'yyyy-MM-dd'),
        address: `${1000 + i * 2 + j} Oak Street, City ${i + 1}`,
        clientName: `Client ${i + 1}-${j + 1}`,
        status: (i + j) % 3 === 0 ? "scheduled" : (j % 3 === 1 ? "completed" : "pending"),
        inspectorName: `Inspector ${j === 0 ? "John" : "Sarah"}`,
        orderType: j % 2 === 0 ? "Home Inspection" : "Property Assessment",
        time: format(dateObj, "HH:mm"),
        timeObj: new Date(dateObj),
      });
    }
  });
  return orders;
}

export default function MyUpcomingOrders() {
  const isMobile = useIsMobile();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<"list" | "timeline">("list");

  const [timelineStart, setTimelineStart] = useState<Date>(new Date());
  const [timelineEnd, setTimelineEnd] = useState<Date>(addDays(new Date(), 6));
  const [isStartPickerOpen, setIsStartPickerOpen] = useState(false);
  const [isEndPickerOpen, setIsEndPickerOpen] = useState(false);

  const orders = getDummyOrders(timelineStart, timelineEnd);

  return (
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
                variant={mode === 'timeline' ? 'default' : 'ghost'}
                onClick={() => setMode('timeline')}
                size="sm"
              >
                <CalendarIcon className="h-4 w-4 mr-1" /> Timeline View
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
          ) : (
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex flex-col md:flex-row gap-2 md:items-center mb-4">
                <span className="text-sm text-gray-700 font-semibold mr-2">Show timeline from:</span>
                <Popover open={isStartPickerOpen} onOpenChange={setIsStartPickerOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("justify-start", !timelineStart && "text-muted-foreground")}
                    >
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {timelineStart ? format(timelineStart, "PPP") : <span>Start Date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={timelineStart}
                      onSelect={(date) => {
                        if (date) {
                          setTimelineStart(date);
                          if (date > timelineEnd) setTimelineEnd(date);
                        }
                        setIsStartPickerOpen(false);
                      }}
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <span className="px-2 text-gray-400">to</span>
                <Popover open={isEndPickerOpen} onOpenChange={setIsEndPickerOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("justify-start", !timelineEnd && "text-muted-foreground")}
                    >
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {timelineEnd ? format(timelineEnd, "PPP") : <span>End Date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={timelineEnd}
                      onSelect={(date) => {
                        if (date) {
                          setTimelineEnd(date);
                          if (date < timelineStart) setTimelineStart(date);
                        }
                        setIsEndPickerOpen(false);
                      }}
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <OrdersTimeline
                orders={orders}
                start={timelineStart}
                end={timelineEnd}
                onOrderClick={(order) => {
                  setSelectedOrder(order);
                  setIsModalOpen(true);
                }}
              />
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
  );
}
