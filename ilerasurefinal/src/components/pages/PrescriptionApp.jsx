import React, { useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Link } from 'react-router-dom';


const PrescriptionApp = () => {
  const [medications, setMedications] = useState([
    { name: '', dosage: '', frequency: '', duration: '' }
  ]);
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    email: '',
    age: '',
    weight: ''
  });
  const [prescriptions, setPrescriptions] = useState([]);

  // Ajouter un médicament supplémentaire
  const addMedication = () => {
    setMedications([
      ...medications, 
      { name: '', dosage: '', frequency: '', duration: '' }
    ]);
  };

  // Mettre à jour un médicament
  const updateMedication = (index, field, value) => {
    const newMedications = [...medications];
    newMedications[index][field] = value;
    setMedications(newMedications);
  };

  // Supprimer un médicament
  const removeMedication = (index) => {
    const newMedications = medications.filter((_, i) => i !== index);
    setMedications(newMedications);
  };

  // Générer un PDF d'ordonnance
  const generatePrescriptionPDF = async (prescription) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    page.drawText('ORDONNANCE MÉDICALE', {
      x: 50,
      y: height - 50,
      size: 24,
      font,
      color: rgb(0, 0, 0)
    });

    let yPosition = height - 100;

    // Informations patient
    page.drawText(`Patient: ${prescription.patientName}`, {
      x: 50,
      y: yPosition,
      size: 12,
      font
    });
    yPosition -= 20;

    page.drawText(`Âge: ${prescription.patientAge} ans`, {
      x: 50,
      y: yPosition,
      size: 12,
      font
    });
    yPosition -= 20;

    // Liste des médicaments
    page.drawText('Prescriptions:', {
      x: 50,
      y: yPosition,
      size: 14,
      font,
      color: rgb(0.2, 0.2, 0.2)
    });
    yPosition -= 20;

    prescription.medications.forEach((med, index) => {
      page.drawText(`${index + 1}. ${med.name}`, {
        x: 50,
        y: yPosition,
        size: 12,
        font
      });
      yPosition -= 20;

      page.drawText(`   Posologie: ${med.dosage}`, {
        x: 50,
        y: yPosition,
        size: 10,
        font
      });
      yPosition -= 20;

      page.drawText(`   Fréquence: ${med.frequency}`, {
        x: 50,
        y: yPosition,
        size: 10,
        font
      });
      yPosition -= 20;

      page.drawText(`   Durée: ${med.duration}`, {
        x: 50,
        y: yPosition,
        size: 10,
        font
      });
      yPosition -= 30;
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  };

  // Créer une nouvelle prescription
  const createPrescription = async (e) => {
    e.preventDefault();
    
    // Validation des médicaments
    const validMedications = medications.filter(med => 
      med.name && med.dosage && med.frequency && med.duration
    );

    if (validMedications.length === 0) {
      alert('Veuillez ajouter au moins un médicament');
      return;
    }

    // Créer l'objet prescription
    const newPrescription = {
      id: Date.now().toString(),
      patientName: patientInfo.name,
      patientEmail: patientInfo.email,
      patientAge: patientInfo.age,
      patientWeight: patientInfo.weight,
      medications: validMedications,
      createdAt: new Date().toLocaleString()
    };

    try {
      // Générer le PDF
      const pdfBytes = await generatePrescriptionPDF({
        patientName: patientInfo.name,
        patientAge: patientInfo.age,
        medications: validMedications
      });

      // Créer un lien de téléchargement
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ordonnance_${patientInfo.name}_${new Date().toISOString().split('T')[0]}.pdf`;
      link.click();

      // Ajouter à la liste des prescriptions
      setPrescriptions([...prescriptions, newPrescription]);

      // Réinitialiser le formulaire
      setPatientInfo({
        name: '',
        email: '',
        age: '',
        weight: ''
      });
      setMedications([{ name: '', dosage: '', frequency: '', duration: '' }]);

    } catch (error) {
      console.error("Erreur lors de la création de l'ordonnance", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl mb-6">Nouvelle Ordonnance</h1>
      
      <form onSubmit={createPrescription} className="space-y-4">
        <div>
          <h2 className="text-xl mb-2">Informations Patient</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nom du patient"
              value={patientInfo.name}
              onChange={(e) => setPatientInfo({
                ...patientInfo, 
                name: e.target.value
              })}
              required
              className="border p-2"
            />
            <input
              type="email"
              placeholder="Email du patient"
              value={patientInfo.email}
              onChange={(e) => setPatientInfo({
                ...patientInfo, 
                email: e.target.value
              })}
              required
              className="border p-2"
            />
            <input
              type="number"
              placeholder="Âge du patient"
              value={patientInfo.age}
              onChange={(e) => setPatientInfo({
                ...patientInfo, 
                age: e.target.value
              })}
              required
              className="border p-2"
            />
            <input
              type="number"
              placeholder="Poids du patient (kg)"
              value={patientInfo.weight}
              onChange={(e) => setPatientInfo({
                ...patientInfo, 
                weight: e.target.value
              })}
              className="border p-2"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl mb-2">Médicaments</h2>
          {medications.map((medication, index) => (
            <div key={index} className="border p-4 mb-2">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nom du médicament"
                  value={medication.name}
                  onChange={(e) => updateMedication(index, 'name', e.target.value)}
                  required
                  className="border p-2"
                />
                <input
                  type="text"
                  placeholder="Posologie (ex: 500mg)"
                  value={medication.dosage}
                  onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                  required
                  className="border p-2"
                />
                <input
                  type="text"
                  placeholder="Fréquence (ex: 3 fois par jour)"
                  value={medication.frequency}
                  onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                  required
                  className="border p-2"
                />
                <input
                  type="text"
                  placeholder="Durée du traitement"
                  value={medication.duration}
                  onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                  required
                  className="border p-2"
                />
              </div>
              {index > 0 && (
                <button 
                  type="button" 
                  onClick={() => removeMedication(index)}
                  className="mt-2 bg-red-500 text-white p-2"
                >
                  Supprimer ce médicament
                </button>
              )}
            </div>
          ))}
          
          <div className="flex justify-between mt-4">
            <button 
              type="button" 
              onClick={addMedication}
              className="bg-green-500 text-white p-2"
            >
              Ajouter un médicament
            </button>
            <button 
              type="submit"
              className="bg-blue-500 text-white p-2"
            >
              Créer Ordonnance
            </button>
          </div>
        </div>
      </form>

      {prescriptions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl mb-4">Ordonnances Récentes</h2>
          <div className="space-y-2">
            {prescriptions.map((prescription) => (
              <div key={prescription.id} className="border p-4">
                <p>Patient: {prescription.patientName}</p>
                <p>Date: {prescription.createdAt}</p>
                <p>Médicaments: {prescription.medications.map(m => m.name).join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionApp;