
import React from "react";

type SidebarSectionProps = {
  label: string;
  children: React.ReactNode;
};

const SidebarSection = ({ label, children }: SidebarSectionProps) => (
  <div className="mb-2">
    <div className="px-4 py-1 text-xs text-gray-500 uppercase font-semibold">{label}</div>
    <div>{children}</div>
  </div>
);

export default SidebarSection;
