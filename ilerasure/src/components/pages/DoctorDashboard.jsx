import React, { useState } from 'react';
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

const mockPatients = [
  { id: 1, nom: 'Jean Dupont', age: 45, derniereVisite: '2024-01-15', telephone: '0601020304', email: 'jean.dupont@email.com' },
  { id: 2, nom: 'Marie Martin', age: 32, derniereVisite: '2024-02-20', telephone: '0612345678', email: 'marie.martin@email.com' }
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
  const [activeSection, setActiveSection] = useState('dashboard');
  const [rendezvous, setRendezvous] = useState(mockRendezvous);
  const [patients, setPatients] = useState(mockPatients);
  const [disponibilites, setDisponibilites] = useState([
    { jour: 'Lundi', heures: ['09:00', '10:30', '14:00'] },
    { jour: 'Mercredi', heures: ['11:00', '15:30'] }
  ]);
  const [selectedRendezvous, setSelectedRendezvous] = useState(null);
  const [nouvelleDisponibilite, setNouvelleDisponibilite] = useState({ jour: '', heures: '' });

  const ajouterDisponibilite = () => {
    if (nouvelleDisponibilite.jour && nouvelleDisponibilite.heures) {
      const heuresArray = nouvelleDisponibilite.heures.split(',').map(h => h.trim());
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
    const updatedRendezvous = rendezvous.map(rv => 
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
          </div>
        </div>
      ))}
    </div>
  );

  const renderGestionRendezvous = (rv) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl w-96">
          <h2 className="text-xl font-bold mb-4 text-green-600">Gestion Rendez-vous</h2>
          <div className="mb-4">
            <p><strong>Patient:</strong> {rv.patient}</p>
            <p><strong>Date:</strong> {rv.date}</p>
            <p><strong>Heure:</strong> {rv.heure}</p>
            <p><strong>Motif:</strong> {rv.motif}</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => gererRendezvous(rv.id, 'confirmé')}
              className="flex-1 bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              <CheckCircle className="inline mr-2"/> Confirmer
            </button>
            <button 
              onClick={() => {
                const nouvelleDate = prompt('Entrez une nouvelle date (AAAA-MM-JJ)');
                if (nouvelleDate) {
                  gererRendezvous(rv.id, 'reporté', nouvelleDate);
                }
              }}
              className="flex-1 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
            >
              <Clock className="inline mr-2"/> Reporter
            </button>
            <button 
              onClick={() => gererRendezvous(rv.id, 'annulé')}
              className="flex-1 bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              <XCircle className="inline mr-2"/> Annuler
            </button>
          </div>
          <button 
            onClick={() => setSelectedRendezvous(null)}
            className="mt-4 w-full bg-gray-200 p-2 rounded hover:bg-gray-300"
          >
            Fermer
          </button>
        </div>
      </div>
    );
  };

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
      <div className="w-64 bg-green-700 text-white p-6">
        <h1 className="text-2xl font-bold mb-10">Dr. Santé</h1>
        <nav className="space-y-4">
          <button 
            onClick={() => setActiveSection('dashboard')}
            className={`flex items-center w-full p-3 rounded ${activeSection === 'dashboard' ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            <Home className="mr-3"/> Tableau de Bord
          </button>
          <button 
            onClick={() => setActiveSection('disponibilites')}
            className={`flex items-center w-full p-3 rounded ${activeSection === 'disponibilites' ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            <Calendar className="mr-3"/> Disponibilités
          </button>
          <button 
            onClick={() => setActiveSection('patients')}
            className={`flex items-center w-full p-3 rounded ${activeSection === 'patients' ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            <Users className="mr-3"/> Patients
          </button>
          <button 
            onClick={() => setActiveSection('rendezvous')}
            className={`flex items-center w-full p-3 rounded ${activeSection === 'rendezvous' ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            <CheckCircle className="mr-3"/> Rendez-vous
          </button>
          <button 
            onClick={() => setActiveSection('settings')}
            className={`flex items-center w-full p-3 rounded ${activeSection === 'settings' ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            <Settings className="mr-3"/> Paramètres
          </button>
          <button 
            className="flex items-center w-full p-3 rounded hover:bg-green-600 mt-10"
          >
            <LogOut className="mr-3"/> Déconnexion
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          {activeSection === 'dashboard' && 'Tableau de Bord'}
          {activeSection === 'disponibilites' && 'Mes Disponibilités'}
          {activeSection === 'patients' && 'Mes Patients'}
          {activeSection === 'rendezvous' && 'Gestion des Rendez-vous'}
          {activeSection === 'settings' && 'Paramètres'}
        </h1>
        
        {activeSection === 'dashboard' && (
          <div className="grid grid-cols-2 gap-6">
            {renderListeRendezvous()}
            {renderDisponibilites()}
          </div>
        )}
        
        {activeSection === 'disponibilites' && renderDisponibilites()}
        {activeSection === 'patients' && renderPatients()}
        {activeSection === 'rendezvous' && renderListeRendezvous()}
        
        {selectedRendezvous && renderGestionRendezvous(selectedRendezvous)}
      </div>
    </div>
  );
};

export default DoctorDashboard;