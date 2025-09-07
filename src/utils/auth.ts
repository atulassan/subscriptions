import { jwtDecode } from "jwt-decode";

interface MyJwtPayload {
  id: number;
  name: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

export const getDecodedUser = (): MyJwtPayload | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<MyJwtPayload>(token);

    // check expiry
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }

    return decoded; // return full object instead of only role
  } catch {
    return null;
  }
};
