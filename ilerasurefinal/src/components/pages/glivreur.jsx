import React, { useState } from "react";

const LivreursCRUD = () => {
  const [livreurs, setLivreurs] = useState([]);
  const [formData, setFormData] = useState({ nom: "", heure: "", zone: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOrUpdate = () => {
    if (editingIndex !== null) {
      const updatedLivreurs = [...livreurs];
      updatedLivreurs[editingIndex] = formData;
      setLivreurs(updatedLivreurs);
    } else {
      setLivreurs([...livreurs, formData]);
    }
    setFormData({ nom: "", heure: "", zone: "" });
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    setFormData(livreurs[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedLivreurs = livreurs.filter((_, i) => i !== index);
    setLivreurs(updatedLivreurs);
  };

  const handleChoose = (livreur) => {
    alert(`Vous avez choisi ${livreur.nom}`);
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
        Gestion des Livreurs
      </h1>

      <div className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={formData.nom}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="heure"
            placeholder="Heure de disponibilité"
            value={formData.heure}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="zone"
            placeholder="Zone"
            value={formData.zone}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={handleAddOrUpdate}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {editingIndex !== null ? "Modifier" : "Ajouter"}
        </button>
      </div>

      <div className="space-y-4">
        {livreurs.map((livreur, index) => (
          <div
            key={index}
            className="border rounded shadow-md p-4 flex flex-col sm:flex-row justify-between items-center"
          >
            <div className="text-center sm:text-left">
              <p className="font-bold">Nom: {livreur.nom}</p>
              <p>Heure: {livreur.heure}</p>
              <p>Zone: {livreur.zone}</p>
            </div>
            <div className="flex space-x-2 mt-4 sm:mt-0">
              <button
                onClick={() => handleChoose(livreur)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Me choisir
              </button>
              <button
                onClick={() => handleEdit(index)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LivreursCRUD;