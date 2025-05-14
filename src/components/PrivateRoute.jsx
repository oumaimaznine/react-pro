
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {

    const fullPath = location.pathname + location.search + location.hash;
    localStorage.setItem('redirectAfterLogin', fullPath);

    return <Navigate to="/connexion" replace />;
  }
  return children;
};

export default PrivateRoute;
