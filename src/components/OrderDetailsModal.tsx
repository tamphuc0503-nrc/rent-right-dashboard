
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

type Activity = {
  id: string;
  date: string;
  type: string;
  description: string;
};

type OrderDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  mode: 'view' | 'edit' | 'add';
  order?: {
    id: string;
    orderNumber: string;
    propertyAddress: string;
    inspectionDate: string;
    status: string;
    cost: number;
    activities?: Activity[];
  };
};

const OrderDetailsModal = ({
  isOpen,
  onClose,
  mode,
  order,
}: OrderDetailsModalProps) => {
  const [date, setDate] = React.useState<Date | undefined>(
    order?.inspectionDate ? new Date(order.inspectionDate) : undefined
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'New Inspection Order' : mode === 'edit' ? 'Edit Inspection Order' : 'View Inspection Order'}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="orderNumber">Order ID</Label>
            <Input
              id="orderNumber"
              value={order?.orderNumber || ''}
              readOnly={mode === 'view'}
              placeholder="Order number"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="address">Property Address</Label>
            <div className="flex gap-2">
              <Input
                id="address"
                value={order?.propertyAddress || ''}
                readOnly={mode === 'view'}
                placeholder="Property address"
              />
              <Button variant="outline" size="icon">
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Inspection Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                  disabled={mode === 'view'}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Input
              id="status"
              value={order?.status || ''}
              readOnly={mode === 'view'}
              placeholder="Status"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="cost">Cost</Label>
            <Input
              id="cost"
              type="number"
              value={order?.cost || ''}
              readOnly={mode === 'view'}
              placeholder="Cost"
            />
          </div>

          {mode === 'view' && order?.activities && (
            <div className="grid gap-2">
              <Label>Activity History</Label>
              <div className="border rounded-lg p-4 space-y-4">
                {order.activities.map((activity) => (
                  <div key={activity.id} className="border-b pb-2 last:border-0">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{activity.type}</span>
                      <span className="text-muted-foreground">{activity.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {activity.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {mode !== 'view' && (
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === 'add' ? 'Create' : 'Save Changes'}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
