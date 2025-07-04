import React, { useState, useEffect, createContext, useContext } from 'react';
import { account, databases, DATABASE_ID, USERS_COLLECTION_ID, ID } from '@/lib/appwrite';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  currency: string;
  accountTier: string;
  isVerified: boolean;
  invested: number;
  profit: number;
  bonus: number;
  balance: number;
  btcEquivalent: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Check if Appwrite is properly configured
      if (!import.meta.env.VITE_APPWRITE_ENDPOINT || !import.meta.env.VITE_APPWRITE_PROJECT_ID) {
        console.warn('Appwrite configuration missing. Skipping authentication check.');
        setLoading(false);
        return;
      }

      const session = await account.get();
      if (session) {
        const userData = await databases.getDocument(
          DATABASE_ID,
          USERS_COLLECTION_ID,
          session.$id
        );
        setUser(userData as unknown as User);
      }
    } catch (error: any) {
      console.log('Authentication check failed:', error.message);
      // Clear any invalid session data
      setUser(null);
      
      // If it's a network error, we might want to retry
      if (error.code === 'network' || error.message?.includes('Failed to fetch')) {
        console.warn('Network error during authentication. This might be due to missing Appwrite configuration.');
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      if (!import.meta.env.VITE_APPWRITE_ENDPOINT || !import.meta.env.VITE_APPWRITE_PROJECT_ID) {
        throw new Error('Appwrite configuration is missing. Please check your environment variables.');
      }
      
      await account.createEmailPasswordSession(email, password);
      await checkAuth();
    } catch (error: any) {
      console.error('Login failed:', error);
      if (error.message?.includes('Failed to fetch')) {
        throw new Error('Unable to connect to authentication service. Please check your internet connection.');
      }
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      if (!import.meta.env.VITE_APPWRITE_ENDPOINT || !import.meta.env.VITE_APPWRITE_PROJECT_ID) {
        throw new Error('Appwrite configuration is missing. Please check your environment variables.');
      }
      
      const { email, password, firstName, lastName, phone, country, currency } = userData;
      
      // Create account
      const response = await account.create(ID.unique(), email, password);
      
      // Create user document
      await databases.createDocument(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        response.$id,
        {
          email,
          firstName,
          lastName,
          phone,
          country,
          currency,
          accountTier: 'Bronze',
          isVerified: false,
          invested: 0,
          profit: 0,
          bonus: 0,
          balance: 0,
          btcEquivalent: 0
        }
      );
      
      // Login after registration
      await login(email, password);
    } catch (error: any) {
      console.error('Registration failed:', error);
      if (error.message?.includes('Failed to fetch')) {
        throw new Error('Unable to connect to authentication service. Please check your internet connection.');
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (import.meta.env.VITE_APPWRITE_ENDPOINT && import.meta.env.VITE_APPWRITE_PROJECT_ID) {
        await account.deleteSession('current');
      }
      setUser(null);
    } catch (error: any) {
      console.error('Logout failed:', error);
      // Always clear user state even if logout fails
      setUser(null);
      if (error.message?.includes('Failed to fetch')) {
        console.warn('Network error during logout, but user state has been cleared.');
      }
    }
  };

  const updateProfile = async (userData: any) => {
    try {
      if (!user) throw new Error('User not authenticated');
      
      await databases.updateDocument(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        user.id,
        userData
      );
      
      setUser(prev => prev ? { ...prev, ...userData } : null);
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile
  };

  return React.createElement(AuthContext.Provider, { value }, children);
}