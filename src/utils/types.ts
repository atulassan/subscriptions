import type { AxiosResponse } from 'axios';
import type { ReactNode } from "react"

// 1️⃣ Define types for context
export interface User {
  role?: string | null;
  id?: Number | string;
}

export interface LoginResponse {
  token: string;
  data: {
    role: "admin" | "user" | "subscriber" | "employee";
  };
}



export interface RegisterResponse {
  status: string | boolean;
  message: string;
  data: {
    status: string | boolean;
    //data: Record<string, unknown>;
  };
}
// Props for AuthProvider
export interface AuthProviderProps {
  children: ReactNode;
}