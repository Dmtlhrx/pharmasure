const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = 300;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes

// Inscription
app.post('/register', async (req, res) => {
  const { username, email, password, role = 'user' } = req.body;

  // Vérifier si l'email existe déjà
  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, row) => {
    if (row) {
      return res.status(400).json({ message: 'Email déjà enregistré.' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insérer l'utilisateur dans la base de données
    const query = `INSERT INTO users (username, email, hashed_password, role) VALUES (?, ?, ?, ?)`;
    db.run(query, [username, email, hashedPassword, role], function (err) {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.' });
      }
      res.status(201).json({ message: 'Utilisateur créé avec succès.' });
    });
  });
});

// Connexion
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Vérifier si l'utilisateur existe
  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, row) => {
    if (!row) {
      return res.status(400).json({ message: 'Email ou mot de passe invalide.' });
    }

    // Vérifier le mot de passe
    const validPassword = await bcrypt.compare(password, row.hashed_password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Email ou mot de passe invalide.' });
    }

    // Vérifier le rôle et rediriger en fonction
    switch (row.role) {
      case 'user':
        return res.json({
          message: `Bienvenue ${row.username}, redirection vers le tableau de bord utilisateur.`,
          redirectTo: '/DashboardUser',
        });
      case 'medecin':
        return res.json({
          message: `Bienvenue Dr. ${row.username}, redirection vers le tableau de bord médecin.`,
          redirectTo: '/DoctorDashboard',
        });
      case 'pharmacie':
        return res.json({
          message: `Bienvenue ${row.username}, redirection vers le tableau de bord pharmacie.`,
          redirectTo: '/PharmacyDashboard',
        });
      default:
        return res.status(403).json({ message: 'Rôle utilisateur inconnu.' });
    }
  });
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
