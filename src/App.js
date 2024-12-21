import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/All/Home";
import AdminWheel from "./components/Admin/AdminWheel.js";
import Header from "./Header.js";
import AddJamiya from "./components/Admin/AddJamiya.js";
import SearchJamiya from "./components/All/SearchJamiya.js";
import JamiaDashBorad from "./components/Admin/JamiaDashBoard.js";
import AdminBoard from './components/Admin/AdminBoard.js';
import UserWheel from './components/All/UserWheel.js';
import ProtectedRoute from './Validation/ProtectedRoute.js';
import AnimatedBackground from "./components/AnimatedBackground.js";
import Login from "./components/All/Login.js";
import Registeration from "./components/All/Registration.js";
import { useSelector } from 'react-redux';
import AdminUsers from "./components/Admin/AdminUsers.js";
import WheelComponent from "./components/Admin/WheelComponent.js";
import AdminDashBordUsersMangment from "./components/Admin/AdminDashBordUsersMangment.js";
import AboutUs from "./components/All/AboutUS.js";


const App = () => {

  const  user  = useSelector((state) => state.auth);
  const isAdmin  = useSelector((state) => state.auth.isAdmin);
  console.log(user,isAdmin);
  return (
    <BrowserRouter>

      <Header />

      <Routes>
      <Route path="/wheel" element={<AdminWheel />} />
      <Route path="/Register" element={<Registeration />} />
      <Route path="/addjamiya" element={<AddJamiya />} />
      <Route path="/JamiaDashBorad" element={<JamiaDashBorad />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/result" element={<UserWheel />} />
      <Route path="/AboutUs" element={<AboutUs />} />
      <Route path="/viewusers/:jcode" element={<AdminDashBordUsersMangment />} />
      <Route path="/" element={<Home />} />
        {user && isAdmin ? (
          <>
           
            <Route path="/UserManagement" element={<AdminUsers />} />
            
            <Route path="/UserManagement" element={<AdminUsers />} />
            
            
            <Route
                path="/AdminWheel"
                element={
                  <ProtectedRoute>
                    <AdminWheel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/AdminBoard"
                element={
                  <ProtectedRoute>
                    <AdminBoard />
                  </ProtectedRoute>
                }
              />

          </>


        ) : (
          { user } ? (
            <>
              <Route path="/search" element={<SearchJamiya />} />
              
            </>
          ) :

            (
              <>
                
              </>
            )

        )}
      </Routes>
      <AnimatedBackground />
    </BrowserRouter>
  );
};

export default App;
