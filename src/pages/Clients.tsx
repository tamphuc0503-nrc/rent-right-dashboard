
import React from "react";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { 
  setSearchTerm, 
  selectFilteredClients,
  selectSearchTerm 
} from "@/store/slices/clientsSlice";

type DummyClientListProps = {
  noTitle?: boolean;
};

const DummyClientList = ({ noTitle = false }: DummyClientListProps) => {
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectSearchTerm);
  const filtered = useAppSelector(selectFilteredClients);
  
  return (
    <div className="max-w-2xl mx-auto py-8">
      {!noTitle && <h1 className="text-2xl font-bold mb-4">Clients</h1>}
      <div className="flex items-center gap-3 mb-4">
        <Input
          placeholder="Search clients..."
          value={search}
          onChange={e => dispatch(setSearchTerm(e.target.value))}
        />
        <button
          type="button"
          className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded flex items-center gap-1"
          title="Standard Filter"
        >
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="hidden md:inline text-xs">Filter</span>
        </button>
      </div>
      <div className="rounded border bg-white shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-accent">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center p-4 text-muted-foreground">No clients found</td>
              </tr>
            )}
            {filtered.map(client => (
              <tr key={client.id} className="border-t hover:bg-accent/30 transition">
                <td className="p-3">{client.name}</td>
                <td className="p-3">{client.email}</td>
                <td className="p-3">{client.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DummyClientList;
