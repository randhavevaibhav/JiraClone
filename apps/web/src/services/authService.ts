import type{User} from "@/types/auth.types"

const MOCK_USER:User = {
  id: "usr_01J",
  name: "Alex Developer",
  email: "alex@clone.com",
  avatar: "https://api.dicebear.com/9.x/big-smile/svg?seed=Luna",
};

export const authService = {
  // Mock login
  login: async (email:string, password:string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (email === "demo@test.com" && password === "password") {
      const mockToken = "mock-jwt-token-xyz-123";
      localStorage.setItem("token", mockToken);
      localStorage.setItem("user", JSON.stringify(MOCK_USER));
      return { user: MOCK_USER, token: mockToken };
    }
    throw new Error("Invalid email or password. Use demo@test.com / password");
  },

  // Mock signup
  signup: async (name:string, email:string) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const newUser = { id: Math.random().toString(), name, email, avatar: "" };
    localStorage.setItem("token", "mock-jwt-token-new");
    localStorage.setItem("user", JSON.stringify(newUser));
    return { user: newUser, token: "mock-jwt-token-new" };
  },

  // Mock getting current logged in user session on refresh
  getCurrentUser: async () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token || !user) return null;
    return JSON.parse(user);
  },

  // Mock logout
  logout: async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};