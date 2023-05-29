"use client"

import { cookies } from 'next/headers';
import { createContext, useState, ReactNode, useEffect } from 'react';

export interface User {
  user_id: number;
  username: string;
  discriminator: number;
  avatar: string;
  key_salt: string;
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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      console.log("fetching user.")
      const response = await fetch("http://localhost:8000/api/auth/me", {credentials: "include"})
      if (response.status === 200){
        const data = await response.json();
        setUser(data)
      }
      else{
        console.log(response.status)
      }
    }
    console.log("running hook.")
    fetchUser()
    
  }, [])

  const login = (user: User) => {
    setUser(user);
    // localStorage.setItem('user', JSON.stringify(user));
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