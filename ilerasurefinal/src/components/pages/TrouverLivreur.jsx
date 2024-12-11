import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const deliverers = [
  { id: 1, name: 'Jean Dupont', hours: '8h - 18h', zone: 'Cotonou' },
  { id: 2, name: 'Marie Martin', hours: '10h - 17h', zone: 'Porto-Novo' },
  { id: 3, name: 'Paul Koffi', hours: '9h - 20h', zone: 'Parakou' },
  { id: 4, name: 'Sophie Dossou', hours: '7h - 16h', zone: 'Bohicon' },
];

const TrouverLivreur = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [selectedDeliverer, setSelectedDeliverer] = useState(null);
  const navigate = useNavigate(); // Utilisation de useNavigate

  const handleSelect = (name) => {
    setSelectedDeliverer(name);
    setShowAlert(true);
  };

  const confirmSelection = () => {
    setShowAlert(false);
    navigate('/PanierMedicaments'); // Redirection vers la page désirée
  };

  const cancelSelection = () => {
    setShowAlert(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-600">Trouver mon livreur</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deliverers.map((deliverer) => (
          <div
            key={deliverer.id}
            className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-500"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{deliverer.name}</h2>
            <p className="text-gray-700 mb-2">
              <strong>Heures de disponibilité:</strong> {deliverer.hours}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Zone d'intervention:</strong> {deliverer.zone}
            </p>
            <button
              onClick={() => handleSelect(deliverer.name)}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
            >
              Choisir
            </button>
          </div>
        ))}
      </div>

      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800">Confirmation</h2>
            <p className="text-gray-700">Êtes-vous sûr(e) de vouloir choisir {selectedDeliverer} ?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={cancelSelection}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Annuler
              </button>
              <button
                onClick={confirmSelection}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrouverLivreur;
