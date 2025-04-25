
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AddInspectorDialog from '@/components/AddInspectorDialog';
import { apiClient } from '@/lib/api-client';
import type { Inspector } from '@/types/inspector';
import { InspectorList } from '@/components/inspectors/InspectorList';
import { InspectorSearch } from '@/components/inspectors/InspectorSearch';
import { InspectorLoadingState } from '@/components/inspectors/InspectorLoadingState';
import { InspectorPagination } from '@/components/inspectors/InspectorPagination';

const INSPECTORS_PER_PAGE = 10;

interface InspectorsResponse {
  data: {
    inspectors: Inspector[];
  };
}

const Inspectors = () => {
  const isMobile = useIsMobile();
  const [selected, setSelected] = useState<Inspector | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const { data, isLoading, error, refetch } = useQuery<InspectorsResponse>({
    queryKey: ['inspectors'],
    queryFn: () => apiClient('/api/inspectors'),
  });
  
  const inspectors = data?.data?.inspectors || [];
  
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
      refetch();
    }
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
              <InspectorSearch value={search} onChange={handleSearchChange} />
            </div>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold px-6 py-2 rounded-md flex items-center gap-2 transition-all duration-200"
              size="lg"
            >
              <Plus className="w-5 h-5" />
              Add inspector
            </Button>
          </div>
          
          <div className="rounded-md border bg-white p-0 shadow-sm min-h-[200px]">
            {isLoading ? (
              <InspectorLoadingState />
            ) : error ? (
              <div className="p-6 flex items-center justify-center text-gray-500">
                <span>No data to show</span>
              </div>
            ) : paginatedInspectors.length === 0 ? (
              <div className="p-6 flex items-center justify-center text-gray-500">
                <span>No inspectors found.</span>
              </div>
            ) : (
              <InspectorList 
                inspectors={paginatedInspectors} 
                onReviewClick={openDialog}
              />
            )}
          </div>
          
          <InspectorPagination 
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </main>
      </div>

      <AddInspectorDialog 
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddInspector}
      />
    </div>
  );
};

export default Inspectors;
