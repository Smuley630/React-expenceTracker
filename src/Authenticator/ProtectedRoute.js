import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider ';

const ProtectedRoute = ({ children }) => {
  const { isverified } = useAuth();

  return isverified ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
