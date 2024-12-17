import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'animate.css';


const PASSWORD = 'admin123'; // Set your password here

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const handlePasswordCheck = async () => {
    let authenticated = false;

    while (!authenticated) {
      const { value: password, isDismissed } = await Swal.fire({
        title: '<span style="color:rgb(42, 139, 177); font-size: 1.5rem;">🔒 Enter Admin Password</span>',
        input: 'password',
        inputPlaceholder: 'Enter your password',
        inputAttributes: {
          autocapitalize: 'off',
          style: 'font-size: 1.2rem; padding: 10px;border-color:rgb(42, 139, 177); border-radius: 10px;',
        },
        background: 'linear-gradient(135deg,rgb(213, 249, 255), #ffe4b5)',
        showCancelButton: true,
        confirmButtonText: '<span style="font-weight: bold;">✅ Submit</span>',
        cancelButtonText: '<span style="font-weight: bold;">❌ Cancel</span>',
        confirmButtonColor: '#ff8c00',
        cancelButtonColor: 'rgb(235, 117, 117)',
        customClass: {
          popup: 'swal2-popup-custom',
          input: 'swal2-input-custom',
        },
        showClass: {
          popup: 'animate__animated animate__zoomIn',
        },
        hideClass: {
          popup: 'animate__animated animate__zoomOut',
        },
      });
    
      if (isDismissed) {
        break; // Exit the loop if the user cancels
      }
    
      if (password === PASSWORD) {
        authenticated = true;
        await Swal.fire({
          icon: 'success',
          title: '✅ Access Granted',
          text: 'Welcome, Admin!',
          confirmButtonColor: '#28a745',
        });
      } else {
        await Swal.fire({
          icon: 'error',
          title: '<span style="color: #d9534f;">❌ Access Denied</span>',
          text: 'Incorrect password. Please try again.',
          confirmButtonColor: '#ff8c00',
        });
      }
    }
    

    return authenticated;
  };
  useEffect(() => {
    handlePasswordCheck().then((authenticated) => {
      setIsAuthenticated(authenticated);
      setIsChecking(false);
    });
  }, []);

  if (isChecking) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/AdminBoard" replace />;
};

export default ProtectedRoute;
