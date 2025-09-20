import React, { createContext, useState } from 'react';

export const VerificationContext = createContext<any>(null);

export const VerificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<any[]>([]);
  const addResult = (result: any) => setHistory([result, ...history]);
  return (
    <VerificationContext.Provider value={{ history, addResult }}>
      {children}
    </VerificationContext.Provider>
  );
};