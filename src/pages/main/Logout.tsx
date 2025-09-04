import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove JWT token
    localStorage.removeItem("token");

    // You can also clear user data if stored
    localStorage.removeItem("user");

    // Redirect to login page
    navigate("/login", { replace: true });
  }, [navigate]);

  return null; // no UI, it just redirects
}
