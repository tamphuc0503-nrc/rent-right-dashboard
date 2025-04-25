
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, List as ListIcon } from "lucide-react";

type Props = {
  mode: "list" | "week";
  setMode: (mode: "list" | "week") => void;
};

const MyUpcomingOrdersHeader: React.FC<Props> = ({ mode, setMode }) => (
  <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">My Upcoming Orders</h1>
      <p className="text-gray-600">View your assigned inspection orders</p>
    </div>
    <div className="flex gap-2 items-center">
      <Button
        variant={mode === 'list' ? 'default' : 'ghost'}
        onClick={() => setMode('list')}
        size="sm"
      >
        <ListIcon className="h-4 w-4 mr-1" /> List View
      </Button>
      <Button
        variant={mode === 'week' ? 'default' : 'ghost'}
        onClick={() => setMode('week')}
        size="sm"
      >
        <CalendarIcon className="h-4 w-4 mr-1" /> Week View
      </Button>
    </div>
  </div>
);

export default MyUpcomingOrdersHeader;
