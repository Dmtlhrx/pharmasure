import React, { useState } from 'react';
import axios from 'axios';

const AvailabilityForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    days: '',
    hours: '',
    interventionZones: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:300/availability', formData);
      alert(response.data.message);
      setFormData({ username: '', days: '', hours: '', interventionZones: '' });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error);
      alert('Une erreur est survenue.');
    }
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '50px auto',
        backgroundColor: '#fff', // Blanc pour le fond
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        border: '2px solid #4caf50', // Vert pharmacie pour la bordure
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          color: '#4caf50', // Vert pharmacie
          marginBottom: '20px',
        }}
      >
        Enregistrer vos disponibilités et zones d'intervention
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              color: '#4caf50', // Vert pharmacie
              fontWeight: 'bold',
              marginBottom: '5px',
            }}
          >
            Nom :
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              outlineColor: '#4caf50',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              color: '#4caf50',
              fontWeight: 'bold',
              marginBottom: '5px',
            }}
          >
            Disponibilités (jours) :
          </label>
          <input
            type="text"
            name="days"
            placeholder="Ex: Lundi, Mardi, Mercredi"
            value={formData.days}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              outlineColor: '#4caf50',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              color: '#4caf50',
              fontWeight: 'bold',
              marginBottom: '5px',
            }}
          >
            Disponibilités (heures) :
          </label>
          <input
            type="text"
            name="hours"
            placeholder="Ex: 9h-12h, 14h-18h"
            value={formData.hours}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              outlineColor: '#4caf50',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              color: '#4caf50',
              fontWeight: 'bold',
              marginBottom: '5px',
            }}
          >
            Zones d'intervention :
          </label>
          <input
            type="text"
            name="interventionZones"
            placeholder="Ex: Paris, Lyon"
            value={formData.interventionZones}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              outlineColor: '#4caf50',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            backgroundColor: '#4caf50', // Vert pharmacie pour le bouton
            color: '#fff', // Blanc pour le texte
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default AvailabilityForm;
