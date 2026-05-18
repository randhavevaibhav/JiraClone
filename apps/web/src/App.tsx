import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './routes/Approutes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 25 * 60 * 1000, //25 min
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
         <AppRoutes/>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
