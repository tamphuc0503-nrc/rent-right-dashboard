
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarItem } from '@/types/sidebar';

// Allow multiple expanded items
export function useSidebarNavigation(isMobile: boolean) {
  const [isOpen, setIsOpen] = useState(!isMobile);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    document.documentElement.style.setProperty('--sidebar-width', isOpen ? '80px' : '256px');
  };

  // Toggle expansion for multiple parent items
  const handleParentItemClick = (item: SidebarItem) => {
    if (item.subItems && item.subItems.length > 0) {
      setExpandedItems((prev) =>
        prev.includes(item.title)
          ? prev.filter((title) => title !== item.title)
          : [...prev, item.title]
      );
    } else {
      navigate(item.path);
    }
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', isOpen ? '256px' : '80px');
    return () => {
      document.documentElement.style.removeProperty('--sidebar-width');
    };
  }, []);

  return {
    isOpen,
    expandedItems,
    location,
    toggleSidebar,
    handleParentItemClick,
  };
}
