// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/storage";

const ProtectedRoute = ({ children }) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
