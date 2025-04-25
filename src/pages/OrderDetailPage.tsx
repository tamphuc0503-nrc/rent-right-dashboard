import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect } from "react";
import { addRecentOrderId } from "@/utils/recentOrders";
import { OrderDetailsContent } from "@/components/order-form/OrderDetailsContent";
import OrderActions from "@/components/OrderActions";

const DUMMY_ORDERS = [
  {
    id: "ORD-10005",
    orderNumber: "ORD-10005",
    date: "2024-06-01",
    address: "1005 Oak Street, Example City",
    clientName: "John Doe",
    inspectorName: "Jane Smith",
    status: "scheduled",
    orderType: "Home Inspection",
    activities: [
      {
        id: "1",
        date: "2024-05-25",
        type: "Created",
        description: "Order created by John Doe.",
      },
      {
        id: "2",
        date: "2024-05-31",
        type: "Assigned",
        description: "Jane Smith assigned as inspector.",
      },
    ],
  },
  {
    id: "ORD-10043",
    orderNumber: "ORD-10043",
    date: "2024-06-03",
    address: "1043 Oak Street, Example City",
    clientName: "Alice Johnson",
    inspectorName: "Sam Wilson",
    status: "completed",
    orderType: "Property Assessment",
    activities: [
      {
        id: "1",
        date: "2024-05-20",
        type: "Created",
        description: "Order created by Alice Johnson.",
      },
      {
        id: "2",
        date: "2024-06-03",
        type: "Completed",
        description: "Inspection completed.",
      },
    ],
  },
];

function getOrderById(orderId: string) {
  return DUMMY_ORDERS.find((o) => o.id === orderId) || {
    id: orderId,
    orderNumber: orderId,
    date: "N/A",
    address: "N/A",
    clientName: "Unknown",
    inspectorName: "Unknown",
    status: "pending",
    orderType: "N/A",
    activities: [],
  };
}

export default function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const order = getOrderById(orderId ?? "");

  useEffect(() => {
    if (orderId) addRecentOrderId(orderId);
  }, [orderId]);

  const handleView = () => {};
  const handleEdit = () => {};
  const handleSchedule = () => {};
  const handleCancel = () => {};
  const handleChangeStatus = (_: string) => {};

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isMobile={isMobile} />
      <div className={`flex-1 ${isMobile ? '' : 'ml-[var(--sidebar-width,256px)]'}`}>
        <DashboardHeader />
        <main className="p-6 max-w-6xl mx-auto">
          <div className="mb-6 flex items-start gap-3">
            <h1 className="text-2xl font-bold text-gray-900 flex-1">
              Order {order.orderNumber}
            </h1>
            <OrderActions
              onView={handleView}
              onEdit={handleEdit}
              onSchedule={handleSchedule}
              onCancel={handleCancel}
              onChangeStatus={handleChangeStatus}
              currentStatus={order.status as any}
            />
          </div>
          <div className="bg-white rounded-md border px-6 py-6 shadow space-y-2">
            <OrderDetailsContent order={order} form={null} editable={false} />
          </div>
          <button
            className="mt-6 px-4 py-2 text-blue-600 ring-1 ring-blue-200 rounded hover:bg-blue-50"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </main>
      </div>
    </div>
  );
}
