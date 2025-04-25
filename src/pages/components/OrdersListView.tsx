
import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import OrdersTableRow from "./OrdersTableRow";
import { WeekViewOrder } from "@/components/orders/OrdersWeekView";

type Props = {
  orders: WeekViewOrder[];
  onView: (order: WeekViewOrder, e?: React.MouseEvent) => void;
};

const OrdersListView: React.FC<Props> = ({ orders, onView }) => (
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
        {orders.map(order => (
          <OrdersTableRow key={order.id} order={order} onView={onView} />
        ))}
      </TableBody>
    </Table>
  </div>
);

export default OrdersListView;
