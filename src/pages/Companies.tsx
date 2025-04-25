
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Button } from "@/components/ui/button";
import { Plus, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import CompaniesSearch from "@/components/companies/CompaniesSearch";
import CompaniesTable from "@/components/companies/CompaniesTable";
import CompaniesPagination from "@/components/companies/CompaniesPagination";

const dummyLogos = [
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=60&h=60&fit=crop",
  "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=60&h=60&fit=crop",
  "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=60&h=60&fit=crop",
  "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=60&h=60&fit=crop",
  "https://images.unsplash.com/photo-1487252665478-49b61b47f302?w=60&h=60&fit=crop"
];

const ownerNames = ["Alice", "Bob", "Carlos", "Dina", "Eliza"];
const emails = ["info@homecheck.com", "hello@safenest.com", "contact@inspectopro.com", "admin@quickhouse.com", "office@primeinspections.com"];

function getDummyCompanies() {
  return Array.from({ length: 15 }).map((_, i) => ({
    id: i + 1,
    name: `Company ${i + 1}`,
    owner: ownerNames[i % ownerNames.length],
    logo: dummyLogos[i % dummyLogos.length],
    email: emails[i % emails.length],
    address: `${100 + i} Main St, Suite ${i + 1}, Cityname`,
  }));
}

const COMPANIES_PER_PAGE = 10;

const Companies = () => {
  const isMobile = useIsMobile();
  const [companies] = useState(() => getDummyCompanies());
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  
  // Pagination state
  const [page, setPage] = useState(1);
  const filteredCompanies = companies.filter(company => {
    const q = search.toLowerCase();
    return (
      company.name.toLowerCase().includes(q) ||
      company.owner.toLowerCase().includes(q) ||
      company.email.toLowerCase().includes(q) ||
      company.address.toLowerCase().includes(q)
    );
  });
  
  const totalPages = Math.ceil(filteredCompanies.length / COMPANIES_PER_PAGE);
  const startIdx = (page - 1) * COMPANIES_PER_PAGE;
  const endIdx = startIdx + COMPANIES_PER_PAGE;
  const paginatedCompanies = filteredCompanies.slice(startIdx, endIdx);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleAddClick = () => {
    toast({
      title: "Add Company",
      description: "This feature is coming soon!",
      duration: 3000,
    });
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
              <Building className="text-realestate-700" /> Companies
            </h1>
            <p className="text-gray-600">
              Manage and review companies in your network.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <div className="w-full sm:w-auto flex-1">
              <CompaniesSearch search={search} onChange={handleSearchChange} />
            </div>
            <Button
              onClick={handleAddClick}
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold px-6 py-2 rounded-md flex items-center gap-2 transition-all duration-200"
              size="lg"
            >
              <Plus className="w-5 h-5" />
              Add company
            </Button>
          </div>
          
          <div className="rounded-md border bg-white p-0 shadow-sm min-h-[200px]">
            <CompaniesTable companies={paginatedCompanies} />
          </div>
          
          <CompaniesPagination
            page={page}
            totalPages={totalPages}
            onPrevious={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
          />
        </main>
      </div>
    </div>
  );
};

export default Companies;
