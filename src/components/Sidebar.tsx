
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSidebarNavigation } from '@/hooks/use-sidebar-navigation';
import { SidebarMenuItem } from './sidebar/SidebarMenuItem';
import { SidebarProfile } from './sidebar/SidebarProfile';
import { sidebarItems } from '@/config/navigation';

type SidebarProps = {
  isMobile?: boolean;
};

const Sidebar = ({ isMobile = false }: SidebarProps) => {
  const { isOpen, expandedItem, location, toggleSidebar, handleParentItemClick } = useSidebarNavigation(isMobile);

  return (
    <>
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={toggleSidebar}
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
              onClick={toggleSidebar}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {sidebarItems.map((item) => (
              <SidebarMenuItem
                key={item.title}
                item={item}
                isOpen={isOpen}
                expandedItem={expandedItem}
                currentPath={location.pathname}
                onItemClick={handleParentItemClick}
              />
            ))}
          </ul>
        </nav>

        <SidebarProfile isOpen={isOpen} />
      </aside>
    </>
  );
};

export default Sidebar;
