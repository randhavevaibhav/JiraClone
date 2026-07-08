import type { AuthServiceType, User } from '@/types/auth.types';

const MOCK_USER: User = {
  id: 'usr_01J',
  name: 'Alex Developer',
  email: 'alex@clone.com',
  avatar: 'https://api.dicebear.com/9.x/big-smile/svg?seed=Luna',
};

export const authService: AuthServiceType = {
  // Mock login
  login: async ({ email, password }) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (email === 'demo@test.com' && password === 'password') {
      const mockToken = 'mock-jwt-token-xyz-123';
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(MOCK_USER));
      return { user: MOCK_USER, accessToken: mockToken };
    }
    throw new Error('Invalid email or password. Use demo@test.com / password');
  },

  // Mock signup
  signup: async (formData: FormData) => {
    //API call pass the formData
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log(formData);
  },

  // Mock logout
  logout: async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};
