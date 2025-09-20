import React, { createContext, useState } from 'react';

export const ThemeContext = createContext<{ mode: string, toggle: () => void }>({ mode: 'light', toggle: () => {} });

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const toggle = () => setMode(mode === 'light' ? 'dark' : 'light');
  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};