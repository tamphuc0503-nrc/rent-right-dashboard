
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
};

export function SidebarMenuItem({
  item,
  isOpen,
  expandedItems,
  onItemClick,
  currentPath,
}: SidebarMenuItemProps) {
  const isRecents = item.title === "Recents";
  // Determine active path for submenu highlighting
  const isParentActive = !!item.subItems && item.subItems.some(sub => currentPath === sub.path);
  const isThisActive = !item.subItems && currentPath === item.path;
  const isExpanded = expandedItems.includes(item.title);

  return (
    <li>
      <div className="relative">
        <button
          onClick={() => {
            if (item.subItems && item.subItems.length > 0) {
              onItemClick(item);
            } else {
              onItemClick(item); // will navigate for no subItems
            }
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
        {/* Submenu, highlight the selected one, do not collapse on navigation */}
        {isOpen && item.subItems && isExpanded && (
          <ul className="ml-6 mt-1 space-y-1">
            {item.subItems.map((subItem) => {
              const isSubActive = currentPath === subItem.path;
              if (isRecents) {
                return (
                  <li key={subItem.title}>
                    <a
                      href={subItem.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "block px-2 py-2 text-sm rounded-md hover:bg-accent/50 transition-colors text-gray-600",
                        isSubActive && "bg-accent text-accent-foreground"
                      )}
                    >
                      {subItem.title}
                    </a>
                  </li>
                );
              } else {
                return (
                  <li key={subItem.title}>
                    <Link
                      to={subItem.path}
                      className={cn(
                        "block px-2 py-2 text-sm rounded-md hover:bg-accent/50 transition-colors text-gray-600",
                        isSubActive && "bg-accent text-accent-foreground"
                      )}
                    >
                      {subItem.title}
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        )}
      </div>
    </li>
  );
}
