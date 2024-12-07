import React, { useState } from 'react';
import { Home, Search, Calendar, LogOut } from 'react-feather'; // Vous pouvez importer des icônes

const DashboardUser = () => {
  const [activePage, setActivePage] = useState('medicament');
  const [medicamentName, setMedicamentName] = useState('');
  const [ordonnance, setOrdonnance] = useState(null);
  const [doctors, setDoctors] = useState([]); // Liste de médecins à récupérer depuis une API
  const [sidebarOpen, setSidebarOpen] = useState(true); // Gérer l'état du sidebar (ouvert/fermé)

  const handleMedicamentRequest = () => {
    // Logic for handling medicament request (e.g., API call)
    console.log('Demande de disponibilité pour:', medicamentName);
  };

  const handleAppointmentRequest = (doctorId) => {
    // Logic for handling appointment request (e.g., API call)
    console.log('Rendez-vous pris avec le médecin:', doctorId);
  };

  const renderMedicamentPage = () => (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Demander la Disponibilité d'un Médicament</h2>
      <form onSubmit={handleMedicamentRequest} className="space-y-4">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Nom du Médicament"
          value={medicamentName}
          onChange={(e) => setMedicamentName(e.target.value)}
        />
        <div>
          <label className="block">Scanner l'Ordonnance</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setOrdonnance(e.target.files[0])}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-green-600 text-white p-2 rounded w-full">Demander</button>
      </form>
      <div className="mt-4">
        {/* Affichage des réponses des pharmacies */}
        <p className="font-semibold">Réponses des Pharmacies :</p>
        {/* Simuler des réponses avec des données fictives */}
        <div className="space-y-2">
          <div className="border p-4 rounded">
            <p>Pharmacie 1 : Disponible, Prix: 10€, Localisation: Rue XYZ</p>
            <button className="bg-green-600 text-white p-2 rounded">Confirmer</button>
          </div>
          <div className="border p-4 rounded">
            <p>Pharmacie 2 : Indisponible</p>
            <button className="bg-red-600 text-white p-2 rounded">Contacter</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConsultationPage = () => (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Consulter les Médecins Disponibles</h2>
      <div className="space-y-4">
        {/* Liste des médecins */}
        {doctors.map((doctor) => (
          <div key={doctor.id} className="border p-4 rounded">
            <p><strong>{doctor.name}</strong> - {doctor.speciality}</p>
            <p>Disponibilité: {doctor.availability}</p>
            <button
              onClick={() => handleAppointmentRequest(doctor.id)}
              className="bg-blue-600 text-white p-2 rounded"
            >
              Prendre un Rendez-vous
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSideBar = () => (
    <div
      className={`transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64 bg-green-600 text-white h-screen p-4 fixed top-0 left-0 z-50`}
    >
      <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
      <ul>
        <li className="mb-4">
          <button
            onClick={() => setActivePage('medicament')}
            className="flex items-center space-x-2 hover:text-gray-200"
          >
            <Search />
            <span>Demander Médicament</span>
          </button>
        </li>
        <li className="mb-4">
          <button
            onClick={() => setActivePage('consultation')}
            className="flex items-center space-x-2 hover:text-gray-200"
          >
            <Calendar />
            <span>Consultation Médicale</span>
          </button>
        </li>
        <li className="mb-4">
          <button className="flex items-center space-x-2 hover:text-gray-200">
            <LogOut />
            <span>Déconnexion</span>
          </button>
        </li>
      </ul>
      <button
        onClick={() => setSidebarOpen(false)}
        className="absolute top-4 right-4 text-white"
      >
        Fermer
      </button>
    </div>
  );

  return (
    <div className="flex">
      {renderSideBar()}
      <div className={`flex-1 p-6 ${sidebarOpen ? 'ml-64' : ''}`}>
        {activePage === 'medicament' ? renderMedicamentPage() : renderConsultationPage()}
      </div>
      <button
        onClick={() => setSidebarOpen(true)}
        className={`fixed top-4 left-4 p-2 bg-green-600 text-white rounded-lg ${sidebarOpen ? 'hidden' : ''}`}
      >
        Ouvrir Sidebar
      </button>
    </div>
  );
};

export default DashboardUser;
