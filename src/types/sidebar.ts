
export type SidebarItem = {
  title: string;
  icon: React.ElementType;
  path: string;
  subItems?: { title: string; path: string }[];
};
