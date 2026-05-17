import { Bell, Search, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="flex h-20 items-center justify-between border-b border-(--border-color) bg-(--bg-secondary) px-6">
      <div className="min-w-0 lg:ml-0 ml-12">
        <h2 className="truncate text-lg font-semibold text-(--text-primary) sm:text-xl">
          Dashboard
        </h2>

        <p className="mt-1 text-xs text-(--text-secondary) sm:text-sm">
          Manage boards, tasks, and team collaboration.
        </p>
      </div>

      <div className="flex items-center gap-4">
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
        <button
          onClick={toggleTheme}
          className="
            rounded-xl bg-(--card-bg) p-3 cursor-pointer"
        >
          {theme === 'light' ? (
            <Moon size={20} className="text-(--text-active)" />
          ) : (
            <Sun size={20} className="text-yellow-400" />
          )}
        </button>

        <button className="relative rounded-xl bg-(--card-bg) p-3">
          <Bell size={20} className="text-(--text-primary) cursor-pointer" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3 rounded-2xl bg-(--card-bg) px-3 py-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
            V
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-medium text-(--text-primary)">Vaibhav</p>
            <p className="text-xs text-(--text-secondary)">
              Frontend Developer
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
