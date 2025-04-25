import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Calendar,
  Users,
  Settings,
  MessageSquare,
  FileText,
  Package,
  Building,
  BarChart,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import SidebarSection from "./SidebarSection";
import SidebarUserProfile from "./SidebarUserProfile";

const mainLinks = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/orders", label: "Orders", icon: Package },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/messages", label: "Messages", icon: MessageSquare },
];

const managementLinks = [
  { href: "/inspectors", label: "Inspectors", icon: Users },
  { href: "/companies", label: "Companies", icon: Building },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/analytics", label: "Analytics", icon: BarChart },
];

const bottomLinks = [
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/help", label: "Help & Support", icon: HelpCircle },
  { href: "/logout", label: "Logout", icon: LogOut },
];

const NavLink = ({
  href,
  label,
  icon: Icon,
  isActive,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
}) => (
  <Link
    to={href}
    className={cn(
      "flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors",
      isActive && "bg-gray-100 text-gray-900 font-medium"
    )}
  >
    <Icon className="w-5 h-5 mr-3" />
    <span>{label}</span>
    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
  </Link>
);

const Sidebar = ({ isMobile }: { isMobile?: boolean }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(!isMobile);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside
      data-testid="sidebar"
      className={`fixed bg-white border-r z-40 transition-all duration-300 h-full top-0 left-0 w-[var(--sidebar-width,256px)] ${isMobile ? 'w-full' : ''}`}
    >
      {/* User Profile */}
      <SidebarUserProfile
        name="Jane Doe"
        email="jane.doe@email.com"
        avatarUrl="/placeholder.svg"
      />
      {/* Nav Sections */}
      <nav className="pt-2 space-y-4">
        <SidebarSection label="Main">
          {mainLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
              isActive={location.pathname === link.href}
            />
          ))}
        </SidebarSection>
        <SidebarSection label="Management">
          {managementLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
              isActive={location.pathname === link.href}
            />
          ))}
        </SidebarSection>
      </nav>
      
      {/* Bottom Links */}
      <div className="absolute bottom-0 left-0 right-0 border-t">
        {bottomLinks.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            label={link.label}
            icon={link.icon}
            isActive={location.pathname === link.href}
          />
        ))}
      </div>
      
      {/* Mobile Toggle */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
