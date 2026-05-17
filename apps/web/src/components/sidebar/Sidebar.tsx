import { LayoutDashboard, FolderKanban, Star, Settings } from 'lucide-react';
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
  return (
    <aside className="hidden w-72 flex-col border-r border-gray-200 bg-white lg:flex">
      <div className="border-b border-gray-200 px-6 py-5">
        <h1 className="text-2xl font-bold text-gray-900">JiraClone</h1>
        <p className="mt-1 text-sm text-gray-500">Project Workspace</p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
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

      <div className="border-t border-gray-200 p-4">
        <div className="rounded-2xl bg-gray-100 p-4">
          <p className="text-sm font-medium text-gray-800">Current Sprint</p>
          <p className="mt-1 text-xs text-gray-500">
            Sprint 12 • 7 days remaining
          </p>
        </div>
      </div>
    </aside>
  );
}
