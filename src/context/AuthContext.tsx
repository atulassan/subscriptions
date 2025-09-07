import React, { createContext, useState } from "react";
import axios from "axios";
import type { AxiosResponse } from 'axios';
import { getDecodedUser } from "../utils/auth";
import type { User, LoginResponse, RegisterResponse, AuthProviderProps } from "../utils/types";

export interface AuthContextType {
  user: User | null;
  login: (data: Record<string, unknown>) => Promise<AxiosResponse<LoginResponse>>;
  logout: () => void;
  register: ()=>(data: Record<string, unknown>) => Promise<AxiosResponse<RegisterResponse>>;
}

// Create context with default value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => { throw new Error("Not implemented"); },
  logout: () => { throw new Error("Not implemented"); },
  register: () => { throw new Error("Not implemented"); }
});

// AuthProvider Component
export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    const role = getDecodedUser()?.role;
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

   const register = async (data: Record<string, unknown>): Promise<AxiosResponse<RegisterResponse>> => {
    try {
      const response = await axios.post<RegisterResponse>("http://localhost:5050/api/v1/register", data); 
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
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
