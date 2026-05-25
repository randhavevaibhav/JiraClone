import { useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut } from 'lucide-react'; // Import Lucide components

interface UserDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserDropdown = ({ isOpen, onClose }: UserDropdownProps) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the modal cleanly if the user clicks anywhere outside of it or
  //other than user avatar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const clickedInsideDropdown = dropdownRef.current?.contains(target);
      const clickedAvatarTrigger = target.closest(
        '#user-avatar-trigger-button',
      );
      if (isOpen && !clickedInsideDropdown && !clickedAvatarTrigger) {
        onClose();
      }
    };

    // Attach listener to window interaction
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen || !user) return null;

  const handleLogoutClick = async () => {
    try {
      await logout();
      onClose();
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-4 top-16 z-50 w-full min-w-55 rounded-xl border border-(--border-color) bg-(--bg-secondary) p-2 shadow-xl animate-fade-in transition-all duration-200"
    >
      {/* User Context Quick Details (Mobile view fallback) */}
      <div className="px-3 py-2 border-b border-(--border-color)/50 md:hidden">
        <p className="text-xs font-semibold text-(--text-primary) truncate">
          {user.name}
        </p>
        <p className="text-[10px] text-(--text-secondary) truncate">
          {user.email}
        </p>
      </div>

      <div className="py-1 space-y-0.5">
        {/* Profile Item */}
        <button
          onClick={() => alert('Profile settings layout under construction!')}
          className="w-full text-left px-3 py-2 text-sm text-(--text-primary) hover:bg-(--bg-primary) rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer group"
        >
          <User className="w-4 h-4 text-(--text-secondary) group-hover:text-(--text-primary) transition-colors" />
          <span>My Profile</span>
        </button>

        {/* Settings Item */}
        <button
          onClick={() =>
            alert('Workspace dashboard configurations coming soon!')
          }
          className="w-full text-left px-3 py-2 text-sm text-(--text-primary) hover:bg-(--bg-primary) rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer group"
        >
          <Settings className="w-4 h-4 text-(--text-secondary) group-hover:text-(--text-primary) transition-colors" />
          <span>Workspace Settings</span>
        </button>

        {/* Action Separator Line */}
        <div className="h-px bg-(--border-color) my-1" />

        {/* Logout Action Button */}
        <button
          onClick={handleLogoutClick}
          className="w-full text-left px-3 py-2 text-sm text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors flex items-center gap-2.5 font-medium cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0 stroke-[2.5]" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};
