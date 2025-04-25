
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect } from "react";
import { addRecentOrderId } from "@/utils/recentOrders";

// Dummy data for demo
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
  // Add more dummy orders as needed
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

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isMobile={isMobile} />
      <div className={`flex-1 ${isMobile ? '' : 'ml-[var(--sidebar-width,256px)]'}`}>
        <DashboardHeader />
        <main className="p-6 max-w-3xl mx-auto">
          <div className="mb-8 flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">
              Order {order.orderNumber}
            </h1>
          </div>
          <div className="bg-white rounded-md border px-6 py-6 shadow space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-medium text-gray-800">Order Number</div>
                <div>{order.orderNumber}</div>
              </div>
              <div>
                <div className="font-medium text-gray-800">Date</div>
                <div>{order.date}</div>
              </div>
              <div>
                <div className="font-medium text-gray-800">Address</div>
                <div>{order.address}</div>
              </div>
              <div>
                <div className="font-medium text-gray-800">Client</div>
                <div>{order.clientName}</div>
              </div>
              <div>
                <div className="font-medium text-gray-800">Inspector</div>
                <div>{order.inspectorName}</div>
              </div>
              <div>
                <div className="font-medium text-gray-800">Status</div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
              <div>
                <div className="font-medium text-gray-800">Type</div>
                <div>{order.orderType}</div>
              </div>
            </div>
            {/* Activity Section */}
            <div className="mt-6">
              <div className="font-semibold mb-2 text-gray-800">Activity</div>
              {order.activities.length === 0 ? (
                <div className="text-gray-500 text-sm">No activity to show.</div>
              ) : (
                <ul className="space-y-2">
                  {order.activities.map((a: any, idx: number) => (
                    <li key={a.id || idx} className="flex flex-col py-1 px-2 bg-gray-50 rounded">
                      <span className="text-xs text-gray-600">{a.date} &mdash; <span className="font-medium">{a.type}</span></span>
                      <span className="text-sm">{a.description}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
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
