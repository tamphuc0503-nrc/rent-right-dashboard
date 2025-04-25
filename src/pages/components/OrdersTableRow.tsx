
import React from "react";
import { Button } from "@/components/ui/button";
import { WeekViewOrder } from "@/components/orders/OrdersWeekView";

type Props = {
  order: WeekViewOrder;
  onView: (order: WeekViewOrder, e?: React.MouseEvent) => void;
};

const OrdersTableRow: React.FC<Props> = ({ order, onView }) => (
  <tr>
    <td>{order.id}</td>
    <td>{order.date}</td>
    <td>{order.address}</td>
    <td>{order.clientName}</td>
    <td>{order.inspectorName}</td>
    <td>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        order.status === 'completed' ? 'bg-green-100 text-green-800' :
        order.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
        'bg-yellow-100 text-yellow-800'
      }`}>
        {order.status}
      </span>
    </td>
    <td>{order.orderType}</td>
    <td className="text-right">
      <Button
        variant="outline"
        size="sm"
        onClick={e => onView(order, e)}
      >
        View
      </Button>
    </td>
  </tr>
);

export default OrdersTableRow;
