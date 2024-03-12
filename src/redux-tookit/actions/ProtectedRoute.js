import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ ...rest }) => {
  const isAuthenticated = localStorage.getItem("access_token")?true:false;

  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
