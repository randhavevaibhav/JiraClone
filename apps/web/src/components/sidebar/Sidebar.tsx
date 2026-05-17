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

const navItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
  },
  {
    label: 'Boards',
    icon: FolderKanban,
    path: '/board/1',
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
      <div className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-2 lg:hidden absolute">
        <div>
          <h1 className="hidden lg:block text-xl font-bold text-gray-900 px-6">
            JiraClone
          </h1>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="cursor-pointer rounded-lg p-2 transition hover:bg-gray-100"
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
          border-r border-gray-200 bg-white transition-transform duration-300
          lg:static lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">JiraClone</h1>
            <p className="mt-1 text-sm text-gray-500">Project Workspace</p>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer rounded-lg p-2 transition hover:bg-gray-100 lg:hidden"
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
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
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
        <div className="border-t border-gray-200 p-4">
          <div className="rounded-2xl bg-gray-100 p-4">
            <p className="text-sm font-medium text-gray-800">Current Sprint</p>

            <p className="mt-1 text-xs text-gray-500">
              Sprint 12 • 7 days remaining
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
