import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  // Prevent flashing redirects while checking the user session
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-(--text-secondary) font-medium">Verifying session...</p>
        </div>
      </div>
    );
  }

  // If no user is found, redirect to the public home/landing page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If a user exists, render the child routes safely
  return <Outlet />;
}