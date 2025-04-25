
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, LayoutGrid, LayoutList, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

type OrdersControlsBarProps = {
  search: string;
  setSearch: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  layout: "grid" | "list";
  setLayout: (v: "grid" | "list") => void;
  handleAddClick: () => void;
};

export default function OrdersControlsBar({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  layout,
  setLayout,
  handleAddClick,
}: OrdersControlsBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
      <div className="w-full sm:w-auto flex-1 flex gap-2">
        <Input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search inspection orders…"
          className="w-full max-w-md"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="in progress">In Progress</SelectItem>
            <SelectItem value="inspected">Inspected</SelectItem>
            <SelectItem value="reported">Reported</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <div className="border rounded-md p-1">
          <Button
            variant={layout === 'list' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setLayout('list')}
          >
            <LayoutList className="h-4 w-4" />
          </Button>
          <Button
            variant={layout === 'grid' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setLayout('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
        <Button
          onClick={handleAddClick}
          className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold px-6 py-2 rounded-md flex items-center gap-2 transition-all duration-200"
          size="lg"
        >
          <Plus className="w-5 h-5" />
          Add inspection order
        </Button>
      </div>
    </div>
  );
}
