
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { orders } from "@/data/orders";

type Agent = {
  id: string;
  name: string;
  email: string;
  phone: string;
  agentType: string;
};

type Props = {
  agent: Agent;
  onClose: () => void;
};

const AgentDetailsModal: React.FC<Props> = ({ agent, onClose }) => {
  const agentOrders = orders.filter(o => o.agentId === agent.id);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agent Information</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div>
            <div className="font-semibold mb-1">{agent.name}</div>
            <div>Email: {agent.email}</div>
            <div>Phone: {agent.phone}</div>
            <div>Type: {agent.agentType}</div>
          </div>
          <div className="mt-4">
            <div className="font-semibold mb-2">Inspection Orders</div>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="py-1 px-2">Order ID</th>
                  <th className="py-1 px-2">Address</th>
                  <th className="py-1 px-2">Status</th>
                  <th className="py-1 px-2">Cost</th>
                </tr>
              </thead>
              <tbody>
                {agentOrders.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-muted-foreground text-center py-4">No orders assigned</td>
                  </tr>
                )}
                {agentOrders.map(order => (
                  <tr key={order.id}>
                    <td className="py-1 px-2">{order.id}</td>
                    <td className="py-1 px-2">{order.address}</td>
                    <td className="py-1 px-2">{order.status}</td>
                    <td className="py-1 px-2">{order.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogDescription>
        <DialogClose asChild>
          <button className="mt-4 px-4 py-2 rounded bg-accent text-gray-900 hover:bg-accent/70">Close</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default AgentDetailsModal;
