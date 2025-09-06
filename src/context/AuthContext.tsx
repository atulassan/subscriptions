import React, { createContext, useState } from "react";
import type { ReactNode } from "react"
import axios from "axios";
import type { AxiosResponse } from 'axios';
import { getUserRole } from "../utils/auth";

// 1️⃣ Define types for context
interface User {
  role: string | null;
}

interface LoginResponse {
  token: string;
  data: {
    role: "admin" | "user";
  };
}

interface AuthContextType {
  user: User | null;
  login: (data: Record<string, unknown>) => Promise<AxiosResponse<LoginResponse>>;
  logout: () => void;
}

// 2️⃣ Create context with default value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => { throw new Error("Not implemented"); },
  logout: () => { throw new Error("Not implemented"); }
});

// 3️⃣ Props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// 4️⃣ AuthProvider Component
export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    const role = getUserRole();
    return role ? { role } : null;
  });

  const login = async (data: Record<string, unknown>): Promise<AxiosResponse<LoginResponse>> => {
    try {
      const response = await axios.post<LoginResponse>("http://localhost:5050/api/v1/login", data);
      // save token if needed
      localStorage.setItem("token", response.data.token);
      setUser({ role: response.data.data.role });
      return response;
    } catch (err: any) {
      console.error("Login Failed:", err.response?.data || err.message);
      return err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
