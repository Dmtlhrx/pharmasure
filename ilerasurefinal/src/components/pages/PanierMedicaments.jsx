import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Pour la navigation

const PanierMedicaments = () => {
  const navigate = useNavigate(); // Hook pour la navigation

  const [panier, setPanier] = useState([
    { id: 1, nom: "Paracétamol", prix: 500, selectionne: true },
    { id: 2, nom: "Amoxicilline", prix: 950, selectionne: true },
    { id: 3, nom: "Ibuprofène", prix: 700, selectionne: true },
    { id: 4, nom: "Ceftriaxone", prix: 1200, selectionne: true },
  ]);

  const toggleSelection = (id) => {
    setPanier(
      panier.map((item) =>
        item.id === id ? { ...item, selectionne: !item.selectionne } : item
      )
    );
  };

  const total = panier.reduce(
    (sum, item) => (item.selectionne ? sum + item.prix : sum),
    0
  );

  const handleValidation = () => {
    alert("Redirection vers une plateforme de paiement en ligne");
    // Ajouter la logique de redirection vers Celtiis Cash ou autre
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
        Votre panier de médicaments
      </h1>
      <div className="space-y-4">
        {panier.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center p-4 border rounded shadow-md"
          >
            <div>
              <p className="font-medium">{item.nom}</p>
              <p className="text-green-700 font-bold">Prix: {item.prix} FCFA</p>
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={item.selectionne}
                  onChange={() => toggleSelection(item.id)}
                  className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span>Ajouter/Retirer</span>
              </label>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t pt-4">
        <p className="text-lg font-semibold text-green-700">
          Total: {total} FCFA
        </p>
        <button
            onClick={() => navigate('/PaniMedicaments')}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full"
        >
          Valider le panier
        </button>
      </div>
    </div>
  );
};

export default PanierMedicaments;
