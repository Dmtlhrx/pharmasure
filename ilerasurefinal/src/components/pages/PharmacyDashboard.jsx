import React, { useState } from 'react';
import { 
  Package, 
  MessageCircle, 
  CheckCircle, 
  AlertCircle,
  Home,
  Settings,
  LogOut,
  X,
  PlusCircle
} from 'lucide-react';

const mockDemandes = [
  { 
    id: 1, 
    medicament: 'Doliprane', 
    quantite: 2, 
    statut: 'en attente', 
    client: 'Marie Dupont' 
  },
  { 
    id: 2, 
    medicament: 'Aspirine', 
    quantite: 1, 
    statut: 'en attente', 
    client: 'Jean Martin' 
  }
];

// (Tous les imports et states précédents restent identiques)

const PharmacyDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [demandesMedicaments, setDemandesMedicaments] = useState(mockDemandes);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [disponibiliteModal, setDisponibiliteModal] = useState(null);
  const [indisponibiliteModal, setIndisponibiliteModal] = useState(null);
  const [prix, setPrix] = useState('');
  const [alternativesSelectionnees, setAlternativesSelectionnees] = useState([]);

  const ouvrirModalDisponibilite = (demande) => {
    setSelectedDemande(demande);
    setDisponibiliteModal(true);
    setPrix('');
  };

  const mockAlternatives = ["Alternative1", "Alternative2"];


  const confirmerDisponibilite = () => {
    if (!prix || prix <= 0) {
      alert('Veuillez entrer un prix valide');
      return;
    }

    const updatedDemandes = demandesMedicaments.map(d => 
      d.id === selectedDemande.id 
        ? { ...d, statut: 'validé', prix: parseFloat(prix) } 
        : d
    );
    setDemandesMedicaments(updatedDemandes);
    setDisponibiliteModal(false);
    setSelectedDemande(null);
    setPrix('');
  };

  const ouvrirModalIndisponibilite = (demande) => {
    setSelectedDemande(demande);
    setIndisponibiliteModal(true);
    setAlternativesSelectionnees([]);
  };

  const toggleAlternative = (alternative) => {
    setAlternativesSelectionnees(prev => 
      prev.includes(alternative)
        ? prev.filter(alt => alt !== alternative)
        : [...prev, alternative]
    );
  };

  const confirmerIndisponibilite = () => {
    const updatedDemandes = demandesMedicaments.map(d => 
      d.id === selectedDemande.id 
        ? { 
            ...d, 
            statut: 'indisponible', 
            alternatives: alternativesSelectionnees.map(alt => alt.nom)
          } 
        : d
    );
    setDemandesMedicaments(updatedDemandes);
    setIndisponibiliteModal(false);
    setSelectedDemande(null);
    setAlternativesSelectionnees([]);
  };

  const renderModalDisponibilite = () => {
    if (!disponibiliteModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-96 p-6 relative">
          <button 
            onClick={() => setDisponibiliteModal(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X />
          </button>
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Confirmer la Disponibilité
          </h2>
          <div className="mb-4">
            <p><strong>Médicament :</strong> {selectedDemande.medicament}</p>
            <p><strong>Quantité :</strong> {selectedDemande.quantite}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prix (€)
            </label>
            <input 
              type="number" 
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              className="w-full border rounded p-2 focus:ring-2 focus:ring-green-500"
              placeholder="Entrez le prix"
            />
          </div>
          <button 
            onClick={confirmerDisponibilite}
            className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition"
          >
            <CheckCircle className="inline mr-2"/> Confirmer
          </button>
        </div>
      </div>
    );
  };

  const renderModalIndisponibilite = () => {
    if (!indisponibiliteModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-96 p-6 relative">
          <button 
            onClick={() => setIndisponibiliteModal(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X />
          </button>
          <h2 className="text-2xl font-bold text-yellow-600 mb-4">
            Médicament Indisponible
          </h2>
          <div className="mb-4">
            <p><strong>Médicament :</strong> {selectedDemande.medicament}</p>
            <p><strong>Quantité :</strong> {selectedDemande.quantite}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">
              Alternatives disponibles
            </h3>
            {mockAlternatives.map((alternative) => (
              <div 
                key={alternative.id}
                className={`flex items-center justify-between p-2 border rounded mb-2 cursor-pointer ${
                  alternativesSelectionnees.includes(alternative) 
                    ? 'bg-green-100 border-green-500' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => toggleAlternative(alternative)}
              >
                <div>
                  <p className="font-medium">{alternative.nom}</p>
                  <p className="text-sm text-gray-500">{alternative.dosage}</p>
                </div>
                {alternativesSelectionnees.includes(alternative) ? (
                  <CheckCircle className="text-green-600" size={20} />
                ) : (
                  <PlusCircle className="text-gray-400" size={20} />
                )}
              </div>
            ))}
          </div>
          <button 
            onClick={confirmerIndisponibilite}
            className="w-full bg-yellow-500 text-white p-3 rounded hover:bg-yellow-600 transition"
          >
            <AlertCircle className="inline mr-2"/> Confirmer Indisponibilité
          </button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold mb-4 flex items-center text-green-600">
                <Package className="mr-2" /> Demandes de Médicaments
              </h2>
              {demandesMedicaments.map((demande) => (
                <div
                  key={demande.id}
                  className="mb-3 p-2 bg-green-50 rounded flex flex-col md:flex-row justify-between items-start md:items-center"
                >
                  <div className="mb-2 md:mb-0">
                    <p className="font-semibold">{demande.medicament}</p>
                    <p className="text-sm text-gray-600">
                      Quantité : {demande.quantite} | Client : {demande.client}
                    </p>
                    {demande.statut === 'validé' && (
                      <p className="text-green-600 font-semibold">
                        {demande.prix}€ - Validé
                      </p>
                    )}
                    {demande.statut === 'indisponible' && (
                      <div className="text-yellow-600">
                        <p>Indisponible</p>
                        {demande.alternatives && (
                          <p>Alternatives : {demande.alternatives.join(', ')}</p>
                        )}
                      </div>
                    )}
                  </div>
                  {demande.statut === 'en attente' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => ouvrirModalDisponibilite(demande)}
                        className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                      >
                        <CheckCircle className="inline-block mr-1 w-4 h-4" />
                        Disponible
                      </button>
                      <button
                        onClick={() => ouvrirModalIndisponibilite(demande)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                      >
                        <AlertCircle className="inline-block mr-1 w-4 h-4" />
                        Indisponible
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
  
            {/* Placeholder for future communication section */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold mb-4 flex items-center text-green-600">
                <MessageCircle className="mr-2" /> Communications
              </h2>
              <p className="text-gray-500 text-center">
                Aucune conversation active
              </p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Paramètres</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Notifications
                </label>
                <input type="checkbox" className="mr-2" /> Activer les
                notifications
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input type="checkbox" className="mr-2" /> Alertes de stock bas
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  // Conserver toutes les fonctions précédentes comme ouvrirModalDisponibilite, etc.

  return (
    <div className="relative bg-green-50 min-h-screen">
      {/* Sidebar Desktop */}
      <div className="hidden md:block w-64 bg-green-700 text-white p-6 fixed left-0 top-0 h-full">
        <h1 className="text-2xl font-bold mb-10">Pharmacie Verte</h1>
        <nav className="space-y-4">
          <button 
            onClick={() => setActiveSection('dashboard')}
            className={`flex items-center w-full p-3 rounded ${activeSection === 'dashboard' ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            <Home className="mr-3"/> Tableau de Bord
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

      {/* Contenu Principal avec Padding pour Desktop */}
      <div className="md:ml-64 p-6">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          {activeSection === 'dashboard' ? 'Tableau de Bord' : 'Paramètres'}
        </h1>
        {renderContent()}
        
        {renderModalDisponibilite()}
        {renderModalIndisponibilite()}
      </div>

      {/* Footer Mobile - Icônes seules */}
     <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-white border-t shadow-lg">
  <div className="flex justify-around">
    {/* Dashboard Button */}
    <button 
      onClick={() => setActiveSection('dashboard')}
      className={`
        flex flex-col items-center p-2 
        ${activeSection === 'dashboard' 
          ? 'text-green-600' 
          : 'text-gray-500'}
        transform transition-all duration-300 
        hover:scale-110 hover:text-green-700
      `}
    >
      <Home className="text-current" />
    </button>

    {/* Settings Button */}
    <button 
      onClick={() => setActiveSection('settings')}
      className={`
        p-2 rounded-full 
        ${activeSection === 'settings' 
          ? 'text-green-600' 
          : 'text-gray-500'}
        transform transition-all duration-300 
        hover:scale-110 hover:text-green-700
      `}
    >
      <Settings className="text-current" />
    </button>

    {/* Logout Button */}
    <button 
      className={`
        p-2 rounded-full 
        text-gray-500 
        transform transition-all duration-300 
        hover:bg-green-600 hover:text-white
      `}
    >
      <LogOut className="text-current" />
    </button>
  </div>
</div>

    </div>
  );
};

export default PharmacyDashboard;