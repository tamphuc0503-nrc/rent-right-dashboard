
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Calendar, Trash2 } from "lucide-react";

type OrderActionsProps = {
  onView: () => void;
  onEdit: () => void;
  onSchedule: () => void;
  onCancel: () => void;
};

const OrderActions = ({
  onView,
  onEdit,
  onSchedule,
  onCancel,
}: OrderActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="data-[state=open]:bg-muted">
          <span className="sr-only">Open menu</span>
          <Eye className="w-4 h-4" /> {/* This icon serves as a menu button. Change if you prefer */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-50 w-44">
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
        <DropdownMenuItem onClick={onCancel} className="text-red-600 focus:text-red-700">
          <Trash2 className="mr-2 w-4 h-4" />
          Cancel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderActions;
