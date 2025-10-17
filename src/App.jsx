import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Favorites from "./pages/Favorites";
import "./index.css";

function App() {
  return (
    <>
      {/* Toast Notifications */}
      <Toaster position="top-right" />

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
