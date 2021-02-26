import { createContext, ReactNode } from 'react';

interface ContextProviderProps {
  children: ReactNode;
}
interface CountdownContextData {}

const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: ContextProviderProps) {
  return (
    <CountdownContext.Provider value={{}}>{children}</CountdownContext.Provider>
  );
}
