import { Bell, Search } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { UserAvatar } from '@/components/UserAvatar/UserAvatar';

export default function Navbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-(--border-color) bg-(--bg-secondary) lg:px-16 px-4">
      <div className="flex items-center w-full">
        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-72 rounded-xl border border-gray-300 bg-(--bg-secondary) py-2 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500"
          />
        </div>
        <div className="ml-auto flex gap-8  items-center">
          <ThemeToggle />
          <button
            className="relative rounded-xl bg-(--card-bg) p-3"
            title="notification-btn"
            type='button'
          >
            <Bell size={20} className="text-(--text-primary) cursor-pointer" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

        <UserAvatar/>
        </div>
      </div>
    </header>
  );
}
