
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserCircle } from "lucide-react";

type Inspector = {
  id: string;
  name: string;
  email: string;
};

type ScheduleOrderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  order?: {
    orderNumber: string;
    propertyAddress: string;
    cost: number;
  };
};

const mockInspectors: Inspector[] = [
  { id: '1', name: 'John Smith', email: 'john@example.com' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com' },
  { id: '3', name: 'Mike Brown', email: 'mike@example.com' },
];

const ScheduleOrderModal = ({ isOpen, onClose, order }: ScheduleOrderModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Schedule Inspection Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Order Information</h3>
            <div className="grid gap-2 text-sm">
              <div><span className="font-medium">Order ID:</span> {order?.orderNumber}</div>
              <div><span className="font-medium">Address:</span> {order?.propertyAddress}</div>
              <div><span className="font-medium">Cost:</span> ${order?.cost}</div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Pre-inspection Note</Label>
            <Textarea
              id="note"
              placeholder="Add any important notes for the inspector..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Available Inspectors</h3>
            <ScrollArea className="h-[200px] rounded-md border p-2">
              <div className="space-y-2">
                {mockInspectors.map((inspector) => (
                  <div
                    key={inspector.id}
                    className="flex items-center justify-between p-2 rounded-lg border hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <UserCircle className="h-8 w-8 text-gray-400" />
                      <div>
                        <div className="font-medium">{inspector.name}</div>
                        <div className="text-sm text-gray-500">{inspector.email}</div>
                      </div>
                    </div>
                    <Button size="sm">Assign</Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleOrderModal;
