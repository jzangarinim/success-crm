import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { BackButton } from "../component/BackButton.jsx";

export const Admin = () => {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState("");
  const [employee, setEmployee] = useState("");
  const [editedUser, setEditedUser] = useState({
    name: "",
    last_name: "",
    department: "",
    role: "",
    hourly_rate: "",
    weekly_availability: "",
    city: "",
    country: "",
    is_active: false,
    created_at: "",
  });
  const { store, actions } = useContext(Context);
  const { editUser } = actions;
  const { user, token } = store;

  function formatDate(date) {
    const dt = new Date(date);
    return dt.toDateString();
  }
  function handleEmployeeClick(id) {
    navigate(`/employees/${id}`);
  }
  function handleChange(event) {
    setEditedUser({ ...editedUser, [event.target.name]: event.target.value });
  }
  async function handleEdit() {
    let response = editUser(clicked, employee, editedUser);
    if (response) {
      window.location.reload();
    }
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
                <th scope="col" style={{ width: 60 + "px" }}></th>
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
                    <td className="d-flex justify-content-center">
                      {/* Edit button */}
                      <Link
                        to={`/administrator/edit/${emp?.id}`}
                        state={{ data: emp }}
                        type="button"
                        className="btn btn-secondary me-1"
                        data-bs-toggle="modal"
                        data-bs-target="#editModal"
                        id={`edit-button${emp?.id}`}
                        onClick={() => {
                          setClicked(emp?.id);
                          let aux = data.filter((entry) => {
                            return entry.id === emp?.id;
                          });
                          setEmployee(aux[0]);
                        }}
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Edit Modal */}
      <div
        className="modal fade w-100"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit employee's info: {employee.name} {employee.last_name}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Name row */}
              <div className="pb-3 pe-3 d-flex border-bottom">
                <div className="col-2 align-bottom">Full name</div>
                <div className="col-5 me-3">
                  <label htmlFor="firstNameInput" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstNameInput"
                    placeholder="John"
                    defaultValue={employee?.name}
                    name="name"
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="col-5">
                  <label htmlFor="lastNameInput" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastNameInput"
                    placeholder="Doe"
                    defaultValue={employee?.last_name}
                    name="last_name"
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              {/* Department role */}
              <div className="pe-3 pt-3 pb-3 d-flex border-bottom">
                <div className="col-2 align-bottom">Occupation</div>
                <div className="col-5 me-3">
                  <label htmlFor="departmentInput" className="form-label">
                    Department
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    id="departmentSelect"
                    name="department"
                    onChange={handleChange}
                  >
                    <option value={-1}>Select department</option>
                    <option name="department" value="Human Resources">
                      Human Resources
                    </option>
                    <option name="department" value="Sales">
                      Sales
                    </option>
                    <option name="department" value="Finances">
                      Finances
                    </option>
                    <option name="department" value="Trial">
                      Trial
                    </option>
                    <option name="department" value="Recruitment">
                      Recruitment
                    </option>
                  </select>
                </div>
                <div className="col-5">
                  <label htmlFor="departmentInput" className="form-label">
                    Role
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    id="departmentSelect"
                    name="role"
                    onChange={handleChange}
                  >
                    <option value={-1}>Select role</option>
                    <option defaultValue="Admin" name="role">
                      Admin
                    </option>
                    <option defaultValue="Head of Department" name="role">
                      Head of Department
                    </option>
                    <option defaultValue="Account Manager" name="role">
                      Account Manager
                    </option>
                    <option defaultValue="Virtual Assistant" name="role">
                      Virtual Assistant
                    </option>
                    <option defaultValue="Department Member" name="role">
                      Department member
                    </option>
                  </select>
                </div>
              </div>
              {/* Virtual Assistant conditions */}
              <div
                className={`pt-3 pb-3 pe-3 d-flex border-bottom ${
                  editedUser.role === "Virtual Assistant" ? "" : "d-none"
                }`}
              >
                <div className="col-2 align-bottom">
                  Pricing and availability
                </div>
                <div className="col-5 me-3">
                  <label htmlFor="rateInput" className="form-label">
                    Hourly rate
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="rateInput"
                    min={1}
                    max={20}
                    name="hourly_rate"
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="col-5">
                  <label htmlFor="availabilityInput" className="form-label">
                    Weekly availability
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="availabilityInput"
                    min={10}
                    max={45}
                    name="weekly_availability"
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <div className="form-check form-switch">
                <label className="form-check-label" htmlFor="activeCheck">
                  Currently active?
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="activeCheck"
                  name="is_active"
                  value={true}
                  onChange={() => {
                    setEditedUser({
                      ...editedUser,
                      is_active: !editedUser.is_active,
                    });
                  }}
                />
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-secondary me-3"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleEdit}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
