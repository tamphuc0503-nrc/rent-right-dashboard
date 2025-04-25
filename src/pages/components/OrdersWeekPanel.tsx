
import React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import OrdersWeekView, { WeekViewOrder } from "@/components/orders/OrdersWeekView";

type Props = {
  weekStart: Date;
  onWeekChange: (date: Date | undefined) => void;
  isStartPickerOpen: boolean;
  setIsStartPickerOpen: (v: boolean) => void;
  orders: WeekViewOrder[];
  onReviewOrder: (order: any, e?: React.MouseEvent) => void;
};

const OrdersWeekPanel: React.FC<Props> = ({
  weekStart,
  onWeekChange,
  isStartPickerOpen,
  setIsStartPickerOpen,
  orders,
  onReviewOrder,
}) => (
  <div>
    <div className="flex gap-3 mb-4 items-center">
      <span className="text-sm text-gray-700 font-semibold">Showing week of:</span>
      <Popover open={isStartPickerOpen} onOpenChange={setIsStartPickerOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className={cn("justify-start")}>
            <CalendarIcon className="h-4 w-4 mr-1" />
            {weekStart ? format(weekStart, "PPP") : <span>Pick a week</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={weekStart}
            onSelect={onWeekChange}
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
    <OrdersWeekView
      weekStart={weekStart}
      orders={orders}
      setReviewOrder={onReviewOrder}
    />
  </div>
);

export default OrdersWeekPanel;
