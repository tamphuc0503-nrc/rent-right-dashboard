
import { Button } from "@/components/ui/button";

type OrdersPaginationProps = {
  page: number;
  totalPages: number;
  setPage: (updater: (page: number) => number) => void;
};

export default function OrdersPagination({ page, totalPages, setPage }: OrdersPaginationProps) {
  return (
    <div className="flex justify-between items-center mt-6">
      <Button
        onClick={() => setPage((p) => Math.max(1, p - 1))}
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
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        disabled={page === totalPages || totalPages === 0}
        className="px-4"
        variant="outline"
      >
        Next
      </Button>
    </div>
  );
}
