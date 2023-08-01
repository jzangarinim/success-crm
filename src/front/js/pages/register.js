import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/register.css";
import { Link, useNavigate } from "react-router-dom";

export const Register_user = () => {
  let navigate = useNavigate();
  const { actions, store } = useContext(Context);
  const [user, setUser] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    department: "",
    city: "",
    country: "",
  });

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  async function handleRegister() {
    let name = document.getElementById("nameInput").value;
    let lastName = document.getElementById("last_nameInput").value;
    let email = document.getElementById("emailInput").value;
    let department = document.getElementById("departmentSelect").value;
    let city = document.getElementById("cityInput").value;
    let country = document.getElementById("countryInput").value;
    let password = document.getElementById("passwordInput").value;
    let response = actions.Register(
      email,
      password,
      department,
      name,
      lastName,
      city,
      country
    );
    if (response) {
      navigate("/login");
    }
  }

  return (
    <>
      <div className="container">
        <div className="col 12">
          <div className="row mb-3">
            <label htmlFor="nameInput" className="form-label">
              First Name
            </label>
            <input
              type="text"
              required
              className="form-control"
              id="nameInput"
              placeholder="Your Name"
              defaultValue={user.name}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="row mb-3">
            <label htmlFor="lastNameInput" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              required
              className="form-control"
              id="last_nameInput"
              placeholder="Your Last Name"
              defaultValue={user.last_name}
              name="last_name"
              onChange={handleChange}
            />
          </div>
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
              defaultValue={user.email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="row mb-8 btn-group">
            <label htmlFor="departmentInput" className="form-label">
              Department
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              id="departmentSelect"
            >
              <option>Select your department</option>
              <option
                defaultValue="Human Resources"
                name="department"
                onChange={handleChange}
              >
                Human Resources
              </option>
              <option
                defaultValue="Sales"
                name="department"
                onChange={handleChange}
              >
                Sales
              </option>
              <option
                defaultValue="Finances"
                name="department"
                onChange={handleChange}
              >
                Finances
              </option>
              <option
                defaultValue="Trial"
                name="department"
                onChange={handleChange}
              >
                Trial
              </option>
              <option
                defaultValue="Recruitment"
                name="department"
                onChange={handleChange}
              >
                Recruitment
              </option>
            </select>
          </div>
          <div className="row mb-3">
            <label htmlFor="cityInput" className="form-label">
              City
            </label>
            <input
              type="text"
              required
              className="form-control"
              id="cityInput"
              placeholder="Your City"
              defaultValue={user.city}
              name="city"
              onChange={handleChange}
            />
          </div>
          <div className="row mb-3">
            <label htmlFor="countryInput" className="form-label">
              Country
            </label>
            <input
              type="text"
              required
              className="form-control"
              id="countryInput"
              placeholder="Your Country"
              defaultValue={user.country}
              name="country"
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
              defaultValue={user.password}
              name="password"
              onChange={handleChange}
            />
            <div id="passwordHelpBlock" className="form-text">
              Your password must be 8-20 characters long, contain letters and
              numbers, and must not contain spaces, special characters, or
              emoji.
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-end">
          <button className="col-2 ms-3 me-2">
            <Link to="/login">Go back to Login</Link>
          </button>
          <button
            type="button"
            className="col-2 btn btn-primary me-3"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
};
