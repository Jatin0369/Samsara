import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isAdmin = localStorage.getItem('isAdmin'); // Check if admin status is set

  return isAdmin ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
