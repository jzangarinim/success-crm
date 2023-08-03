import React from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import Logo from "../../img/Logo.png";

export const Home = () => {
  return (
    <>
      <div className="container-fluid d-flex justify-content-center">
        <div className="col-12 card mb-3 mt-3 border border-success">
          <div className="row g-0">
            <div className="col-md-8 d-flex align-items-center">
              <img src={Logo} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-4 test">
              <div className="card-body d-flex flex-column align-items-center justify-content-center h-100">
                <Link
                  to="/login"
                  className="btn btn-success mb-3"
                  type="button"
                >
                  Log in
                </Link>
                <Link to="/register" type="button" className="btn btn-success">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
