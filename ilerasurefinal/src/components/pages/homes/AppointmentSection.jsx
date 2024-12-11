import React from "react";

const AppointmentSection = () => {
  return (
    <div className="appointment_section">
      <div className="container">
        <div className="appointment_box">
          <div className="row">
            <div className="col-md-12">
              <h1 className="appointment_taital">
                Book <span style={{ color: "#0cb7d6" }}>Appointment</span>
              </h1>
            </div>
          </div>
          <div className="appointment_section_2">
            <div className="row">
              <div className="col-md-4">
                <p className="doctorname_text">Patient Name</p>
                <input
                  type="text"
                  className="email_text"
                  placeholder=""
                  name="patientName"
                />
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <p className="doctorname_text">Doctor's Name</p>
                  <select className="form-control" id="doctorName">
                    <option>Normal distribution</option>
                    <option>200</option>
                    <option>300</option>
                    <option>400</option>
                    <option>500</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <p className="doctorname_text">Department's Name</p>
                  <select className="form-control" id="departmentName">
                    <option>Normal distribution</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <p className="doctorname_text">Phone Number</p>
                <input
                  type="text"
                  className="email_text"
                  placeholder=""
                  name="phoneNumber"
                />
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <p className="doctorname_text">Department</p>
                  <select className="form-control" id="department">
                    <option>Normal distribution</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <p className="doctorname_text">Choose Date</p>
                <input
                  id="datepicker"
                  className="form-control"
                  placeholder="Select Date"
                  name="appointmentDate"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSection;
