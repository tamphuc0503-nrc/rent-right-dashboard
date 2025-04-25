import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Users, Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
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
import AddInspectorDialog from '@/components/AddInspectorDialog';
import { apiClient } from '@/lib/api-client';
import type { Inspector } from '@/types/inspector';

const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-100 text-green-600",
  "de-active": "bg-red-100 text-red-600"
};

const INSPECTORS_PER_PAGE = 10;

const Inspectors = () => {
  const isMobile = useIsMobile();
  const [selected, setSelected] = useState<Inspector | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const { data: inspectors = [], isLoading, refetch } = useQuery({
    queryKey: ['inspectors'],
    queryFn: () => apiClient<Inspector[]>('/api/inspectors'),
  });
  
  // Pagination state
  const [page, setPage] = useState(1);
  const filteredInspectors = inspectors.filter(inspector => {
    const q = search.toLowerCase();
    return (
      inspector.name.toLowerCase().includes(q) ||
      inspector.email.toLowerCase().includes(q) ||
      inspector.phone.toLowerCase().includes(q) ||
      inspector.status.toLowerCase().includes(q) ||
      inspector.inspectionStatus.toLowerCase().includes(q)
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

  const handleAddInspector = async (data: any) => {
    const response = await apiClient<Inspector>('/api/inspectors', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    
    if (response) {
      toast({
        title: "Inspector Added",
        description: "The inspector has been successfully added.",
      });
      setIsAddDialogOpen(false);
      refetch(); // Reload the inspectors list
    }
  };

  const handleAddClick = () => {
    setIsAddDialogOpen(true);
  };

  const openDialog = (inspector: Inspector) => {
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
            {isLoading ? (
              <div className="p-4 space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                ))}
              </div>
            ) : paginatedInspectors.length === 0 ? (
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
    </div>
  );
};

export default Inspectors;
