# ÌleraSure - Simplifiez l'accès aux médicaments au Bénin

## Description du projet

ÌleraSure est une application innovante conçue pour transformer l'accès aux médicaments au Bénin. Les utilisateurs peuvent :

- Effectuer des consultations en ligne et obtenir des ordonnances.
- Rechercher des médicaments disponibles dans les pharmacies locales.
- Passer des commandes avec options de livraison ou retrait en pharmacie.

Ce projet facilite l'accès rapide, fiable et pratique aux produits pharmaceutiques.

---

## Table des matières

1. [Prérequis](#prérequis)
2. [Structure du projet](#structure-du-projet)
3. [Frontend (React)](#frontend-react)
4. [Backend (Node.js et SQLite)](#backend-nodejs-et-sqlite)
5. [Lancer le projet](#lancer-le-projet)
6. [Charte Graphique](#charte-graphique)

---

## Prérequis

- *Node.js* (>= 14.x)
- *npm* ou *yarn*
- SQLite3

---

## Structure du projet


ÌleraSure/
|-- frontend/                # Interface utilisateur (React)
|-- backend/                 # API et logique serveur (Node.js)
|   |-- db.js                # Connexion à SQLite
|   |-- healthcare.db        # Base de données SQLite
|   |-- server.js            # Point d'entrée du backend
|   |-- package.json         # Configuration des dépendances backend
|-- README.md                # Documentation du projet


---

## Frontend (React)

### Fonctionnalités principales

1. *Inscription/Connexion* : Créer un compte ou se connecter pour accéder aux fonctionnalités.
2. *Recherche de médicaments* : Scanner une ordonnance ou rechercher un médicament.
3. *Commande* : Passer une commande, choisir entre livraison et retrait.
4. *Tableau de bord* : Visualiser l'historique et le statut des commandes.

### Installation et lancement du frontend

1. Naviguez dans le dossier frontend :
   bash
   cd frontend
   
2. Installez les dépendances :
   bash
   npm install
   
3. Lancez l'application :
   bash
   npm start
   
4. Accédez à l'application à l'adresse : [http://localhost:3000](http://localhost:3000)

### Exemple de composant : Formulaire d'inscription

jsx
import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:300/register', formData);
      alert(response.data.message);
    } catch (error) {
      alert('Erreur lors de l\'inscription.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Nom" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} required />
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default RegisterForm;


---

## Backend (Node.js et SQLite)

### Fonctionnalités principales

1. *Gestion des utilisateurs* : Inscription, connexion, gestion des rôles.
2. *Disponibilité des médicaments* : Vérification de la disponibilité en pharmacie.
3. *Gestion des commandes* : Enregistrement et suivi des commandes.

### Installation et lancement du backend

1. Naviguez dans le dossier backend :
   bash
   cd backend
   
2. Installez les dépendances :
   bash
   npm install
   
3. Lancez le serveur :
   bash
   npm start
   
4. Vérifiez que le backend tourne à l'adresse : [http://localhost:300](http://localhost:300)

### Exemple de route : Inscription

javascript
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db');

const app = express();
app.use(express.json());

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `INSERT INTO users (username, email, hashed_password) VALUES (?, ?, ?)`;
  db.run(query, [username, email, hashedPassword], function (err) {
    if (err) return res.status(500).json({ message: 'Erreur.' });
    res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  });
});

app.listen(300, () => console.log('Backend en cours sur http://localhost:300'));


---

## Charte Graphique

- *Couleurs principales :*

  - Vert santé : #4CAF50
  - Jaune or : #FFD700
  - Blanc : #FFFFFF

- *Typographie :*

  - Poppins (principal)
  - Roboto (secondaire)

---

## Lancer le projet complet

1. *Backend* :
   bash
   cd backend
   npm start
   
2. *Frontend* :
   bash
   cd frontend
   npm start
   
3. Accédez à l'application sur [http://localhost:3000](http://localhost:3000).

---

##

---

## Auteur

Ce projet est développé par l'équipe SmartDev pour faciliter l'accès aux médicaments au Bénin.&#x20;
