import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  let navigate = useNavigate();
  const { store } = useContext(Context);
  const { token } = store;

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand text-success" href="#">
          Success CRM
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse d-flex justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link active text-success"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-success" to="/">
                About us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-success" to="/">
                Report an issue
              </Link>
            </li>
          </ul>
          <div className={!token ? "d-none" : ""}>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
