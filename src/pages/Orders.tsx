
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

const Orders = () => {
  const [search, setSearch] = useState("");

  // Placeholder search handler
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // Placeholder add handler
  const handleAddClick = () => {
    // You can replace this with a modal/dialog/redirect as needed
    alert("Add inspection order clicked!");
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Inspection Orders</h1>
        <Button onClick={handleAddClick} className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold px-6 py-2 rounded-md flex items-center gap-2 transition-all duration-200 hover-scale" size="lg">
          <Plus className="w-5 h-5" />
          Add inspection order
        </Button>
      </div>
      <div className="mb-6">
        <Input
          type="search"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search inspection orders…"
          className="w-full max-w-md"
        />
      </div>
      {/* Placeholder for the orders list */}
      <div className="mt-8 rounded-md border bg-white p-6 shadow-sm min-h-[200px] flex items-center justify-center text-gray-500">
        <span>No inspection orders found.</span>
      </div>
    </div>
  );
};

export default Orders;
