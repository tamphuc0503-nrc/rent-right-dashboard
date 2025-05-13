
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SidebarMenuItem } from './sidebar/SidebarMenuItem';
import { sidebarItems } from '@/config/navigation';
import { SidebarProfile } from "@/components/sidebar/SidebarProfile";
import ClientsPanel from '@/components/clients/ClientsPanel';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
  toggleSidebar, 
  toggleExpandedItem, 
  setClientsPanelOpen,
  selectSidebarIsOpen,
  selectExpandedItems,
  selectClientsPanelOpen
} from '@/store/slices/sidebarSlice';

type SidebarProps = {
  isMobile?: boolean;
};

const Sidebar = ({ isMobile = false }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const isOpen = useAppSelector(selectSidebarIsOpen);
  const expandedItems = useAppSelector(selectExpandedItems);
  const clientsPanelOpen = useAppSelector(selectClientsPanelOpen);

  const handleSidebarItemClick = (item: any) => {
    dispatch(toggleExpandedItem(item.title));
  };

  const handleSidebarSubMenuClick = (
    item: any,
    subItem: { title: string; path: string }
  ) => {
    if (item.title === "Externals" && subItem.title === "Clients") {
      dispatch(setClientsPanelOpen(true));
      return;
    }
    if (subItem.path) {
      navigate(subItem.path);
    }
  };

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <>
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={handleToggleSidebar}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      )}

      <aside className={cn(
        "flex flex-col bg-sidebar h-screen fixed top-0 left-0 z-40 border-r border-gray-200 transition-all duration-300",
        isOpen ? "w-64" : isMobile ? "w-0" : "w-20",
        isMobile && !isOpen && "hidden"
      )}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <Link to="/dashboard" className="flex items-center space-x-2 overflow-hidden">
            <Home className="h-6 w-6 text-realestate-700" />
            {isOpen && <span className="font-bold text-lg text-realestate-900">RentRight</span>}
          </Link>
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={handleToggleSidebar}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          )}
        </div>
        <nav className="flex-1 overflow-y-auto py-4 styled-scrollbar">
          <ul className="space-y-1 px-2">
            {sidebarItems.map((item) => (
              <SidebarMenuItem
                key={item.title}
                item={item}
                isOpen={isOpen}
                expandedItems={expandedItems}
                currentPath={location.pathname}
                onItemClick={handleSidebarItemClick}
                onSubMenuClick={handleSidebarSubMenuClick}
              />
            ))}
          </ul>
        </nav>
        <SidebarProfile isOpen={isOpen} />
      </aside>
      <ClientsPanel
        open={clientsPanelOpen}
        onClose={() => dispatch(setClientsPanelOpen(false))}
      />
    </>
  );
};

export default Sidebar;
