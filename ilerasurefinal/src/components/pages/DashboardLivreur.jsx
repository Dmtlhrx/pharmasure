import React, { useState } from "react";

const DashboardLivreur = () => {
  const [commandes, setCommandes] = useState([
    { nomClient: "Jean Dupont", localisation: "Cotonou", prix: 5000, status: "Non livré" },
    { nomClient: "Alice Kouassi", localisation: "Porto-Novo", prix: 7000, status: "Livré" },
    { nomClient: "Paul Bako", localisation: "Abomey", prix: 3000, status: "Non livré" },
    { nomClient: "Jean Dupont", localisation: "Cotonou", prix: 5000, status: "Livré" },
    { nomClient: "Alice Kouassi", localisation: "Porto-Novo", prix: 7000, status: "Livré" },
    { nomClient: "Paul Bako", localisation: "Abomey", prix: 3000, status: "Non livré" },
  ]);

  const toggleStatus = (index) => {
    const updatedCommandes = [...commandes];
    updatedCommandes[index].status =
      updatedCommandes[index].status === "Livré" ? "Non livré" : "Livré";
    setCommandes(updatedCommandes);
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
        Mes Commandes
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {commandes.map((commande, index) => (
          <div
            key={index}
            className="border rounded shadow-md p-4 flex flex-col justify-between"
          >
            <div>
              <p className="font-bold">Client: {commande.nomClient}</p>
              <p>Localisation: {commande.localisation}</p>
              <p>Prix: {commande.prix} FCFA</p>
              <p>Status: {commande.status}</p>
            </div>
            <button
              onClick={() => toggleStatus(index)}
              className={`mt-4 px-4 py-2 rounded text-white w-full sm:w-auto ${
                commande.status === "Livré"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {commande.status === "Livré" ? "Non Livré" : "Livré"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardLivreur;
