
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Users,
  Home,
  Building,
  UserCircle,
  Settings,
  Menu,
  X,
  ClipboardList,
  Calendar,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type SidebarItem = {
  title: string;
  icon: React.ElementType;
  path: string;
  subItems?: { title: string; path: string }[];
};

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    icon: BarChart3,
    path: '/dashboard',
  },
  {
    title: 'Orders',
    icon: ClipboardList,
    path: '/orders',
  },
  {
    title: 'Calendar',
    icon: Calendar,
    path: '/calendar',
    subItems: [
      { title: 'Scheduler', path: '/calendar/scheduling' },
      { title: 'My Upcoming Orders', path: '/calendar/upcoming/orders' },
      { title: 'Map of Upcoming Orders', path: '/calendar/map' },
    ],
  },
  {
    title: 'Inspectors',
    icon: UserCircle,
    path: '/inspectors',
  },
  {
    title: 'Companies',
    icon: Building,
    path: '/companies',
  },
  {
    title: 'Settings',
    icon: Settings,
    path: '/settings',
    subItems: [
      { title: 'General Settings', path: '/settings/general' },
      { title: 'Change Password', path: '/settings/password' },
      { title: 'Notifications', path: '/settings/notifications' },
      { title: 'DocuSign Keys', path: '/settings/docusign' },
      { title: 'Custom Fields', path: '/settings/custom-fields' },
    ],
  },
];

type SidebarProps = {
  isMobile?: boolean;
};

const Sidebar = ({ isMobile = false }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(!isMobile);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    document.documentElement.style.setProperty('--sidebar-width', isOpen ? '80px' : '256px');
  };

  const handleParentItemClick = (item: SidebarItem) => {
    if (item.subItems && item.subItems.length > 0) {
      setExpandedItem(expandedItem === item.title ? null : item.title);
      if (expandedItem !== item.title) {
        // Navigate to first sub-item when expanding
        navigate(item.subItems[0].path);
      }
    } else {
      navigate(item.path);
    }
  };

  useEffect(() => {
    // Find and expand parent menu based on current path
    const currentPath = location.pathname;
    const parentItem = sidebarItems.find(item => 
      item.subItems?.some(subItem => subItem.path === currentPath)
    );
    if (parentItem) {
      setExpandedItem(parentItem.title);
    }
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', isOpen ? '256px' : '80px');
    return () => {
      document.documentElement.style.removeProperty('--sidebar-width');
    };
  }, []);

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
              <li key={item.title}>
                <div className="relative">
                  <button
                    onClick={() => handleParentItemClick(item)}
                    className={cn(
                      "flex items-center w-full px-2 py-3 rounded-md hover:bg-accent transition-colors",
                      (location.pathname === item.path || 
                       item.subItems?.some(subItem => subItem.path === location.pathname)) 
                        ? "bg-accent text-accent-foreground" 
                        : "text-gray-700",
                      !isOpen && "justify-center"
                    )}
                  >
                    <item.icon className={cn(
                      "h-5 w-5",
                      location.pathname === item.path ? "text-accent-foreground" : "text-gray-500"
                    )} />
                    {isOpen && (
                      <>
                        <span className="ml-3 font-medium flex-1">{item.title}</span>
                        {item.subItems && (
                          <div className="transition-transform duration-200">
                            {expandedItem === item.title ? 
                              <ChevronDown className="h-4 w-4" /> : 
                              <ChevronRight className="h-4 w-4" />}
                          </div>
                        )}
                      </>
                    )}
                  </button>
                  
                  {isOpen && item.subItems && expandedItem === item.title && (
                    <ul className="ml-6 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.title}>
                          <Link
                            to={subItem.path}
                            className={cn(
                              "block px-2 py-2 text-sm rounded-md hover:bg-accent transition-colors",
                              location.pathname === subItem.path ? "bg-accent text-accent-foreground" : "text-gray-600"
                            )}
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className={cn(
            "flex items-center",
            !isOpen && "justify-center"
          )}>
            <div className="w-8 h-8 rounded-full bg-realestate-200 flex items-center justify-center text-realestate-700 font-medium">
              JD
            </div>
            {isOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">John Doe</p>
                <p className="text-xs text-gray-500">Property Manager</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
