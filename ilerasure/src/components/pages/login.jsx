import React, { useState } from 'react';
import axios from 'axios';
import { 
  User, 
  Mail, 
  Lock, 
  Stethoscope, 
  HeartPulse, 
  ShieldCheck, 
  LogIn 
} from 'lucide-react';

const HealthcareAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation de base
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      const endpoint = isLogin ? '/login' : '/register';
      const payload = isLogin 
        ? { 
            email: formData.email, 
            password: formData.password 
          }
        : { 
            username: formData.username,
            email: formData.email, 
            password: formData.password,
            role: formData.role
          };

      const response = await axios.post(`http://localhost:3001${endpoint}`, payload);
      
      setSuccess(response.data.message);

      if (response.data.redirectTo) {
        // Redirection ou gestion du token
        // localStorage.setItem('userToken', response.data.token);
        window.location.href = response.data.redirectTo;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-green-600 text-white p-6 flex items-center justify-center">
          <HeartPulse size={48} className="mr-4" />
          <h2 className="text-3xl font-bold">
            {isLogin ? 'Connexion' : 'Inscription'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8">
          {!isLogin && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 flex items-center">
                  <User className="mr-2 text-green-600" />
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2 flex items-center">
                  <Stethoscope className="mr-2 text-green-600" />
                  Rôle
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="user">Patient</option>
                  <option value="medecin">Médecin</option>
                  <option value="pharmacie">Pharmacie</option>
                </select>
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 mb-2 flex items-center">
              <Mail className="mr-2 text-green-600" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2 flex items-center">
              <Lock className="mr-2 text-green-600" />
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              minLength="6"
            />
          </div>

          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 flex items-center">
                <ShieldCheck className="mr-2 text-green-600" />
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                minLength="6"
              />
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center"
          >
            <LogIn className="mr-2" />
            {isLogin ? 'Connexion' : 'S\'inscrire'}
          </button>

          <div className="text-center mt-4">
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-green-600 hover:underline"
            >
              {isLogin 
                ? 'Pas de compte ? Inscrivez-vous' 
                : 'Déjà un compte ? Connectez-vous'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HealthcareAuth;