import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/projects.css";
import { BackButton } from "../component/BackButton.jsx";

export const Projects = () => {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState("");
  const { store, actions } = useContext(Context);
  const { deleteProject } = actions;
  const { user, token } = store;

  function handleProjectClick(id) {
    navigate(`/projects/${id}`);
  }
  async function handleDelete() {
    if (user.role === "Admin") {
      let response = deleteProject(clicked);
      if (response) {
        setClicked("");
        window.location.reload();
      }
    }
  }

  useEffect(() => {
    if (token) {
      const getProjects = async () => {
        try {
          let response = await fetch(`${process.env.BACKEND_URL}/api/projects`);
          let data = await response.json();
          // Sorts projects by id
          const aux = [...data].sort((a, b) =>
            a.project_id > b.project_id ? 1 : -1
          );
          setData(aux);
        } catch (error) {
          console.log(error);
        }
      };
      getProjects();
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
            <h1 className="text-success">Projects</h1>
            <Link
              to="/projects/create"
              type="button"
              className={`btn btn-success ${
                user.role != "Admin" ? "d-none" : ""
              }`}
            >
              Add a project
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
                <th scope="col">Project Name</th>
                <th scope="col">Project Manager</th>
                <th scope="col">Assigned VA</th>
                <th scope="col">Customer</th>
                <th
                  scope="col"
                  style={{ width: 80 + "px" }}
                  className={`${user.role != "Admin" ? "d-none" : ""}`}
                ></th>
              </tr>
            </thead>
            <tbody>
              {data.map((project, index) => {
                return (
                  <tr key={index}>
                    <th scope="row" className="text-center">
                      {project.project_id}
                    </th>
                    <td
                      className="project-name"
                      onClick={() => handleProjectClick(project.project_id)}
                    >
                      {project.project_name}
                    </td>
                    <td>{project.account_manager_id}</td>
                    <td>{project.assistant_id}</td>
                    <td>{project.customer_id}</td>
                    <td
                      className={`d-flex justify-content-center ${
                        user.role != "Admin" ? "d-none" : ""
                      }`}
                    >
                      {/* Edit button */}
                      <Link
                        to={`/projects/edit/${project.project_id}`}
                        state={{ data: project }}
                        type="button"
                        className="btn btn-secondary me-1"
                        id={`edit-button${index}`}
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </Link>
                      {/* Delete button */}
                      <button
                        type="button"
                        className="btn btn-danger"
                        id={`delete-button${index}`}
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                        onClick={() => setClicked(project.project_id)}
                      >
                        <i
                          className="fa-solid fa-trash"
                          onClick={() => setClicked(project.project_id)}
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
      {/* Delete modal */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this project? This can't be undone
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Yes, delete this project
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
