import { create } from 'zustand';
import { User, UserRole } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (data: any, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  guestMode: () => void;
  restoreToken: () => Promise<void>;
}

const mockUsers: Record<string, User> = {
  'customer@test.com': {
    id: '1',
    email: 'customer@test.com',
    name: 'Sarah Chen',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    createdAt: new Date().toISOString(),
  },
  'business@test.com': {
    id: '2',
    email: 'business@test.com',
    name: 'John Smith',
    role: 'business',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    createdAt: new Date().toISOString(),
  },
  'admin@test.com': {
    id: '3',
    email: 'admin@test.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    createdAt: new Date().toISOString(),
  },
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

  login: async (email: string, password: string, role: UserRole) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const user = mockUsers[email];
    if (user && user.role === role) {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      set({ user, isAuthenticated: true, loading: false });
    } else {
      throw new Error('Invalid credentials');
    }
  },

  signup: async (data: any, role: UserRole) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newUser: User = {
      id: String(Date.now()),
      email: data.email,
      name: data.name,
      role,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      createdAt: new Date().toISOString(),
    };
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
    set({ user: newUser, isAuthenticated: true, loading: false });
  },

  logout: async () => {
    await AsyncStorage.removeItem('user');
    set({ user: null, isAuthenticated: false, loading: false });
  },

  guestMode: () => {
    set({
      user: {
        id: 'guest',
        email: 'guest@authentify.local',
        name: 'Guest User',
        role: 'customer',
        createdAt: new Date().toISOString(),
      },
      isAuthenticated: false,
      loading: false,
    });
  },

  restoreToken: async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        set({ user: JSON.parse(user), isAuthenticated: true, loading: false });
      } else {
        set({ loading: false });
      }
    } catch {
      set({ loading: false });
    }
  },
}));
