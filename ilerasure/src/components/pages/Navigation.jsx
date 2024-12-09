import React from 'react';
import { Home, User, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 p-6">
      {/* Button for Dashboard Pharmacie */}
      <Link to="/PharmacyDashboard" className="w-full md:w-auto">
        <button className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center justify-center">
          <Briefcase className="mr-2" />
          Dashboard Pharmacie
        </button>
      </Link>

      {/* Button for User Dashboard */}
      <Link to="/DashboardUser" className="w-full md:w-auto">
        <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center">
          <User className="mr-2" />
          Dashboard Utilisateur
        </button>
      </Link>

      {/* Button for Doctor Dashboard */}
      <Link to="/DoctorDashboard" className="w-full md:w-auto">
        <button className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 flex items-center justify-center">
          <Home className="mr-2" />
          Dashboard Docteur
        </button>
      </Link>
    </div>
  );
};

export default Navigation;
