
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarItem } from '@/types/sidebar';

export function useSidebarNavigation(isMobile: boolean) {
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
      // Don't navigate when clicking on items with submenus
      return;
    }
    // Only navigate if it's a leaf item
    navigate(item.path);
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', isOpen ? '256px' : '80px');
    return () => {
      document.documentElement.style.removeProperty('--sidebar-width');
    };
  }, []);

  return {
    isOpen,
    expandedItem,
    location,
    toggleSidebar,
    handleParentItemClick,
  };
}
