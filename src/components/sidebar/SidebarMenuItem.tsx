
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SidebarItem } from '@/types/sidebar';
import React from 'react';

type SidebarMenuItemProps = {
  item: SidebarItem;
  isOpen: boolean;
  expandedItems: string[];
  currentPath: string;
  onItemClick: (item: SidebarItem) => void;
  onSubMenuClick?: (item: SidebarItem, subItem: { title: string; path: string }) => void;
};

export function SidebarMenuItem({
  item,
  isOpen,
  expandedItems,
  onItemClick,
  currentPath,
  onSubMenuClick,
}: SidebarMenuItemProps) {
  const isParentActive = !!item.subItems && item.subItems.some(sub => currentPath.includes(sub.path));
  const isThisActive = !item.subItems && currentPath === item.path;
  const isExpanded = expandedItems.includes(item.title);

  return (
    <li>
      <div className="relative">
        <button
          onClick={() => {
            onItemClick(item);
          }}
          className={cn(
            "flex items-center w-full px-2 py-3 rounded-md hover:bg-accent/50 transition-colors text-gray-700",
            !isOpen && "justify-center",
            (isParentActive || isThisActive) && "bg-accent text-accent-foreground"
          )}
        >
          <item.icon className="h-5 w-5 text-gray-500" />
          {isOpen && (
            <>
              <span className="ml-3 font-medium flex-1 text-left">{item.title}</span>
              {item.subItems && (
                <div className="transition-transform duration-200">
                  {isExpanded ?
                    <ChevronDown className="h-4 w-4" /> :
                    <ChevronRight className="h-4 w-4" />}
                </div>
              )}
            </>
          )}
        </button>
        {/* Submenu */}
        {isOpen && item.subItems && isExpanded && (
          <ul className="ml-6 mt-1 space-y-1">
            {item.subItems.map((subItem) => (
              <li key={subItem.title}>
                <button
                  className={cn(
                    "block px-2 py-2 text-sm rounded-md hover:bg-accent/50 transition-colors text-gray-600 w-full text-left",
                    currentPath.includes(subItem.path) && "bg-accent/70 text-accent-foreground font-medium"
                  )}
                  onClick={() => {
                    if (onSubMenuClick) {
                      onSubMenuClick(item, subItem);
                    }
                  }}
                >
                  {subItem.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}
