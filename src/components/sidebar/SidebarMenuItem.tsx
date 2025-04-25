
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SidebarItem } from '@/types/sidebar';

type SidebarMenuItemProps = {
  item: SidebarItem;
  isOpen: boolean;
  expandedItem: string | null;
  currentPath: string;
  onItemClick: (item: SidebarItem) => void;
};

export function SidebarMenuItem({ 
  item, 
  isOpen, 
  expandedItem, 
  onItemClick 
}: SidebarMenuItemProps) {
  const isRecents = item.title === "Recents";
  return (
    <li>
      <div className="relative">
        <button
          onClick={() => onItemClick(item)}
          className={cn(
            "flex items-center w-full px-2 py-3 rounded-md hover:bg-accent/50 transition-colors text-gray-700",
            !isOpen && "justify-center"
          )}
        >
          <item.icon className="h-5 w-5 text-gray-500" />
          {isOpen && (
            <>
              <span className="ml-3 font-medium flex-1 text-left">{item.title}</span>
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
                {/* For recents, open in new tab */}
                {isRecents ? (
                  <a
                    href={subItem.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-2 py-2 text-sm rounded-md hover:bg-accent/50 transition-colors text-gray-600"
                  >
                    {subItem.title}
                  </a>
                ) : (
                  <Link
                    to={subItem.path}
                    className="block px-2 py-2 text-sm rounded-md hover:bg-accent/50 transition-colors text-gray-600"
                  >
                    {subItem.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}
