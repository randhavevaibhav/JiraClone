import { Bell, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Project Dashboard
        </h2>
        <p className="text-sm text-gray-500">
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
            className="w-72 rounded-xl border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
          />
        </div>

        <button className="relative rounded-xl bg-gray-100 p-3 transition hover:bg-gray-200">
          <Bell size={20} className="text-gray-700" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3 rounded-2xl bg-gray-100 px-3 py-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
            V
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">Vaibhav</p>
            <p className="text-xs text-gray-500">Frontend Developer</p>
          </div>
        </div>
      </div>
    </header>
  );
}
