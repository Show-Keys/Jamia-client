import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Validation/ProtectedRoute.js";
import AnimatedBackground from "./components/AnimatedBackground.js";
import Registration from "./components/All/Registration";
import Login from "./components/All/Login";
import AboutUs from "./components/All/AboutUs.js";
import Home from "./components/All/Home";
import SearchJamiya from "./components/All/SearchJamiya";
import JamiaDashBorad from "./components/Admin/JamiaDashBoard.js";
import AddJamiya from "./components/Admin/AddJamiya";
import Header from "./Header";
import AdminBoard from "./components/Admin/AdminBoard";
import UserWheel from "./components/All/UserWheel";
import AdminDashBordUsersMangment from "./components/Admin/AdminDashBordUsersMangment.js";
import AdminWheel from "./components/Admin/AdminWheel.js";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchJamiya />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/JamiaDashBorad" element={<JamiaDashBorad />} />
        <Route path="/addjamiya" element={<AddJamiya />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/UserWheel" element={<UserWheel />} />
        <Route
          path="/AdminBoard"
          element={
            <ProtectedRoute>
              <AdminBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddJamiya"
          element={
            <ProtectedRoute>
              <AddJamiya />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AdminDashBordUsersMangment"
          element={
            <ProtectedRoute>
              <AdminDashBordUsersMangment />
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
          path="/AdminWheel"
          element={
            <ProtectedRoute>
              <AdminWheel />
            </ProtectedRoute>
          }
        />
      </Routes>
      <AnimatedBackground />
    </BrowserRouter>
  );
};

export default App;
