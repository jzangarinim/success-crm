import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import profilePicture from "../../img/Default_pfp.jpg";
import { BackButton } from "../component/BackButton.jsx";

export const ViewEmployee = () => {
  let navigate = useNavigate();
  const [employee, setEmployee] = useState({});
  const [projects, setProjects] = useState([]);
  const { store } = useContext(Context);
  const { token } = store;
  let { id } = useParams();

  function handleProjectClick(id) {
    navigate(`/projects/${id}`);
  }

  useEffect(() => {
    if (token) {
      async function getEmployee() {
        try {
          let response = await fetch(
            `${process.env.BACKEND_URL}/api/users/${id}`
          );
          let data = await response.json();
          setEmployee(data);
        } catch (error) {}
      }
      async function getProjects() {
        try {
          let response = await fetch(
            `${process.env.BACKEND_URL}/api/users/${id}/projects`
          );
          let data = await response.json();
          setProjects(data);
        } catch (error) {}
      }
      getEmployee();
      getProjects();
    } else {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="container-fluid col-7 mt-3">
        <BackButton />
        <div className="row">
          <div className="card mb-3 p-0 border border-warning">
            <div className="card-body">
              <div className="mb-3 border-bottom">
                <h1 className="pe-3 me-3">
                  {employee.name} {employee.last_name}
                </h1>
                <h3>
                  {employee.department} - {employee.role}
                </h3>
              </div>
              <div className="d-flex justify-content-center">
                <div className="col-4 border-end p-3">
                  <img
                    src={profilePicture}
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-8 card-text ms-3 me-3">
                  <div className="text-body-secondary mb-3 me-3">
                    ► Name: {employee?.name}
                  </div>
                  <div className="text-body-secondary mb-3 me-3">
                    ► Last name: {employee.last_name}
                  </div>
                  <div className="text-body-secondary mb-3 me-3">
                    ► email: {employee?.email}
                  </div>
                  <div className="text-body-secondary mb-3 me-3">
                    ► Location: {employee?.city}, {employee?.country}
                  </div>
                  <div className="text-body-secondary mb-3 me-3">
                    ► Department: {employee?.department}
                  </div>
                  <div className="text-body-secondary mb-3 me-3">
                    ► Role: {employee?.role}
                  </div>
                  <div
                    className={`text-body-secondary mb-3 me-3 ${
                      employee?.role === "Virtual Assistant" ? "" : "d-none"
                    }`}
                  >
                    ► Hourly rate (USD):{" "}
                    {employee?.hourly_rate ? employee?.hourly_rate : "N/A"}
                  </div>
                  <div
                    className={`text-body-secondary mb-3 me-3 ${
                      employee?.role === "Virtual Assistant" ? "" : "d-none"
                    }`}
                  >
                    ► Weekly availability (hours):{" "}
                    {employee?.weekly_availability
                      ? employee?.weekly_availability
                      : "N/A"}
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <h3>Related projects</h3>
              <table className="mt-1 table table-sm table-striped table-light table-hover table-bordered align-middle">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ width: 35 + "px" }}
                    >
                      #
                    </th>
                    <th scope="col">Project Name</th>
                    <th scope="col">Project Manager</th>
                    <th scope="col">Assigned VA</th>
                    <th scope="col">Customer</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => {
                    return (
                      <tr key={project?.project_id}>
                        <th scope="row" className="text-center">
                          {project.project_id}
                        </th>
                        <td
                          className="project-name"
                          onClick={() =>
                            handleProjectClick(project?.project_id)
                          }
                        >
                          {project?.project_name}
                        </td>
                        <td>{project.account_manager_id}</td>
                        <td>{project.assistant_id}</td>
                        <td>{project.customer_id}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
