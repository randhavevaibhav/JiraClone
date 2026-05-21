export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export interface LoginResponse {
  user: User;
  token: string;
}

export interface AuthContextType {
  user: User | null | undefined;
  loading: boolean;
  isLoggingIn: boolean;
  isSigningUp:boolean;
  // Change return type here to match what your component might need, or keep it returning User
  login: (credentials: LoginCredentials) => Promise<LoginResponse>;
  logout: () => Promise<void>;
   signup: (
    data: FormData,
  ) => Promise<LoginResponse>;
}
