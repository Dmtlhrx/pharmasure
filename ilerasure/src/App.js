import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderSection from "./components/Header";
import Home from "./components/pages/home";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import PharmacyDashboard from "./components/pages/PharmacyDashboard";
import DoctorDashboard from "./components/pages/DoctorDashboard";
import DashboardUser from "./components/pages/DashboardUser";

function App() {
  return (
    <Router>
      <div className="App">
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/PharmacyDashboard" element={<PharmacyDashboard />} />
          <Route path="/DoctorDashboard" element={<DoctorDashboard />} />
          <Route path="/DashboardUser" element={<DashboardUser />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
