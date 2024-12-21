import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './components/All/Home';
import JoinToJamia from './components/All/SearchJamiya';
import AdminBoard from './components/Admin/AdminBoard';
import UserWheel from './components/All/UserWheel';
import AdminWheel from './components/Admin/AdminWheel';
import ResultTable from './components/All/Result';
import ProtectedRoute from './Validation/ProtectedRoute';
import AnimatedBackground from './components/AnimatedBackground';
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<JoinToJamia />} />
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
        <Route path="/UserWheel" element={<UserWheel />} />
        <Route path="/results" element={<ResultTable />} />
      </Routes>
      <AnimatedBackground />
    </BrowserRouter>
  );
};

export default App;