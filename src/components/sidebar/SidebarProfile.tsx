
import { cn } from '@/lib/utils';

type SidebarProfileProps = {
  isOpen: boolean;
};

export function SidebarProfile({ isOpen }: SidebarProfileProps) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const initials = user.name ? user.name.charAt(0) : 'U';

  return (
    <div className="p-4 border-t border-gray-200">
      <div className={cn(
        "flex items-center",
        !isOpen && "justify-center"
      )}>
        <div className="w-8 h-8 rounded-full bg-realestate-200 flex items-center justify-center text-realestate-700 font-medium">
          {initials}
        </div>
        {isOpen && (
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">{user.name || 'User'}</p>
            <p className="text-xs text-gray-500">{user.role || 'User'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
