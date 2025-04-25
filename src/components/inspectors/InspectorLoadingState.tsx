
import { Skeleton } from "@/components/ui/skeleton";

export function InspectorLoadingState() {
  return (
    <div className="p-4 space-y-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      ))}
    </div>
  );
}
