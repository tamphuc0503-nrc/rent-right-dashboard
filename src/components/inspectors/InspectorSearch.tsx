
import { Input } from "@/components/ui/input";

interface InspectorSearchProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InspectorSearch({ value, onChange }: InspectorSearchProps) {
  return (
    <Input
      type="search"
      value={value}
      onChange={onChange}
      placeholder="Search inspectors…"
      className="w-full max-w-md"
    />
  );
}
