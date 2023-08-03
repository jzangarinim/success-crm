import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Login = () => {
  let navigate = useNavigate();
  const { actions, store } = useContext(Context);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  async function handleLogin() {
    let email = document.getElementById("emailInput").value;
    let password = document.getElementById("passwordInput").value;
    let response = await actions.Login(email, password);
    if (response) {

      navigate("/dashboard");

    }
  }

  useEffect(() => {
    if (store.token) {

      navigate("/dashboard");

    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="col 12 mt-3">
          <div className="row mb-3">
            <label htmlFor="emailInput" className="form-label">
              Email address
            </label>
            <input
              type="text"
              required
              className="form-control"
              id="emailInput"
              placeholder="name@example.com"
              value={login.email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="row mb-3">
            <label htmlFor="passwordInput" className="form-label">
              Password
            </label>
            <input
              type="password"
              required
              id="passwordInput"
              className="form-control"
              aria-labelledby="passwordHelpBlock"
              value={login.password}
              name="password"
              onChange={handleChange}
            />
            <div id="passwordHelpBlock" className="form-text">
              Your password must be 8-20 characters long, contain letters and
              numbers, and must not contain spaces, special characters, or
              emoji.
            </div>
          </div>
          <button
            type="button"
            className="col-2 btn btn-primary me-3"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};
