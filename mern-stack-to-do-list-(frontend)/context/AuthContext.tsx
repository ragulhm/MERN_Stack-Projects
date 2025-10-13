import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, pass: string) => Promise<void>;
  signup: (username: string, pass: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock Database using localStorage
const getUsers = () => JSON.parse(localStorage.getItem('users') || '{}');
const setUsers = (users: any) => localStorage.setItem('users', JSON.stringify(users));

// Add default user
const initializeUsers = () => {
    const users = getUsers();
    if (!users.ragul) {
        // NOTE: In a real app, NEVER store plain text passwords. This is for simulation only.
        // Hashing (e.g., with bcrypt) should be done on a secure backend.
        users.ragul = '123456'; 
        setUsers(users);
    }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const [token, setToken] = useLocalStorage<string | null>('token', null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      initializeUsers();
  }, []);

  const login = async (username: string, pass: string): Promise<void> => {
    const users = getUsers();
    if (users[username] && users[username] === pass) {
      const currentUser = { username };
      setUser(currentUser);
      setToken(`mock-jwt-for-${username}`); // Simulate JWT
      setError(null);
    } else {
      setError('Invalid username or password.');
      throw new Error('Invalid credentials');
    }
  };

  const signup = async (username: string, pass: string): Promise<void> => {
    const users = getUsers();
    if (users[username]) {
      setError('Username already exists.');
      throw new Error('Username exists');
    }
    users[username] = pass; // Again, never store plaintext passwords in a real application.
    setUsers(users);
    
    // Automatically log in after signup
    const currentUser = { username };
    setUser(currentUser);
    setToken(`mock-jwt-for-${username}`);
    setError(null);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
