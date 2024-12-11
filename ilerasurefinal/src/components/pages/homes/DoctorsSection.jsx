import React from "react";

const doctorsData = [
  {
    name: "Humour",
    degree: "MBBS",
    imgSrc: "images/img-1.png",
  },
  {
    name: "Jenni",
    degree: "MBBS",
    imgSrc: "images/img-2.png",
  },
  {
    name: "Morco",
    degree: "MBBS",
    imgSrc: "images/img-3.png",
  },
];

const Doctors = () => {
  return (
    <div className="doctores_section margim_90">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="doctores_taital">Our Doctors</h1>
          </div>
        </div>
        <div className="doctores_section_2">
          <div id="my_slider" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              {doctorsData.map((doctor, index) => (
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  key={doctor.name}
                >
                  <div className="row">
                    <div className="col-md-4">
                      <div className="doctores_box">
                        <div className="image_1">
                          <img src={doctor.imgSrc} alt={doctor.name} />
                        </div>
                        <h4 className="humour_text">
                          {doctor.name} <br />
                          <span className="mbbs_text">{doctor.degree}</span>
                        </h4>
                        <div className="social_icon">
                          <ul>
                            <li>
                              <a href="#">
                                <i
                                  className="fa fa-facebook"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i
                                  className="fa fa-twitter"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i
                                  className="fa fa-linkedin"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i
                                  className="fa fa-instagram"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
