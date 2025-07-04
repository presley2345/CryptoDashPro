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
      const session = await account.get();
      if (session) {
        const userData = await databases.getDocument(
          DATABASE_ID,
          USERS_COLLECTION_ID,
          session.$id
        );
        setUser(userData as unknown as User);
      }
    } catch (error) {
      // User not logged in
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      await checkAuth();
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
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
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
    } catch (error) {
      throw error;
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