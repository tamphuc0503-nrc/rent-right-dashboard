import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Users,
  Home,
  Building,
  UserCircle,
  Settings,
  CreditCard,
  Menu,
  X,
  ClipboardList,
  Plus,
  Calendar
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
      { title: 'Next Week', path: '/calendar/upcoming/1week' },
      { title: '2 Weeks', path: '/calendar/upcoming/2weeks' },
      { title: '3 Weeks', path: '/calendar/upcoming/3weeks' },
      { title: '4 Weeks', path: '/calendar/upcoming/4weeks' },
      { title: 'Scheduling Calendar', path: '/calendar/scheduling' },
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
  },
];

type SidebarProps = {
  isMobile?: boolean;
};

const Sidebar = ({ isMobile = false }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(!isMobile);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    document.documentElement.style.setProperty('--sidebar-width', isOpen ? '80px' : '256px');
  };

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
                  <Link
                    to={item.path}
                    onClick={(e) => {
                      if (item.subItems) {
                        e.preventDefault();
                        setExpandedItem(expandedItem === item.title ? null : item.title);
                      }
                    }}
                    className={cn(
                      "flex items-center px-2 py-3 rounded-md hover:bg-gray-100 transition-colors",
                      location.pathname === item.path ? "bg-realestate-50 text-realestate-700" : "text-gray-700",
                      !isOpen && "justify-center"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", location.pathname === item.path ? "text-realestate-700" : "text-gray-500")} />
                    {isOpen && <span className="ml-3 font-medium">{item.title}</span>}
                  </Link>
                  
                  {isOpen && item.subItems && expandedItem === item.title && (
                    <ul className="ml-6 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.title}>
                          <Link
                            to={subItem.path}
                            className={cn(
                              "block px-2 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors",
                              location.pathname === subItem.path ? "bg-realestate-50 text-realestate-700" : "text-gray-600"
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
