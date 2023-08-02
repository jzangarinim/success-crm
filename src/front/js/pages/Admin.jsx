import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { BackButton } from "../component/BackButton.jsx";

export const Admin = () => {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState("");
  const { store, actions } = useContext(Context);
  const { deleteProject } = actions;
  const { user, token } = store;

  function formatDate(date) {
    const dt = new Date(date);
    return dt.toDateString();
  }
  function handleEmployeeClick(id) {
    navigate(`/employees/${id}`);
  }

  useEffect(() => {
    if (token && user.role === "Admin") {
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
          setData(aux);
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
        <BackButton />
        <div className="row d-flex justify-content-center">
          <div className="p-0 d-flex justify-content-between align-items-center">
            <h1 className="text-success">Employees</h1>
            <Link
              to="/projects/create"
              type="button"
              className={`btn btn-success ${
                user.role != "Admin" ? "d-none" : ""
              }`}
            >
              Add a new employee
            </Link>
          </div>
          <table className="table table-sm table-striped table-success table-hover table-bordered align-middle">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="text-center"
                  style={{ width: 35 + "px" }}
                >
                  #
                </th>
                <th scope="col">Name</th>
                <th scope="col">Department</th>
                <th scope="col">Role</th>
                <th scope="col">Date of hire</th>
                <th
                  scope="col"
                  style={{ width: 80 + "px" }}
                  className={`${user.role != "Admin" ? "d-none" : ""}`}
                ></th>
              </tr>
            </thead>
            <tbody>
              {data.map((emp, index) => {
                return (
                  <tr key={emp.id}>
                    <th scope="row" className="text-center">
                      {emp?.id}
                    </th>
                    <td
                      className="project-name"
                      onClick={() => handleEmployeeClick(emp?.id)}
                    >
                      {emp?.name} {emp?.last_name}
                    </td>
                    <td>{emp?.department}</td>
                    <td>{emp?.role}</td>
                    <td>{formatDate(emp?.created_at)}</td>
                    <td
                      className={`d-flex justify-content-center ${
                        user.role != "Admin" ? "d-none" : ""
                      }`}
                    >
                      {/* Edit button */}
                      <Link
                        to={`/admin/edit/${emp?.id}`}
                        state={{ data: emp }}
                        type="button"
                        className="btn btn-secondary me-1"
                        id={`edit-button${emp?.id}`}
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </Link>
                      {/* Delete button */}
                      <button
                        type="button"
                        className="btn btn-danger"
                        id={`delete-button${emp?.id}`}
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                        onClick={() => setClicked(emp?.id)}
                      >
                        <i
                          className="fa-solid fa-trash"
                          onClick={() => setClicked(emp?.project_id)}
                        ></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
