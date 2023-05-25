"use client"

import { createContext, useState, ReactNode, useEffect } from 'react';

export interface User {
  user_id: number;
  username: string;
  discriminator: number;
  avatar: string;
}

interface AuthContextProps {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    login(user) {},
    logout() {}
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const raw_user = localStorage.getItem("user")
  const [user, setUser] = useState<User | null>(
    raw_user ? JSON.parse(raw_user) : null
  );

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
};