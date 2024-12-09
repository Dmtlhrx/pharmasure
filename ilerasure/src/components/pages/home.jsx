import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pill, Clock, ShieldCheck, MessageCircle, User, LogIn } from 'lucide-react';

const PharmacyHomepage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white overflow-hidden">
      <header className="container mx-auto px-4 py-6 relative">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3 transform transition-transform hover:scale-105">
            <Pill className="text-green-600 w-10 h-10 animate-pulse-slow" />
            <h1 className="text-2xl font-bold text-green-800">MaSantéPharma</h1>
          </div>
          
          {/* Boutons desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-green-600 text-white px-5 py-2.5 rounded-full hover:bg-green-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-lg hover:shadow-xl">
              <LogIn className="w-5 h-5 animate-bounce-slow" />
              <span>Se connecter</span>
            </button>
            <button className="flex items-center space-x-2 border-2 border-green-600 text-green-600 px-5 py-2.5 rounded-full hover:bg-green-50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              <User className="w-5 h-5 animate-bounce-slow" />
              <span>S'inscrire</span>
            </button>
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-green-800 focus:outline-none animate-pulse"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-slide-in-down">
            <div className="flex flex-col items-center space-y-4 py-6">
            <Link to="/login">
            <button className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-full w-64 justify-center transform transition-transform hover:scale-105 active:scale-95">
               
                <span>Se connecter</span>
              </button></Link> 
              <Link to="/register">
              <button className="flex items-center space-x-2 border-2 border-green-600 text-green-600 px-6 py-3 rounded-full w-64 justify-center transform transition-transform hover:scale-105 active:scale-95">
                <User className="w-6 h-6" />
                <span>S'inscrire</span>
              </button>
              </Link> 
            
            </div>
          
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 mt-12 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-fade-in-left">
          <h2 className="text-4xl font-extrabold text-green-900">
            Votre santé, notre priorité
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Commandez vos médicaments en ligne, consultez nos pharmaciens et gérez votre santé facilement depuis votre smartphone.
          </p>
          <div className="flex space-x-4">
            <button className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-lg hover:shadow-xl">
              Rechercher un  medicament
            </button>
            <button className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-full hover:bg-green-50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              Nos Services
            </button>
          </div>
        </div>

        <div className="flex flex-col space-y-6 animate-fade-in-right">
          {[
            { 
              icon: Clock, 
              color: "green", 
              title: "Livraison Rapide", 
              description: "Recevez vos médicaments en 2h" 
            },
            { 
              icon: ShieldCheck, 
              color: "green", 
              title: "100% Sécurisé", 
              description: "Ordonnances vérifiées" 
            },
            { 
              icon: MessageCircle, 
              color: "green", 
              title: "Conseil Pharmacien", 
              description: "Consultations en ligne" 
            }
          ].map((service, index) => (
            <div 
              key={index} 
              className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 transform transition-transform hover:scale-105 hover:shadow-xl"
            >
              <service.icon className={`text-${service.color}-600 w-10 h-10 animate-pulse-slow`} />
              <div>
                <h3 className="font-bold text-green-900">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 mt-12 text-center border-t border-gray-200 animate-fade-in">
        <p className="text-gray-600">© 2024 MaSantéPharma. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default PharmacyHomepage;