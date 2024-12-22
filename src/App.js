import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './Header';
import Home from './components/All/Home';
import Login from './components/All/Login';
import Registeration from './components/All/Registration';
import AddJamiya from './components/Admin/AddJamiya';
import JamiaDashBorad from './components/Admin/JamiaDashBoard';
import AdminDashBordUsersMangment from './components/Admin/AdminDashBordUsersMangment';
import AdminUsers from './components/Admin/AdminUsers';
import AdminWheel from './components/Admin/AdminWheel';
import UserWheel from './components/All/UserWheel';
import ProtectedRoute from './components/ProtectedRoute';
import AnimatedBackground from './components/AnimatedBackground';
import AboutUs from './components/All/AboutUS';
import Search from './components/All/SearchJamiya';
const App = () => {
  const user = useSelector((state) => state.user?.user);
  const isAdmin = useSelector((state) => state.user?.isAdmin);

  return (
    <BrowserRouter>
    
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Registeration />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/UserWheel" element={<UserWheel />} />
        <Route path="/search" element={<Search />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        {user && isAdmin ? (
          <>
            <Route
              path="/addjamiya"
              element={
                <ProtectedRoute>
                  <AddJamiya />
                </ProtectedRoute>
              }
            />
            <Route
              path="/JamiaDashBorad"
              element={
                <ProtectedRoute>
                  <JamiaDashBorad />
                </ProtectedRoute>
              }
            />
            <Route
              path="/viewusers/:jcode"
              element={
                <ProtectedRoute>
                  <AdminDashBordUsersMangment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/UserManagement"
              element={
                <ProtectedRoute>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/AdminWheel"
              element={
                <ProtectedRoute>
                  <AdminWheel />
                </ProtectedRoute>
              }
            />
          </>
        ) : (
          <Route path="/Login" element={<Login />} />
        )}
      </Routes>
      <AnimatedBackground/>
    </BrowserRouter>
  );
};

export default App;
