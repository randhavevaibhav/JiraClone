import { Link, Outlet } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { Home } from 'lucide-react';

export default function UnAuthLayout() {
  return (
    <div className="min-h-screen font-sans antialiased overflow-x-hidden transition-colors duration-300 text-(--text-primary)">
      <div className="flex justify-between p-2 fixed z-30 w-full">
       <Link to={"/"} className='p-2 rounded-md hover:text-(--text-active)'>
        <Home/>
       </Link>
        <ThemeToggle />
      </div>
      <div className='my-10'></div>
      <Outlet />
    </div>
  );
}
