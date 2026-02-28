import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MapView from "./components/MapView";
import MonasteryDetails from "./pages/MonasteryDetails";
import Home from "./pages/Home";
import Page from "./pages/Page";
import CulturalCalendar from "./pages/CulturalCalendar";
import HotelsCars from "./pages/HotelsCars";
import Weather from "./pages/Weather";
import AboutUs from "./pages/AboutUs";
import SikkimMonasteryHelpline from "./pages/SikkimMonasteryHelpline";
import BookingSuccess from "./pages/BookingSuccess"; // ✅ Added

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Persistent login check
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setIsAuthenticated(true);
  }, []);

  return (
    <Router>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />

      <main style={{ minHeight: "70vh" }}>
        <Routes>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/page" replace />} />

          {/* Authentication routes */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/home" replace />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />

          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate to="/page" replace /> : <Register />
            }
          />

          {/* Public page */}
          <Route path="/page" element={<Page />} />
          <Route path="/about" element={<AboutUs />} />

          {/* Protected routes */}
          <Route
            path="/explore"
            element={
              isAuthenticated ? <MapView /> : <Navigate to="/page" replace />
            }
          />

          <Route
            path="/monastery/:id"
            element={
              isAuthenticated ? (
                <MonasteryDetails />
              ) : (
                <Navigate to="/page" replace />
              )
            }
          />

          <Route
            path="/home"
            element={
              isAuthenticated ? <Home /> : <Navigate to="/page" replace />
            }
          />

          <Route
            path="/cultural-calendar"
            element={
              isAuthenticated ? (
                <CulturalCalendar />
              ) : (
                <Navigate to="/page" replace />
              )
            }
          />

          <Route
            path="/hotels"
            element={
              isAuthenticated ? (
                <HotelsCars />
              ) : (
                <Navigate to="/page" replace />
              )
            }
          />

          <Route
            path="/weather"
            element={
              isAuthenticated ? <Weather /> : <Navigate to="/page" replace />
            }
          />

          <Route
            path="/helpline"
            element={
              isAuthenticated ? (
                <SikkimMonasteryHelpline />
              ) : (
                <Navigate to="/page" replace />
              )
            }
          />

          {/* ✅ Booking Success Route (MUST be before catch-all) */}
          <Route
            path="/booking-success"
            element={
              isAuthenticated ? (
                <BookingSuccess />
              ) : (
                <Navigate to="/page" replace />
              )
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/page" replace />} />

        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;