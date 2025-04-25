
import React from "react";
import { Input } from "@/components/ui/input";

type CompaniesSearchProps = {
  search: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CompaniesSearch = ({ search, onChange }: CompaniesSearchProps) => (
  <Input
    type="search"
    value={search}
    onChange={onChange}
    placeholder="Search companies…"
    className="w-full max-w-md"
  />
);

export default CompaniesSearch;
