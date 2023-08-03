import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Dashboard = () => {
  let navigate = useNavigate();
  const { store } = useContext(Context);
  const { user, token } = store;

  useEffect(() => {
    if (token) {
      if (
        user.role != "Admin" &&
        user.role != "Head of Department" &&
        user.role != "Account Manager"
      ) {
        navigate("/dashboard");
      }
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="col 12 mt-3">
          <div className="row mb-3">
            <div className="d-grid gap-3">
              <Link to="/projects" className="btn btn-success" type="button">
                Go to Projects
              </Link>
              <Link to="/employees" className="btn btn-success" type="button">
                Go to Employees
              </Link>
              <Link to="/customers" className="btn btn-success" type="button">
                Go to Customers
              </Link>
              <Link
                to="/admin"
                className={`btn btn-success ${
                  user.role === "Admin" ? "" : "d-none"
                }`}
                type="button"
              >
                Go to Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
