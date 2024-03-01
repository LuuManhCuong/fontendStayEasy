import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ ...rest }) => {
    const isAuthenticated = localStorage.getItem('user');
    const location = useLocation();
  
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
  };
  
  export const isAuthenticated = () => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    const user = localStorage.getItem('user');
    return user ? true : false;
  };