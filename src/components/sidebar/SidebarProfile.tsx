
import { cn } from '@/lib/utils';

type SidebarProfileProps = {
  isOpen: boolean;
};

export function SidebarProfile({ isOpen }: SidebarProfileProps) {
  return (
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
  );
}
