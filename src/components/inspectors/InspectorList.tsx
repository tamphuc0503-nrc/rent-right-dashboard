
import { Inspector } from '@/types/inspector';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import clsx from "clsx";

const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-100 text-green-600",
  "de-active": "bg-red-100 text-red-600"
};

interface InspectorListProps {
  inspectors: Inspector[];
  onReviewClick: (inspector: Inspector) => void;
}

export function InspectorList({ inspectors, onReviewClick }: InspectorListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Point</TableHead>
          <TableHead>WIP</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {inspectors.map(inspector => (
          <TableRow key={inspector.id}>
            <TableCell className="font-medium">{inspector.name}</TableCell>
            <TableCell>{inspector.email}</TableCell>
            <TableCell>{inspector.phone}</TableCell>
            <TableCell>
              <span className={clsx("px-2 py-1 rounded text-xs font-semibold", STATUS_COLORS[inspector.status])}>
                {inspector.status}
              </span>
            </TableCell>
            <TableCell>
              <span className="inline-block font-semibold">{inspector.points}</span>
              <span className="ml-1 text-yellow-400">★</span>
            </TableCell>
            <TableCell>
              <span className={clsx(
                "px-2 py-1 rounded text-xs font-semibold",
                inspector.inspectionStatus === "inspecting" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
              )}>
                {inspector.inspectionStatus}
              </span>
            </TableCell>
            <TableCell className="text-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onReviewClick(inspector)}
                className="flex items-center gap-1"
              >
                <Eye className="h-4 w-4" />
                Review
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
