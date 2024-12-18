import { create } from "zustand";

type User = {
  _id: string;
  username: string;
  email: string;
  phoneNumber: string;
  isEmailVerified: boolean;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

type AuthStore = {
  user: Partial<User> | null; // Allow Partial<User> in the state
  setUser: (user: Partial<User> | null) => void; // Action to update the user
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null, // Initial state
  setUser: (user) => set({ user }), // Action to update state
}));
