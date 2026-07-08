export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export interface Auth {
  user: User;
  accessToken: string;
}

export interface AuthServiceType {
  login: (credentials: LoginCredentials) => Promise<Auth>;
  logout: () => Promise<void>;
  signup: (data: FormData) => Promise<void>;
}

export interface AuthContextType extends AuthServiceType {
  auth: Auth | null | undefined;
  isLoginpending: boolean;
  isSignupPending: boolean;
}
