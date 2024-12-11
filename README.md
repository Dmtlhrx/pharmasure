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

## Auteur

Ce projet est développé par l'équipe SmartDev pour faciliter l'accès aux médicaments au Bénin.&#x20;
