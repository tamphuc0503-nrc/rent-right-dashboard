
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

type SidebarProfileProps = {
  isOpen: boolean;
};

export function SidebarProfile({ isOpen }: SidebarProfileProps) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const initials = user.name ? user.name.charAt(0) : 'U';
  const navigate = useNavigate();

  // Make the profile clickable for navigation
  function handleProfileClick() {
    navigate('/dashboard/profile');
  }

  return (
    <div className="p-4 border-t border-gray-200">
      <div
        className={cn(
          "flex items-center transition cursor-pointer group",
          !isOpen && "justify-center"
        )}
        onClick={handleProfileClick}
        title="Profile"
        tabIndex={0}
        role="button"
        onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleProfileClick()}
      >
        <div className="w-8 h-8 rounded-full bg-realestate-200 flex items-center justify-center text-realestate-700 font-medium">
          {initials}
        </div>
        {isOpen && (
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700 group-hover:underline">{user.name || 'User'}</p>
            <p className="text-xs text-gray-500">{user.role || 'User'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
