import React from 'react';
import { Home, User, Briefcase, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom'; // Assurez-vous d'avoir react-router-dom installé pour la navigation

const Navigation = () => {
  return (
    <div className="flex justify-center space-x-4 p-6">
      {/* Button for Dashboard Pharmacie */}
      <Link to="/dashboard-pharmacie">
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center">
          <Briefcase className="mr-2" /> Dashboard Pharmacie
        </button>
      </Link>

      {/* Button for User Dashboard */}
      <Link to="/user-dashboard">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center">
          <User className="mr-2" /> Dashboard Utilisateur
        </button>
      </Link>

      {/* Button for Doctor Dashboard */}
      <Link to="/doctor-dashboard">
        <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 flex items-center">
          <Home className="mr-2" /> Dashboard Docteur
        </button>
      </Link>
    </div>
  );
};

export default Navigation;
