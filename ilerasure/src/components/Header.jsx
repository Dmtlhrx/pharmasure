import React from "react";
import { Link } from "react-router-dom";

const HeaderSection = () => {
  return (
    <div className="header_section">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            <img src="images/logo.png" alt="Logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/treatment">
                  Treatment
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/doctors">
                  Doctors
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blog">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="custom_bg">
          <div className="custom_menu">
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/treatment">Treatment</Link>
              </li>
              <li>
                <Link to="/doctors">Doctors</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
          <form className="form-inline my-2 my-lg-0">
            <div className="search_btn">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">
                  <i className="fa fa-user" aria-hidden="true"></i>
                  <span className="signup_text">Sign Up</span>
                </Link>
              </li>
              <li>
                <button type="button" className="btn btn-light">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </li>
            </div>
          </form>
        </div>
      </div>

      <div className="banner_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="banner_title">We care Of You</h1>
              <p className="banner_text">
                When looking at its layout. The point of using Lorem Ipsum is
                that it has a more-or-less normal distribution of letters, as
                opposed to
              </p>
              <div className="read_bt">
                <Link to="/read-more">Read More</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
