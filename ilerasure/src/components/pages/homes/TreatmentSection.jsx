import React from "react";

const TreatmentSection = () => {
  const treatments = [
    {
      number: "01",
      title: "Nephrologist Care",
      description:
        "Alteration in some form, by injected humour, or randomised words which don't look even slightly e sure there isn't anything",
      isActive: true,
    },
    {
      number: "02",
      title: "Eye Care",
      description:
        "Alteration in some form, by injected humour, or randomised words which don't look even",
      isActive: false,
    },
    {
      number: "03",
      title: "Pediatrician Clinic",
      description:
        "Alteration in some form, by injected humour, or randomised words which don't look even",
      isActive: false,
    },
    {
      number: "04",
      title: "Prenatal Care",
      description:
        "Alteration in some form, by injected humour, or randomised words which don't look even",
      isActive: false,
    },
  ];

  return (
    <div className="treatment_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="treatment_taital">Hospital Treatment</h1>
          </div>
        </div>
        <div className="treatment_section_2">
          <div className="row">
            {treatments.map((treatment, index) => (
              <div key={index} className="col-lg-3 col-sm-6">
                <h1 className="number_text">{treatment.number}</h1>
                <h2 className="care_text">{treatment.title}</h2>
                <p className="treatment_text">
                  {treatment.description}
                </p>
                <div
                  className={`readmore_bt ${
                    treatment.isActive ? "active" : ""
                  }`}
                >
                  <a href="#">Read More</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentSection;
