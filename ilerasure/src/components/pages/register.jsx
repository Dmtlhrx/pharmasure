import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';

function Register() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique de soumission du formulaire
        console.log(formData);
    };

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 space-y-6 transform transition-all duration-300 hover:scale-105">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-green-800 mb-4">Inscription</h2>
                    <p className="text-gray-600">Créez votre compte gratuitement</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-green-500" />
                        </div>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Nom complet"
                            required
                            className="w-full pl-10 pr-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-green-500" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Adresse email"
                            required
                            className="w-full pl-10 pr-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                        />
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-green-500" />
                        </div>
                        <input
                            type="text"
                            name="Statut"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Médecin/utilisateur/pharmacie"
                            required
                            className="w-full pl-10 pr-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-green-500" />
                        </div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Mot de passe"
                            required
                            className="w-full pl-10 pr-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
                    >
                        <span>S'inscrire</span>
                    </button>

                    <div className="text-center">
                        <p className="text-gray-600">
                            Vous avez déjà un compte ? {' '}
                            <a 
                                href="/login" 
                                className="text-green-600 hover:text-green-800 font-semibold transition duration-300"
                            >
                                Connectez-vous
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;