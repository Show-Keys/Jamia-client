import React,{useState} from "react";
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
import Registration from './components/Registration';
import Login from './components/Login';

const App = () => {
  return (
    <BrowserRouter>
    
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchJamiya />} />
        <Route path="/JamiaDashBorad" element={<JamiaDashBorad />} />
        <Route path="/addjamiya" element={<AddJamiya />} />
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
        <Route path="/UserWheel" element={<UserWheel/>} />
      </Routes>
      <AnimatedBackground />
    </BrowserRouter>
  );
};

export default App;
