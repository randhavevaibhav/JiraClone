import { useState, type ReactNode } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';
import type { LoginCredentials, Auth } from '@/types/auth.types';
import { AuthContext } from '@/hooks/useAuth';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();

  const [auth, setAuth] = useState<Auth | null>(null);

  const loginMutation = useMutation<Auth, Error, LoginCredentials>({
    mutationFn: (loginCredentials) => authService.login(loginCredentials),

    onSuccess: (data) => {
      setAuth(data);
    },
  });

  // =========================
  // Signup Mutation
  // =========================
  const signupMutation = useMutation<void, Error, FormData>({
    mutationFn: async (data) => {
      return authService.signup(data);
    },
  });

  // =========================
  // Logout Mutation
  // =========================
  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: authService.logout,

    onSuccess: () => {
      setAuth(null);
      queryClient.clear();
    },
  });

  // =========================
  // Public Methods
  // =========================
  const login = async (credentials: LoginCredentials) => {
    return loginMutation.mutateAsync(credentials);
  };

  const signup = async (data: FormData) => {
    return signupMutation.mutateAsync(data);
  };

  const logout = async () => {
    return logoutMutation.mutateAsync();
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        signup,
        logout,
        isLoginpending: loginMutation.isPending,
        isSignupPending: signupMutation.isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
