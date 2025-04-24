
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Users, Eye } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import clsx from "clsx";

function getDummyInspectors() {
  const companies = ["HomeCheck LLC", "SafeNest", "InspectoPro", "QuickHouse", "PrimeInspections"];
  return Array.from({ length: 60 }).map((_, i) => {
    const comp = companies[i % companies.length];
    return {
      id: i + 1,
      name: `Inspector ${i + 1}`,
      email: `inspector${i + 1}@${comp.toLowerCase().replace(/\s/g, '')}.com`,
      phone: `0812${String(40000000 + i).slice(-8)}`,
      company: comp,
      status: i % 4 === 0 ? "de-active" : "active",
      point: (i % 5) + 1,
      wip: i % 2 === 0 ? "inspecting" : "non-schedule",
      address: `${300 + i} 2nd Ave, Cityville`,
      tags: ["roof", "electric", "plumbing"].filter((_, idx) => (idx + i) % 2 === 0),
      notes: "Very detail oriented. Great with customers.",
      housesInspected: Array.from({ length: Math.floor(2 + Math.random() * 8) }, (_, h) => ({
        id: i * 100 + h,
        address: `${10 + h} Maple St, Historycity`,
        date: `2024-0${(h%9)+1}-12`,
      })),
    }
  });
}

const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-100 text-green-600",
  "de-active": "bg-red-100 text-red-600"
};

const INSPECTORS_PER_PAGE = 10;

const Inspectors = () => {
  const isMobile = useIsMobile();
  const [inspectors] = useState(() => getDummyInspectors());
  const [selected, setSelected] = useState<typeof inspectors[0] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  
  // Pagination state
  const [page, setPage] = useState(1);
  const filteredInspectors = inspectors.filter(inspector => {
    const q = search.toLowerCase();
    return (
      inspector.name.toLowerCase().includes(q) ||
      inspector.email.toLowerCase().includes(q) ||
      inspector.phone.toLowerCase().includes(q) ||
      inspector.status.toLowerCase().includes(q) ||
      inspector.wip.toLowerCase().includes(q)
    );
  });
  
  const totalPages = Math.ceil(filteredInspectors.length / INSPECTORS_PER_PAGE);
  const startIdx = (page - 1) * INSPECTORS_PER_PAGE;
  const endIdx = startIdx + INSPECTORS_PER_PAGE;
  const paginatedInspectors = filteredInspectors.slice(startIdx, endIdx);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleAddClick = () => {
    toast({
      title: "Add Inspector",
      description: "This feature is coming soon!",
      duration: 3000,
    });
  };

  const openDialog = (inspector: typeof inspectors[0]) => {
    setSelected(inspector);
    setIsOpen(true);
  };

  if (page > totalPages && totalPages > 0) setPage(totalPages);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isMobile={isMobile} />
      <div className={`flex-1 ${isMobile ? '' : 'ml-64'}`}>
        <DashboardHeader />
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="text-realestate-700" /> Inspectors
            </h1>
            <p className="text-gray-600">
              Manage and review inspectors for your properties.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <div className="w-full sm:w-auto flex-1">
              <Input
                type="search"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search inspectors…"
                className="w-full max-w-md"
              />
            </div>
            <Button
              onClick={handleAddClick}
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold px-6 py-2 rounded-md flex items-center gap-2 transition-all duration-200"
              size="lg"
            >
              <Plus className="w-5 h-5" />
              Add inspector
            </Button>
          </div>
          
          <div className="rounded-md border bg-white p-0 shadow-sm min-h-[200px]">
            {paginatedInspectors.length === 0 ? (
              <div className="p-6 flex items-center justify-center text-gray-500">
                <span>No inspectors found.</span>
              </div>
            ) : (
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
                  {paginatedInspectors.map(inspector => (
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
                        <span className="inline-block font-semibold">{inspector.point}</span>
                        <span className="ml-1 text-yellow-400">★</span>
                      </TableCell>
                      <TableCell>
                        <span className={clsx(
                          "px-2 py-1 rounded text-xs font-semibold",
                          inspector.wip === "inspecting" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                        )}>
                          {inspector.wip}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDialog(inspector)}
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
            )}
          </div>
          
          {/* Pagination controls */}
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
        </main>
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Inspector Information</DialogTitle>
            <DialogDescription>
              Detailed inspector info and inspection history.
            </DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-2 mt-2">
              <div><b>Name:</b> {selected.name}</div>
              <div><b>Email:</b> {selected.email}</div>
              <div><b>Status:</b> <span className={clsx("px-2 py-1 rounded text-xs font-semibold", STATUS_COLORS[selected.status])}>
                {selected.status}
              </span></div>
              <div><b>Point:</b> {selected.point} <span className="text-yellow-400">★</span></div>
              <div><b>Phone:</b> {selected.phone}</div>
              <div><b>Address:</b> {selected.address}</div>
              <div><b>Tags:</b> {selected.tags.map(tag => (
                <span key={tag} className="inline-block mr-1 bg-realestate-50 text-xs px-2 py-0.5 rounded">{tag}</span>
              ))}</div>
              <div><b>Notes:</b> <span className="text-gray-700">{selected.notes}</span></div>
              <div>
                <b>Houses Inspected Before:</b>
                <ul className="ml-4 mt-1 list-disc space-y-1 text-sm">
                  {selected.housesInspected.map(house => (
                    <li key={house.id}>
                      <span className="font-semibold">{house.address}</span> — <span className="text-gray-400">{house.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Inspectors;
