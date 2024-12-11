import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderSection from "./components/Header";
import Home from "./components/pages/home";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import Navigation from "./components/pages/Navigation";
import PharmacyDashboard from "./components/pages/PharmacyDashboard";
import DoctorDashboard from "./components/pages/DoctorDashboard";
import DashboardUser from "./components/pages/DashboardUser";
import TrouverLivreur from "./components/pages/TrouverLivreur";
import PrescriptionApp from "./components/pages/PrescriptionApp";
import PanierMedicaments from "./components/pages/PanierMedicaments";
import PaniMedicaments from "./components/pages/paniermedc";

import LivreursCRUD from "./components/pages/glivreur";
import DashboardLivreur from "./components/pages/DashboardLivreur";

import '../src/App.css';  // Assurez-vous que ce fichier contient les directives de Tailwind


function App() {
  return (
    <Router>
      <div className="App">
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Navigation" element={<Navigation />} />
          <Route path="/PrescriptionApp" element={<PrescriptionApp />} />
          <Route path="/DashboardLivreur" element={<DashboardLivreur />} />
          <Route path="/TrouverLivreur" element={<TrouverLivreur />} />
          <Route path="/glivreur" element={<LivreursCRUD />} />
          <Route path="/PanierMedicaments" element={<PanierMedicaments />} />
          <Route path="/PaniMedicaments" element={<PaniMedicaments />} />

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