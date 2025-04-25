
import { Button } from "@/components/ui/button";

interface InspectorPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function InspectorPagination({ page, totalPages, onPageChange }: InspectorPaginationProps) {
  return (
    <div className="flex justify-between items-center mt-6">
      <Button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-4"
        variant="outline"
      >
        Previous
      </Button>
      <span className="text-sm text-gray-700">
        Page {page} of {totalPages}
      </span>
      <Button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages || totalPages === 0}
        className="px-4"
        variant="outline"
      >
        Next
      </Button>
    </div>
  );
}
