import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Calendar, Trash2, Check, Clock, Loader, Mail, Send, FileText, Tag, Printer } from "lucide-react";
import { OrderActionModal } from "./order-actions/OrderActionModal";
import { useState, useRef, useEffect } from "react";

type StatusType =
  | "pending"
  | "cancelled"
  | "scheduled"
  | "in progress"
  | "inspected"
  | "reported"
  | "completed";

const STATUS_TRANSITIONS: Record<StatusType, { value: StatusType; label: string; icon?: React.ReactNode }[]> = {
  pending: [
    { value: "scheduled", label: "Mark as Scheduled", icon: <Clock className="w-4 h-4 mr-1" /> },
    { value: "cancelled", label: "Cancel", icon: <Trash2 className="w-4 h-4 mr-1" /> },
  ],
  scheduled: [
    { value: "in progress", label: "Start Inspection", icon: <Loader className="w-4 h-4 mr-1" /> },
    { value: "scheduled", label: "Reschedule", icon: <Clock className="w-4 h-4 mr-1" /> },
    { value: "cancelled", label: "Cancel", icon: <Trash2 className="w-4 h-4 mr-1" /> },
  ],
  "in progress": [
    { value: "inspected", label: "Mark Inspected", icon: <Check className="w-4 h-4 mr-1" /> },
  ],
  inspected: [
    { value: "reported", label: "Send Report", icon: <Check className="w-4 h-4 mr-1" /> },
  ],
  reported: [
    { value: "completed", label: "Complete", icon: <Check className="w-4 h-4 mr-1" /> },
  ],
  completed: [],
  cancelled: [],
};

type OrderActionsProps = {
  onView: () => void;
  onEdit: () => void;
  onSchedule: () => void;
  onCancel: () => void;
  onChangeStatus: (newStatus: StatusType) => void;
  currentStatus: StatusType;
};

const OrderActions = ({
  onView,
  onEdit,
  onSchedule,
  onCancel,
  onChangeStatus,
  currentStatus,
}: OrderActionsProps) => {
  const [modal, setModal] = useState<null | "invoice" | "emailReminder" | "smsReminder" | "agreement">(null);
  const [open, setOpen] = useState(false);
  const [originPoint, setOriginPoint] = useState<{ x: number; y: number }>({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOriginPoint({ x: e.clientX, y: e.clientY });
    setOpen(o => !o);
  };

  const closeMenu = () => setOpen(false);

  const client = {
    name: "John Doe",
    email: "john@example.com",
  };

  const transitions = STATUS_TRANSITIONS[currentStatus];

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="data-[state=open]:bg-muted"
            aria-label="Show actions"
            onClick={handleMenuClick}
          >
            <span className="sr-only">Open menu</span>
            <Eye className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-52 animate-popupFromPointer"
          style={{
            transformOrigin: `var(--popover-origin-x, ${originPoint.x}px) var(--popover-origin-y, ${originPoint.y}px)`,
          }}
        >
          <DropdownMenuItem onClick={onView}>
            <Eye className="mr-2 w-4 h-4" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onEdit}>
            <Pencil className="mr-2 w-4 h-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onSchedule}>
            <Calendar className="mr-2 w-4 h-4" />
            Schedule
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => setModal("emailReminder")}>
            <Mail className="mr-2 w-4 h-4" />
            Send Email Reminder
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setModal("smsReminder")}>
            <Send className="mr-2 w-4 h-4" />
            Send SMS Reminder
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setModal("agreement")}>
            <FileText className="mr-2 w-4 h-4" />
            Sign Agreement
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setModal("invoice")}>
            <FileText className="mr-2 w-4 h-4" />
            Send Invoice
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Tag className="mr-2 w-4 h-4" />
            Apply Coupon
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <FileText className="mr-2 w-4 h-4" />
            Add Note
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Printer className="mr-2 w-4 h-4" />
            Print Order
          </DropdownMenuItem>

          {transitions && transitions.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Loader className="mr-2 w-4 h-4" />
                  Change Status
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {transitions.map((t) => (
                    <DropdownMenuItem
                      key={t.value}
                      onClick={() => onChangeStatus(t.value)}
                    >
                      {t.icon}
                      {t.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onCancel} className="text-red-600 focus:text-red-700">
            <Trash2 className="mr-2 w-4 h-4" />
            Cancel
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <OrderActionModal
        open={!!modal}
        onClose={() => setModal(null)}
        type={modal || "invoice"}
        client={client}
      />
    </>
  );
};

export default OrderActions;
