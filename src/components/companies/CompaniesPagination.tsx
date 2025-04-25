
import React from "react";
import { Button } from "@/components/ui/button";

type CompaniesPaginationProps = {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
};

const CompaniesPagination = ({
  page,
  totalPages,
  onPrevious,
  onNext,
}: CompaniesPaginationProps) => (
  <div className="flex justify-between items-center mt-6">
    <Button
      onClick={onPrevious}
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
      onClick={onNext}
      disabled={page === totalPages || totalPages === 0}
      className="px-4"
      variant="outline"
    >
      Next
    </Button>
  </div>
);

export default CompaniesPagination;
