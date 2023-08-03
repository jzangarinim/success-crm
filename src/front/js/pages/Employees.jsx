import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import profilePicture from "../../img/Default_pfp.jpg";
import { BackButton } from "../component/BackButton.jsx";

export const Employees = () => {
  let navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [original, setOriginal] = useState([]);
  const { store } = useContext(Context);
  const { token } = store;

  function handleFilter(event, str) {
    if (event.target.id === `${str}-button`) {
      if (!event.target.classList.contains("active")) {
        const employeeFilter = original.filter((emp) => {
          return emp.department === (str !== "Human" ? str : "Human Resources");
        });
        setEmployees(employeeFilter);
      } else if (event.target.classList.contains("active")) {
        setEmployees(original);
      }
    }
  }

  useEffect(() => {
    // Gets all employees
    if (token) {
      const getEmployees = async () => {
        try {
          let response = await fetch(`${process.env.BACKEND_URL}/api/users`);
          let data = await response.json();
          // Sorts employees by department role (Admin > Head > Manager > VA > Member)
          let aux = data.sort(function (a, b) {
            const roleA = a.role;
            const roleB = b.role;
            const sortedRoles = [
              "Admin",
              "Head of Department",
              "Account Manager",
              "Virtual Assistant",
              "Department member",
            ];
            const indexA = sortedRoles.indexOf(roleA);
            const indexB = sortedRoles.indexOf(roleB);
            return indexA - indexB;
          });
          //const aux = [...data].sort((a, b) => (a.role > b.role ? -1 : 1));
          setEmployees(aux);
          setOriginal(aux);
        } catch (error) {
          console.log(error);
        }
      };
      getEmployees();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <BackButton />
          <div className="col-12 d-flex flex-wrap justify-content-center">
            <div className="col-8 mt-3 d-flex justify-content-center align-items-center">
              <h1>Departments:</h1>
              <button
                type="button"
                className="btn btn-success ms-3 me-3"
                data-bs-toggle="button"
                id="Sales-button"
                onClick={() => handleFilter(event, "Sales")}
              >
                Sales
              </button>
              <button
                type="button"
                className="btn btn-success me-3"
                id="Human-button"
                onClick={() => handleFilter(event, "Human")}
                data-bs-toggle="button"
              >
                H.R.
              </button>
              <button
                type="button"
                className="btn btn-success me-3"
                id="Finances-button"
                onClick={() => handleFilter(event, "Finances")}
                data-bs-toggle="button"
              >
                Finances
              </button>
              <button
                type="button"
                className="btn btn-success me-3"
                id="Recruitment-button"
                onClick={() => handleFilter(event, "Recruitment")}
                data-bs-toggle="button"
              >
                Recruitment
              </button>
              <button
                type="button"
                className="btn btn-success"
                id="Trial-button"
                onClick={() => handleFilter(event, "Trial")}
                data-bs-toggle="button"
              >
                Trial
              </button>
            </div>
            {employees.map((employee, index) => {
              return (
                <div
                  className="card col-5 mt-3 me-3"
                  id={employee.id}
                  key={employee.id}
                >
                  <div className="row g-0 d-flex">
                    <div className="col-3 mt-3 ms-3 mb-3">
                      <img
                        src={profilePicture}
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className="col-7 w-auto">
                      <div className="card-body p-3">
                        <h5 className="card-title">{`${employee?.name} ${employee?.last_name}`}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">
                          {`${employee?.department} - ${employee?.role}`}
                        </h6>
                        <p className="card-text">{`email: ${employee?.email}`}</p>
                        <Link
                          to="#"
                          className="card-link"
                          onClick={() =>
                            (window.location = `mailto:${employee?.email}`)
                          }
                        >
                          Schedule a meeting with {employee?.name}
                        </Link>
                      </div>
                    </div>
                    <div className="card-body col-1 d-flex justify-content-end align-items-center">
                      <Link
                        to={`/employees/${employee.id}`}
                        type="button"
                        className="btn btn-success"
                      >
                        <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
