import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Home from '../pages/Home';
import DashboardPage from '@/pages/DashboardPage';
import BoardPage from '@/pages/BoardPage';
import AuthLayout from '@/layouts/AuthLayout';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import LoginPage from '@/pages/LogInPage';
import UnAuthLayout from '@/layouts/UnAuthLayout';
import { getDashboardPagePath } from '@/utils/getPagePaths';
import NotFound from '@/pages/NotFound';

const router = createBrowserRouter([
  // Public Route
  {
    element: <UnAuthLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    // Protected Routes Layer (No path means it acts as a layout wrapper)
    element: <ProtectedRoute />,
    children: [
      {
        // Dashboard Shell Layout Wrapper
        element: <AuthLayout />,
        children: [
          {
            path: getDashboardPagePath(),
            element: <DashboardPage />,
          },
          {
            path: '/board/:id',
            element: <BoardPage />,
          },
        ],
      },
    ],
  },
  {
    // Fallback Catch-All Route
    path: '*',
    element: <NotFound/>,
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
