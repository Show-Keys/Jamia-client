import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const ProtectedRoute = ({ children, adminOnly }) => {
  const { user, isAdmin } = useSelector((state) => state.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !isAdmin) {
    Swal.fire({
      icon: 'error',
      title: 'Access Denied',
      text: 'You are not authorized to access this page.',
    });
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
