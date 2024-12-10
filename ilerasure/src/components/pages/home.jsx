import React from "react";
import AppointmentSection from "../pages/homes/AppointmentSection";
import Doctors from "../pages/homes/DoctorsSection";
    
      import HeaderSection from "../Header";
      import TreatmentSection from "../pages/homes/TreatmentSection";

function Home() {
  return (
    <div className="home">
    
       <HeaderSection />
      <AppointmentSection />
  
      <TreatmentSection />
    </div>
  );
}

export default Home;
