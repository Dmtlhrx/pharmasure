import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Truck, 
  CreditCard, 
  MapPin, 
  Trash2, 
  Package,
  Check
} from 'lucide-react';

const PaniMedicaments = () => {
  const [medicaments, setMedicaments] = useState([
    { 
      id: 1, 
      nom: 'Doliprane', 
      dosage: '500mg', 
      quantite: 2, 
      prix: 5.50 
    },
    { 
      id: 2, 
      nom: 'Ibuprofène', 
      dosage: '200mg', 
      quantite: 1, 
      prix: 4.20 
    }
  ]);

  const [livreurs, setLivreurs] = useState([
    { 
      id: 1, 
      nom: 'Pharma Express', 
      delai: '2-3 heures', 
      frais: 3.50,
      disponible: true 
    },
    { 
      id: 2, 
      nom: 'Livraison Santé', 
      delai: '1 jour', 
      frais: 2.00,
      disponible: true 
    }
  ]);

  const [selectedLivreur, setSelectedLivreur] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const calculerTotal = () => {
    const sousTotal = medicaments.reduce((total, med) => total + (med.prix * med.quantite), 0);
    return selectedLivreur 
      ? (sousTotal + selectedLivreur.frais).toFixed(2) 
      : sousTotal.toFixed(2);
  };

  const supprimerMedicament = (id) => {
    setMedicaments(medicaments.filter(med => med.id !== id));
  };

  const selectionnerLivreur = (livreur) => {
    setSelectedLivreur(livreur);
    setShowConfirmation(true);

    // Masquer automatiquement la confirmation après 3 secondes
    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  const handlePaiement = () => {
    // Redirection vers une page de paiement sécurisée
    window.location.href = '/paiement-securise';
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center space-x-3 text-teal-600">
            <ShoppingCart size={32} />
            <h2 className="text-2xl font-semibold text-teal-800">Mon Panier</h2>
          </div>
          <span className="text-gray-500">{medicaments.length} Article(s)</span>
        </div>

        {/* Liste des Médicaments */}
        <div className="space-y-4">
          {medicaments.map((med) => (
            <div 
              key={med.id} 
              className="flex items-center justify-between bg-gray-100 p-4 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <Package className="text-teal-500" />
                <div>
                  <p className="font-semibold">{med.nom}</p>
                  <p className="text-sm text-gray-500">{med.dosage}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-bold">{med.quantite} x {med.prix}€</span>
                <button 
                  onClick={() => supprimerMedicament(med.id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sélection Livreur */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-teal-600">
            <Truck size={24} />
            <h3 className="font-semibold text-teal-800">Choisir un Livreur</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {livreurs.map((livreur) => (
              <div 
                key={livreur.id}
                onClick={() => selectionnerLivreur(livreur)}
                className={`border-2 p-4 rounded-lg cursor-pointer transition-all 
                  ${selectedLivreur?.id === livreur.id 
                    ? 'border-teal-500 bg-teal-50' 
                    : 'border-gray-200 hover:border-teal-300'}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{livreur.nom}</h4>
                    <p className="text-sm text-gray-500">
                      <MapPin size={16} className="inline mr-1" />
                      Délai: {livreur.delai}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-teal-700">
                      {livreur.frais}€
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confirmation Élégante */}
        {showConfirmation && selectedLivreur && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <Check size={48} className="text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-teal-800 mb-2">
                Livraison Confirmée
              </h3>
              <p className="text-gray-600 mb-4">
                Vous avez sélectionné {selectedLivreur.nom}
              </p>
              <p className="text-sm text-gray-500">
                Délai estimé: {selectedLivreur.delai}
              </p>
            </div>
          </div>
        )}

        {/* Résumé et Paiement */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <span>Sous-total</span>
            <span>{calculerTotal()}€</span>
          </div>
          {selectedLivreur && (
            <div className="flex justify-between mb-2 text-teal-700">
              <span>Frais de livraison</span>
              <span>+ {selectedLivreur.frais}€</span>
            </div>
          )}
          <div className="border-t pt-2 flex justify-between font-bold">
            <span>Total</span>
            <span>{calculerTotal()}€</span>
          </div>
        </div>

        <button
          onClick={handlePaiement}
          disabled={!selectedLivreur}
          className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 transition-all ${
            selectedLivreur 
              ? 'bg-teal-500 text-white hover:bg-teal-600' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <CreditCard size={20} />
          <span>Procéder au Paiement</span>
        </button>
      </div>
    </div>
  );
};

export default PaniMedicaments;