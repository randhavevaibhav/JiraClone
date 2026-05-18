import { useState } from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  Star,
  Settings,
  Menu,
  X,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { getBoardPagePath, getDashboardPagePath } from '@/utils/getPagePaths';

const navItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: getDashboardPagePath(),
  },
  {
    label: 'Boards',
    icon: FolderKanban,
    path: getBoardPagePath("1"),
  },
  {
    label: 'Favorites',
    icon: Star,
    path: '/favorites',
  },
  {
    label: 'Settings',
    icon: Settings,
    path: '/settings',
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Topbar */}
      <div className="flex h-20 items-center justify-between border-b border-(--border-color) bg-(--bg-secondary) px-2 lg:hidden absolute">
        <button
          onClick={() => setIsOpen(true)}
          className="cursor-pointer rounded-lg p-2 hover:bg-(--card-bg)"
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-full w-72 flex-col
          border-r border-(--border-color) bg-(--bg-secondary) transition-transform duration-300
          lg:static lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-(--border-color) px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold text-(--text-primary)">
              JiraClone
            </h1>
            <p className="mt-1 text-sm text-(--text-secondary)">
              Project Workspace
            </p>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer rounded-lg p-2 hover:bg-(--card-bg) lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-(--card-bg) text-(--text-active)'
                      : 'text-(--text-primary) hover:bg-(--card-bg)'
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-(--border-color) p-4">
          <div className="rounded-2xl bg-(--card-bg) p-4">
            <p className="text-sm font-medium text-(--text-primary)">
              Current Sprint
            </p>

            <p className="mt-1 text-xs text-(--text-secondary)">
              Sprint 12 • 7 days remaining
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
