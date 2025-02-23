"use client";
import { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "admin" | "user" | "guest";

interface AuthContextType {
  user: { role: UserRole } | null;
  loading: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ role: UserRole } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user role from API or localStorage
    const storedRole = localStorage.getItem("role") as UserRole | null;
    console.log(storedRole, "role");
    if (storedRole) setUser({ role: storedRole });
    setLoading(false);
  }, []);

  const login = (role: UserRole) => {
    localStorage.setItem("role", role);
    setUser({ role });
  };

  const logout = () => {
    localStorage.removeItem("role");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("Use Auth must be used within an Auth Provider");
  return context;
};
