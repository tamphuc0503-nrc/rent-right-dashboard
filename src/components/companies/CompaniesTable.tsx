
import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Edit, FileText } from "lucide-react";

type Company = {
  id: number;
  name: string;
  owner: string;
  logo: string;
  email: string;
  address: string;
};

type CompaniesTableProps = {
  companies: Company[];
};

const CompaniesTable = ({ companies }: CompaniesTableProps) => {
  if (companies.length === 0) {
    return (
      <div className="p-6 flex items-center justify-center text-gray-500">
        <span>No companies found.</span>
      </div>
    );
  }

  return (
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
  );
};

export default CompaniesTable;
