import { useRef, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserDropdown } from '@/components/UserDropdown/UserDropdown'; // Import our new dropdown file

const getInitials = (name: string | undefined | null): string => {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export const UserAvatar = () => {
  const { auth } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  if (!auth) return null; // Or render skeleton loader block
  const { user } = auth;
  const initials = getInitials(user.name);

  return (
    /* 1. RELATIVE PARENT: Crucial so the modal knows where to hook position bounds */
    <div className="relative w-full" ref={ref}>
      {/* 2. TRIGGER BOX: Transformed the wrapper into an active clickable item */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setDropdownOpen((prev) => !prev);
        }}
        id="user-avatar-trigger-button"
        className="w-full text-left flex items-center gap-3 rounded-2xl bg-(--card-bg) px-3 py-2 border border-(--border-color)/20 shadow-sm hover:border-(--border-color)/60 transition-all duration-200 cursor-pointer focus:outline-hidden"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white overflow-hidden select-none">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <span className="tracking-wider text-sm">{initials}</span>
          )}
        </div>

        <div className="hidden md:block min-w-0 flex-1">
          <p className="text-sm font-semibold text-(--text-primary) truncate">
            {user.name}
          </p>
          <p className="text-xs text-(--text-secondary) truncate">
            {user.email}
          </p>
        </div>
      </button>

      {/* 3. DROPDOWN INJECTION LAYER */}
      <UserDropdown
        isOpen={dropdownOpen}
        onClose={() => setDropdownOpen(false)}
      />
    </div>
  );
};
