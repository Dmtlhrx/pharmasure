import React, { useState } from 'react';
import { 
  Pill, 
  CalendarCheck, 
  Hospital, 
  Search, 
  LogOut, 
  FileText, 
  MapPin, 
  Clock,
  Stethoscope,
  User 
} from 'lucide-react';

const HealthcareDashboard = () => {
  const [activePage, setActivePage] = useState('medicament');
  const [medicamentForm, setMedicamentForm] = useState({
    medicamentName: '',
    prescriptionSource: '',
    doctorNumber: '',
    ordonnance: null
  });
  const [selectedHospital, setSelectedHospital] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Simulated data (would typically come from an API)
  const hospitals = [
    { id: 1, name: 'Hôpital Central', address: '123 Rue de la Santé' },
    { id: 2, name: 'Clinique Moderne', address: '45 Avenue de la Vie' }
  ];

  const availableMedications = [
    { 
      pharmacy: 'Pharmacie Centrale', 
      availability: true, 
      price: 12.50, 
      location: '10 Rue de la République' 
    },
    { 
      pharmacy: 'Pharmacie du Parc', 
      availability: false, 
      location: '22 Boulevard Santé' 
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicamentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    setMedicamentForm(prev => ({
      ...prev,
      ordonnance: e.target.files[0]
    }));
  };

  const handleMedicamentSearch = (e) => {
    e.preventDefault();
    // Implement actual search logic
    console.log('Medication Search Details:', medicamentForm);
    // TODO: Add API call or search functionality
  };

  const handleAppointmentBooking = (e) => {
    e.preventDefault();
    console.log('Booking appointment:', {
      hospital: selectedHospital,
      date: appointmentDate
    });
  };

  const renderMedicamentPage = () => (
    <div className="bg-white shadow-lg rounded-2xl p-6 space-y-6 border-2 border-teal-50">
      <div className="flex items-center space-x-4 text-teal-600">
        <Pill size={32} />
        <h2 className="text-2xl font-semibold text-teal-800">Recherche de Médicaments</h2>
      </div>

      <form onSubmit={handleMedicamentSearch} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <label htmlFor="medicamentName" className="block text-teal-700 mb-2">Nom du Médicament</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400" />
              <input
                id="medicamentName"
                type="text"
                name="medicamentName"
                value={medicamentForm.medicamentName}
                onChange={handleInputChange}
                placeholder="Entrez le nom du médicament"
                className="w-full pl-10 pr-4 py-3 border-2 border-teal-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300 text-teal-800"
              />
            </div>
          </div>

          <div>
            <label htmlFor="prescriptionSource" className="block text-teal-700 mb-2">Source de Prescription</label>
            <div className="relative">
              <Stethoscope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400" />
              <input
                id="prescriptionSource"
                type="text"
                name="prescriptionSource"
                value={medicamentForm.prescriptionSource}
                onChange={handleInputChange}
                placeholder="Nom de l'établissement"
                className="w-full pl-10 pr-4 py-3 border-2 border-teal-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300 text-teal-800"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="doctorNumber" className="block text-teal-700 mb-2">Numéro du Docteur</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400" />
              <input
                id="doctorNumber"
                type="text"
                name="doctorNumber"
                value={medicamentForm.doctorNumber}
                onChange={handleInputChange}
                placeholder="Numéro d'identification"
                className="w-full pl-10 pr-4 py-3 border-2 border-teal-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300 text-teal-800"
              />
            </div>
          </div>

          <div>
            <label htmlFor="ordonnanceUpload" className="block text-teal-700 mb-2">Télécharger l'Ordonnance</label>
            <div className="border-2 border-dashed border-teal-100 rounded-lg p-3">
              <div className="flex items-center space-x-2 text-teal-600">
                <FileText size={20} />
                <input
                  id="ordonnanceUpload"
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                  className="w-full file:mr-4 file:rounded-lg file:border-0 file:bg-teal-50 file:px-4 file:py-2 file:text-teal-700"
                />
              </div>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition duration-300 flex items-center justify-center space-x-2"
        >
          <Search size={20} />
          <span>Rechercher</span>
        </button>
      </form>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-teal-700">Résultats de Disponibilité</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {availableMedications.map((med, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg ${med.availability ? 'bg-cyan-50 border-cyan-200' : 'bg-red-50 border-red-200'} border`}
            >
              <div className="flex flex-col space-y-2">
                <p className="font-semibold text-teal-800">{med.pharmacy}</p>
                <p className="text-sm flex items-center space-x-1 text-teal-600">
                  <MapPin size={16} className="text-teal-500" />
                  <span>{med.location}</span>
                </p>
                {med.availability && (
                  <p className="text-sm flex items-center space-x-1 text-cyan-600">
                    <Clock size={16} />
                    <span>Prix: {med.price}€</span>
                  </p>
                )}
                <button 
                  onClick={() => {
                    // TODO: Implement booking or contact logic
                    console.log(`${med.availability ? 'Booking' : 'Contacting'} ${med.pharmacy}`);
                  }}
                  className={`mt-2 px-4 py-2 rounded-lg ${med.availability ? 'bg-teal-500 hover:bg-teal-600' : 'bg-red-500 hover:bg-red-600'} text-white w-full`}
                >
                  {med.availability ? 'Réserver' : 'Contacter'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderConsultationPage = () => (
    <div className="bg-white shadow-lg rounded-2xl p-6 space-y-6 border-2 border-teal-50">
      <div className="flex items-center space-x-4 text-teal-600">
        <CalendarCheck size={32} />
        <h2 className="text-2xl font-semibold text-teal-800">Réservation de Consultation</h2>
      </div>

      <form onSubmit={handleAppointmentBooking} className="space-y-4">
        <div>
          <label className="block mb-2 text-teal-700">Sélectionner l'Hôpital</label>
          <div className="space-y-2">
            {hospitals.map((hospital) => (
              <div 
                key={hospital.id} 
                className={`border-2 rounded-lg p-4 cursor-pointer transition duration-300 ${
                  selectedHospital === hospital.name 
                    ? 'border-cyan-500 bg-cyan-50' 
                    : 'border-teal-200 hover:border-cyan-300'
                }`}
                onClick={() => setSelectedHospital(hospital.name)}
              >
                <div className="flex items-center space-x-3">
                  <Hospital size={24} className="text-teal-600" />
                  <div>
                    <p className="font-semibold text-teal-800">{hospital.name}</p>
                    <p className="text-sm text-teal-600 flex items-center space-x-1">
                      <MapPin size={16} />
                      <span>{hospital.address}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2 text-teal-700">Date de Consultation</label>
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            className="w-full px-4 py-3 border-2 border-teal-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300 text-teal-800"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition duration-300 flex items-center justify-center space-x-2"
        >
          <CalendarCheck size={20} />
          <span>Confirmer la Réservation</span>
        </button>
      </form>
    </div>
  );

  const renderSidebar = () => (
    <div 
      className={`fixed top-0 left-0 h-full w-64 bg-teal-700 text-white transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } z-50 shadow-xl`}
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">HealthCare</h1>
        <nav className="space-y-4">
          <button 
            onClick={() => setActivePage('medicament')}
            className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 ${
              activePage === 'medicament' ? 'bg-teal-600' : 'hover:bg-teal-600'
            }`}
          >
            <Pill />
            <span>Médicaments</span>
          </button>
          <button 
            onClick={() => setActivePage('consultation')}
            className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 ${
              activePage === 'consultation' ? 'bg-teal-600' : 'hover:bg-teal-600'
            }`}
          >
            <CalendarCheck />
            <span>Consultations</span>
          </button>
        </nav>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cyan-50 flex flex-col md:flex-row">
      {renderSidebar()}
      <main 
        className={`flex-1 p-4 md:p-8 transition-all duration-300 ${
          sidebarOpen ? 'md:ml-64' : 'ml-0'
        }`}
      >
        {activePage === 'medicament' ? renderMedicamentPage() : renderConsultationPage()}
      </main>

      {!sidebarOpen && (
        <button 
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 bg-teal-500 text-white p-3 rounded-full shadow-lg hover:bg-teal-600 transition duration-300 z-50"
        >
          <Search />
        </button>
      )}
    </div>
  );
};

export default HealthcareDashboard;