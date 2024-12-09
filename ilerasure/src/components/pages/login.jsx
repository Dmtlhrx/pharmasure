import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Mail, Lock, 
  LogIn, Shield 
} from 'lucide-react';

export default function HealthcareAuthModal() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique d'authentification
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-cyan-600/20">
        <div className="bg-gradient-to-r from-cyan-600 to-teal-500 p-6 text-center">
          <h2 className="text-3xl font-bold text-white flex items-center justify-center">
            <Shield className="mr-3" size={32} />
            {isLogin ? 'Connexion' : 'Inscription'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-600" />
              <input
                type="text"
                name="username"
                placeholder="Nom d'utilisateur"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-10 py-3 border-b-2 border-cyan-300 focus:border-cyan-600 transition-colors"
                required={!isLogin}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-600" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 py-3 border-b-2 border-teal-300 focus:border-teal-600 transition-colors"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-700" />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 py-3 border-b-2 border-cyan-300 focus:border-cyan-600 transition-colors"
              required
            />
          </div>

          {!isLogin && (
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-700" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmer le mot de passe"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 py-3 border-b-2 border-cyan-300 focus:border-cyan-600 transition-colors"
                required
              />
            </div>
          )}

<p className="text-center">
                        Vous avez Déja un compte? <a href="/register">inscrivez-vous</a>
                    </p>
        </form>
      </div>
    </div>
  );
}
