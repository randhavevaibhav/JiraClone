import { Link, Outlet } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { Home } from 'lucide-react';

export default function UnAuthLayout() {
  return (
    <>
      <header className="p-2 fixed z-30 w-full h-(--header-height) inset-0 bg-(--bg-secondary) border-b border-(--border-color)">
        <nav className="flex justify-between ">
          <Link to={'/'} className="p-2 rounded-md hover:text-(--text-active)">
            <Home />
          </Link>
          <ThemeToggle />
        </nav>
      </header>

      <main className="mt-(--header-height)">
        <Outlet />
      </main>
    </>
  );
}
