import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Login = () => {
  const { actions, store } = useContext(Context);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  function handleLogin() {
    actions.Login(login);
  }

  return (
    <>
      <div className="container">
        <div className="col 12">
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
            <label for="inputPassword5" className="form-label">
              Password
            </label>
            <input
              type="password"
              required
              id="inputPassword5"
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


