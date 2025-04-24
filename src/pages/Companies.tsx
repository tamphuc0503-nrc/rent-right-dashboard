import { useState } from "react";
import { Building, Eye, Edit, FileText } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Sidebar from "@/components/Sidebar";

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

const Companies = () => {
  const [companies] = useState(() => getDummyCompanies());

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Building className="text-realestate-700" /> Companies
            </h2>
          </div>
          <div className="border rounded-lg overflow-x-auto bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Logo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.map(company => (
                  <TableRow key={company.id}>
                    <TableCell>
                      <img src={company.logo} alt={company.name} className="w-8 h-8 rounded-full object-cover border" />
                    </TableCell>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company.owner}</TableCell>
                    <TableCell>{company.email}</TableCell>
                    <TableCell>{company.address}</TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Eye className="w-4 h-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="w-4 h-4 mr-2" /> View Report
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Companies;
