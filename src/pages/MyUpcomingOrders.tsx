
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import {
  format,
  addDays,
  startOfWeek
} from 'date-fns';
import OrderDetailsModal from '@/components/OrderDetailsModal';
import { TooltipProvider } from '@/components/ui/tooltip';

import OrdersWeekView, { WeekViewOrder } from '@/components/orders/OrdersWeekView';

import MyUpcomingOrdersHeader from './components/MyUpcomingOrdersHeader';
import OrdersListView from './components/OrdersListView';
import OrdersWeekPanel from './components/OrdersWeekPanel';

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
  const [modalAnchorPoint, setModalAnchorPoint] = useState<{ x: number; y: number } | undefined>();

  const handleOpenOrderModal = (order: any, e?: React.MouseEvent) => {
    if (e) {
      setModalAnchorPoint({ x: e.clientX, y: e.clientY });
    } else {
      setModalAnchorPoint(undefined);
    }
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen flex bg-gray-50">
        <Sidebar isMobile={isMobile} />
        <div className={`flex-1 ${isMobile ? '' : 'ml-[var(--sidebar-width,256px)]'}`}>
          <DashboardHeader />
          <main className="p-6">
            <MyUpcomingOrdersHeader mode={mode} setMode={setMode} />
            {mode === "list" ? (
              <OrdersListView orders={orders} onView={handleOpenOrderModal} />
            ) : (
              <OrdersWeekPanel
                weekStart={weekStart}
                onWeekChange={handleWeekChange}
                isStartPickerOpen={isStartPickerOpen}
                setIsStartPickerOpen={setIsStartPickerOpen}
                orders={orders}
                onReviewOrder={handleOpenOrderModal}
              />
            )}
            <OrderDetailsModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              mode="view"
              order={selectedOrder}
              anchorPoint={modalAnchorPoint}
            />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
