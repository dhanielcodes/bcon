"use client";
import { createContext, FC, ReactNode, useContext, useState } from "react";

export type ErrorContextType = {
  isAuth: boolean;
};

export interface Context {
  children?: ReactNode;
}

const MainContext = createContext<ErrorContextType | null>(null);

export const MainProvider: FC<Context> = ({ children }) => {
  // Use this type in your state initialization
  const [isAuth, setIsAuth] = useState<boolean>(true);

  return (
    <MainContext.Provider
      value={{
        isAuth,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("Use Main Context must be used within a Main Provider");
  }
  return context;
};

export default MainContext;
