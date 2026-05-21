import { type ReactNode } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { authService } from '../services/authService';

import type {
  LoginCredentials,
  LoginResponse,
  User,
} from '@/types/auth.types';


import { AuthContext } from '@/hooks/useAuth';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const queryClient = useQueryClient();

  // =========================
  // Fetch Current User
  // =========================
  const {
    data: user,
    isLoading: loading,
  } = useQuery<User | null>({
    queryKey: ['auth-user'],
    queryFn: authService.getCurrentUser,
    retry: false,
    staleTime: Infinity,
  });

  // =========================
  // Login Mutation
  // =========================
  const loginMutation = useMutation<
    LoginResponse,
    Error,
    LoginCredentials
  >({
    mutationFn: ({ email, password }) =>
      authService.login(email, password),

    onSuccess: (data) => {
      queryClient.setQueryData(
        ['auth-user'],
        data.user,
      );
    },
  });

  // =========================
  // Signup Mutation
  // =========================
  const signupMutation = useMutation<
    LoginResponse,
    Error,
    FormData
  >({
    mutationFn: async (data) => {
      return authService.signup(data);
    },

    onSuccess: (data) => {
      queryClient.setQueryData(
        ['auth-user'],
        data.user,
      );
    },
  });

  // =========================
  // Logout Mutation
  // =========================
  const logoutMutation = useMutation<
    void,
    Error,
    void
  >({
    mutationFn: authService.logout,

    onSuccess: () => {
      queryClient.setQueryData(
        ['auth-user'],
        null,
      );

      queryClient.clear();
    },
  });

  // =========================
  // Public Methods
  // =========================
  const login = async (
    credentials: LoginCredentials,
  ): Promise<LoginResponse> => {
    return loginMutation.mutateAsync(
      credentials,
    );
  };

  const signup = async (
    data: FormData,
  ): Promise<LoginResponse> => {
    return signupMutation.mutateAsync(
      data,
    );
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
        signup,
        logout,

        isLoggingIn:
          loginMutation.isPending,

        isSigningUp:
          signupMutation.isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}