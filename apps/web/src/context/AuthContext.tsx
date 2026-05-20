import  { type ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';
import type {LoginCredentials,LoginResponse,User} from "@/types/auth.types"
import { AuthContext } from '@/hooks/useAuth';



interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();

  // 1. Fetch user session automatically
  const { data: user, isLoading: loading } = useQuery<User | null>({
    queryKey: ['auth-user'],
    queryFn: authService.getCurrentUser,
    retry: false,
    staleTime: Infinity,
  });

  // 2. Handle Login via mutation (Updated Generics)
  // useMutation<TData, TError, TVariables>
  const loginMutation = useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: ({ email, password }) => authService.login(email, password),
    onSuccess: (data) => {
      // Extract the user object from the response and save it to the query cache
      queryClient.setQueryData(['auth-user'], data.user);
    },
  });

  // 3. Handle Logout via mutation
  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.setQueryData(['auth-user'], null);
      queryClient.clear();
    },
  });

  const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    return loginMutation.mutateAsync(credentials);
  };

  const logout = async (): Promise<void> => {
    return logoutMutation.mutateAsync();
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        login, 
        logout, 
        isLoggingIn: loginMutation.isPending 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


