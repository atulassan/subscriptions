// utils/auth.ts
import { jwtDecode } from "jwt-decode";


interface JwtPayload {
  role: string;
  exp: number;
}

export const getUserRole = (): string | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    // check expiry
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }

    return decoded.role;
  } catch {
    return null;
  }
};
