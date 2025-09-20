import React, { createContext, useState } from 'react';

export const AuthContext = createContext<any>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (user: any, token: string) => {
    setUser(user); setToken(token); localStorage.setItem('token', token);
  };
  const logout = () => {
    setUser(null); setToken(null); localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};