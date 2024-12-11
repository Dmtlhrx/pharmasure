import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Calendar,
  Users,
  CheckCircle,
  Clock,
  Plus,
  Edit,
  Trash2,
  Home,
  Settings,
  LogOut,
  XCircle,
  Phone,
  Mail
} from 'lucide-react';

//const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


const menuItems = [
  {
    name: 'Tableau de Bord',
    icon: <Home size={24} />,
    section: 'dashboard'
  },
  {
    name: 'Disponibilités',
    icon: <Calendar size={24} />,
    section: 'disponibilites'
  },
  {
    name: 'Patients',
    icon: <Users size={24} />,
    section: 'patients'
  },
  {
    name: 'Rendez-vous',
    icon: <Clock size={24} />,
    section: 'rendezvous'
  },
  {
    name: 'Paramètres',
    icon: <Settings size={24} />,
    section: 'settings'
  }
];

const mockPatients = [
  {
    id: 1,
    nom: 'Jean Dupont',
    age: 45,
    derniereVisite: '2024-01-15',
    telephone: '0601020304',
    email: 'jean.dupont@email.com'
  },
  {
    id: 2,
    nom: 'Marie Martin',
    age: 32,
    derniereVisite: '2024-02-20',
    telephone: '0612345678',
    email: 'marie.martin@email.com'
  }
];

const mockRendezvous = [
  {
    id: 1,
    patient: 'Jean Dupont',
    date: '2024-06-15',
    heure: '10:00',
    statut: 'en attente',
    motif: 'Consultation générale'
  },
  {
    id: 2,
    patient: 'Marie Martin',
    date: '2024-06-16',
    heure: '14:30',
    statut: 'confirmé',
    motif: 'Suivi médical'
  }
];


const DoctorDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [rendezvous, setRendezvous] = useState(mockRendezvous);
  const [patients, setPatients] = useState(mockPatients);
  const [disponibilites, setDisponibilites] = useState([
    { jour: 'Lundi', heures: ['09:00', '10:30', '14:00'] },
    { jour: 'Mercredi', heures: ['11:00', '15:30'] }
  ]);
  const [selectedRendezvous, setSelectedRendezvous] = useState(null);
  const [nouvelleDisponibilite, setNouvelleDisponibilite] = useState({
    jour: '',
    heures: ''
  });

  const ajouterDisponibilite = () => {
    if (nouvelleDisponibilite.jour && nouvelleDisponibilite.heures) {
      const heuresArray = nouvelleDisponibilite.heures
        .split(',')
        .map((h) => h.trim());
      setDisponibilites([
        ...disponibilites,
        { jour: nouvelleDisponibilite.jour, heures: heuresArray }
      ]);
      setNouvelleDisponibilite({ jour: '', heures: '' });
    }
  };

  const supprimerDisponibilite = (index) => {
    const newDisponibilites = [...disponibilites];
    newDisponibilites.splice(index, 1);
    setDisponibilites(newDisponibilites);
  };

  const gererRendezvous = (id, action, nouvelleDate = null) => {
    const updatedRendezvous = rendezvous.map((rv) =>
      rv.id === id
        ? {
            ...rv,
            statut: action,
            ...(nouvelleDate && { date: nouvelleDate })
          }
        : rv
    );
    setRendezvous(updatedRendezvous);
    setSelectedRendezvous(null);
  };

  const renderDisponibilites = () => (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4 flex items-center text-green-600">
        <Calendar className="mr-2"/> Mes Disponibilités
      </h2>
      {disponibilites.map((dispo, index) => (
        <div key={index} className="mb-3 p-2 bg-green-50 rounded flex justify-between items-center">
          <div>
            <p className="font-semibold">{dispo.jour}</p>
            <div className="flex space-x-2">
              {dispo.heures.map((heure, idx) => (
                <span key={idx} className="bg-green-100 px-2 py-1 rounded text-sm">
                  {heure}
                </span>
              ))}
            </div>
          </div>
          <button 
            onClick={() => supprimerDisponibilite(index)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 />
          </button>
        </div>
      ))}
      <div className="mt-4 flex space-x-2">
        <input 
          type="text" 
          placeholder="Jour"
          value={nouvelleDisponibilite.jour}
          onChange={(e) => setNouvelleDisponibilite({...nouvelleDisponibilite, jour: e.target.value})}
          className="border p-2 rounded w-1/3"
        />
        <input 
          type="text" 
          placeholder="Heures (séparées par des virgules)"
          value={nouvelleDisponibilite.heures}
          onChange={(e) => setNouvelleDisponibilite({...nouvelleDisponibilite, heures: e.target.value})}
          className="border p-2 rounded w-1/2"
        />
        <button 
          onClick={ajouterDisponibilite}
          className="bg-green-500 text-white p-2 rounded flex items-center"
        >
          <Plus className="mr-2"/> Ajouter
        </button>
      </div>
    </div>
  );

  const renderPatients = () => (
    <div className="bg-white rounded-lg shadow-md p-4">
    <h2 className="text-xl font-bold mb-4 flex items-center text-green-600">
      <Users className="mr-2"/> Mes Patients
    </h2>
    {patients.map((patient) => (
      <div key={patient.id} className="mb-3 p-2 bg-green-50 rounded">
        <div className="flex justify-between">
          <div>
            <p className="font-semibold">{patient.nom}</p>
            <p className="text-sm text-gray-600">Âge : {patient.age}</p>
            <p className="text-sm text-gray-600">Dernière visite : {patient.derniereVisite}</p>
          </div>
          <div className="text-right">
            <p className="text-sm"><Phone className="inline mr-1 text-green-600" size={16}/>{patient.telephone}</p>
            <p className="text-sm"><Mail className="inline mr-1 text-green-600" size={16}/>{patient.email}</p>
          </div>
          <Link to="/PrescriptionApp" className="w-full md:w-auto">
        <button className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 flex items-center justify-center">
          <Home className="mr-2" />
       Prescrit médicaments
        </button> </Link>
        </div>
      </div>
    ))}
  </div>
  );

  const renderGestionRendezvous = (rendezvous) => (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-xl font-bold text-green-600 mb-3">Gérer le rendez-vous</h3>
      <p>Patient : {rendezvous.patient}</p>
      <p>Date : {rendezvous.date} à {rendezvous.heure}</p>
      <p>Statut actuel : {rendezvous.statut}</p>
      <button
        onClick={() => gererRendezvous(rendezvous.id, 'confirmé')}
        className="bg-green-500 text-white px-3 py-2 rounded mt-2"
      >
        Confirmer
      </button>
      <button
        onClick={() => gererRendezvous(rendezvous.id, 'annulé')}
        className="bg-red-500 text-white px-3 py-2 rounded mt-2 ml-2"
      >
        Annuler
      </button>
    </div>
  );
  

  const renderListeRendezvous = () => (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4 flex items-center text-green-600">
        <CheckCircle className="mr-2"/> Rendez-vous
      </h2>
      {rendezvous.map((rv) => (
        <div 
          key={rv.id} 
          className={`mb-3 p-2 rounded flex justify-between items-center ${
            rv.statut === 'en attente' ? 'bg-yellow-50' : 
            rv.statut === 'confirmé' ? 'bg-green-50' : 
            rv.statut === 'reporté' ? 'bg-blue-50' : 'bg-red-50'
          }`}
        >
          <div>
            <p className="font-semibold">{rv.patient}</p>
            <p className="text-sm text-gray-600">{rv.date} à {rv.heure}</p>
            <p className="text-sm text-gray-500">Statut : {rv.statut}</p>
          </div>
          <button 
            onClick={() => setSelectedRendezvous(rv)}
            className="bg-green-500 text-white px-2 py-1 rounded text-sm"
          >
            Gérer
          </button>
        </div>
      ))}
    </div>
    
  );

  return (
    <div className="flex bg-green-50 min-h-screen">
       {/* Sidebar */}
    
       <div className="hidden md:block w-64 h-screen bg-white shadow-lg fixed left-0 top-0">
        <div className="p-5 text-center border-b">
          <h2 className="text-2xl font-bold text-green-600">Dr. Santé</h2>
        </div>
        <nav className="mt-10">
          {menuItems.map((item) => (
            <button
              key={item.section}
              onClick={() => setActiveSection(item.section)}
              className={`
                flex items-center w-full p-3 
                ${activeSection === item.section 
                  ? 'bg-green-600 text-white' 
                  : 'hover:bg-green-100 text-gray-700'}
                transition-all duration-200
              `}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </button>
          ))}
          <button 
            className="flex items-center w-full p-3 mt-5 hover:bg-red-100 text-red-600"
          >
            <LogOut size={24} />
            <span className="ml-3">Déconnexion</span>
          </button>
        </nav>
      </div>

      {/* Mobile Footer */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-white border-t shadow-lg">
        <div className="flex justify-around py-3">
          {menuItems.map((item) => (
            <button
              key={item.section}
              onClick={() => {
                setActiveSection(item.section);
                setIsMobileMenuOpen(false);
              }}
              className={`
                flex flex-col items-center 
                ${activeSection === item.section 
                  ? 'text-green-600' 
                  : 'text-gray-500'}
                transform transition-all duration-300 
                hover:scale-110 hover:text-green-700
              `}
            >
              {item.icon}
            </button>
          ))}
          <button 
            onClick={() => {/* Logique de déconnexion */}}
            className="flex flex-col items-center text-red-500 hover:text-red-700 transform transition-all duration-300 hover:scale-110"
          >
            <LogOut size={24} />
          </button>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="ml-0 md:ml-64 flex-1 p-6">
        {activeSection === 'dashboard' && <h1>Bienvenue dans le tableau de bord</h1>}
        {activeSection === 'disponibilites' && renderDisponibilites()}
        {activeSection === 'patients' && renderPatients()}
        {activeSection === 'rendezvous' && renderListeRendezvous()}
        {selectedRendezvous && renderGestionRendezvous(selectedRendezvous)}
      </main>
    </div>
  );
};

export default DoctorDashboard;
