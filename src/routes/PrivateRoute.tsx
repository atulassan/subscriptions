import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getDecodedUser } from "../utils/auth";

interface PrivateRouteProps {
  allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const role  = getDecodedUser()?.role; // instead desctructure we can go for optional chaining

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;

