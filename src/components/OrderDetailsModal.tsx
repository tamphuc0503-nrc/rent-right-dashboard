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
import { CalendarIcon, MapPin, Mail, Phone, User, Tag, CircleHelp } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    clientName?: string;
    clientEmail?: string;
    clientPhone?: string;
    clientTags?: string[];
    activities?: Activity[];
  };
};

const CLIENT_TAGS = [
  { value: 'walk-ins', label: 'Walk-ins', hint: 'Walk into the house' },
  { value: 'call-first', label: 'Call First', hint: 'Call the client before going' },
  { value: 'use-code', label: 'Use Code', hint: 'Entry code required' },
  { value: 'vacant', label: 'Vacant', hint: 'Property is vacant' },
];

const ORDER_STATUSES = [
  "pending",
  "scheduled",
  "in progress",
  "inspected",
  "reported",
  "completed",
  "cancelled"
] as const;

const OrderDetailsModal = ({
  isOpen,
  onClose,
  mode,
  order,
}: OrderDetailsModalProps) => {
  const [date, setDate] = React.useState<Date | undefined>(
    order?.inspectionDate ? new Date(order.inspectionDate) : undefined
  );
  const [selectedTags, setSelectedTags] = React.useState<string[]>(
    order?.clientTags || []
  );

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto">
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
            <Label htmlFor="clientName">Client Name</Label>
            <div className="flex gap-2">
              <Input
                id="clientName"
                value={order?.clientName || ''}
                readOnly={mode === 'view'}
                placeholder="Client name"
                className="flex-1"
              />
              <Button variant="outline" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="clientEmail">Client Email</Label>
            <div className="flex gap-2">
              <Input
                id="clientEmail"
                type="email"
                value={order?.clientEmail || ''}
                readOnly={mode === 'view'}
                placeholder="client@example.com"
                className="flex-1"
              />
              <Button variant="outline" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="clientPhone">Client Phone</Label>
            <div className="flex gap-2">
              <Input
                id="clientPhone"
                type="tel"
                value={order?.clientPhone || ''}
                readOnly={mode === 'view'}
                placeholder="(555) 555-5555"
                className="flex-1"
              />
              <Button variant="outline" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <Label>Client Tags</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-4 w-4">
                      <CircleHelp className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select tags to indicate special instructions</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex flex-wrap gap-2">
              {CLIENT_TAGS.map((tag) => (
                <TooltipProvider key={tag.value}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant={selectedTags.includes(tag.value) ? "default" : "outline"}
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => toggleTag(tag.value)}
                        disabled={mode === 'view'}
                      >
                        <Tag className="h-3 w-3" />
                        {tag.label}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{tag.hint}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
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
            {mode === 'view' ? (
              <Input
                id="status"
                value={order?.status || ''}
                readOnly
                placeholder="Status"
              />
            ) : (
              <Select defaultValue={order?.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {ORDER_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
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
