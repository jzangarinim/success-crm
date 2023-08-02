import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { EmployeeList } from "../component/EmployeeList.jsx";
import { Link, useNavigate } from "react-router-dom";

export const Create_project = () => {
  const { actions, store } = useContext(Context);
  const { token } = store;
  let navigate = useNavigate();
  const [project, setProject] = useState({
    project_name: "",
    account_manager_id: "",
    assistant_id: "",
    customer_id: "",
    description: "",
  });

  const handleProjects = (event) => {
    setProject({ ...project, [event.target.name]: event.target.value });
  };

  function registerProject() {
    let title = document.getElementById("project_nameInput").value;
    let managerId = document.getElementById("selectHead").value;
    let assistantId = document.getElementById("selectVirtual").value;
    let customerId = document.getElementById("customer_idInput").value;
    let description = document.getElementById("descriptionInput").value;
    let response = actions.Project(
      title,
      managerId,
      assistantId,
      customerId,
      description
    );
    if (response) {
      navigate("/projects");
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="row col-1 mb-3 mt-3">
          <Link type="button" className="btn btn-success p-0" to="/projects">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
        </div>
        <div className="mb-3">
          <label htmlFor="project_nameInput" className="form-label">
            Project Name
          </label>
          <input
            type="text"
            required
            className="form-control"
            id="project_nameInput"
            value={project.project_name}
            name="project_name"
            onChange={handleProjects}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Account Manager ID</label>
          <EmployeeList role="Head" />
        </div>
        <div className="mb-3">
          <label className="form-label">Assistant ID</label>
          <EmployeeList role="Virtual" />
        </div>
        <div className="mb-3">
          <label htmlFor="customer_idInput" className="form-label">
            Customer ID
          </label>
          <input
            type="number"
            required
            className="form-control"
            id="customer_idInput"
            value={project.customer_id}
            name="customer_id"
            onChange={handleProjects}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descriptionInput" className="form-label">
            Project Description
          </label>
          <textarea
            className="form-control"
            rows="3"
            id="descriptionInput"
            value={project.description}
            name="description"
            onChange={handleProjects}
          ></textarea>
        </div>
        <div className="row d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-primary"
            onClick={registerProject}
          >
            Register Project
          </button>
        </div>
      </div>
    </>
  );
};
