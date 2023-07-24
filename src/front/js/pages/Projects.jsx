import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/projects.css";

export const Projects = () => {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const { store } = useContext(Context);
  const { user } = store;

  function handleEdit(event) {
    if (
      event.target.id.includes("edit") ||
      event.target.parentNode.id.includes("edit")
    ) {
      if (user.role === "Admin" || user.role === "Head of Department") {
        navigate("/projects/edit");
      }
    }
  }
  function handleProjectClick(id) {
    navigate(`/projects/${id}`);
  }
  function handleDelete(event) {
    if (
      event.target.id.includes("delete") ||
      event.target.parentNode.id.includes("delete")
    ) {
      if (user.role === "Admin") {
        console.log("You have permission to delete");
      }
    }
  }

  useEffect(() => {
    const getProjects = async () => {
      try {
        let response = await fetch(`${process.env.BACKEND_URL}/api/projects`);
        let data = await response.json();
        // Sorts employees by department role (Head > Member)
        const aux = [...data].sort((a, b) =>
          a.project_id > b.project_id ? 1 : -1
        );
        setData(aux);
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row mt-3 d-flex justify-content-center">
          <div className="p-0 d-flex justify-content-between align-items-center">
            <h1 className="text-success">Projects</h1>
            <button
              type="button"
              className={`btn btn-success ${
                user.role != "Admin" ? "d-none" : ""
              }`}
            >
              Add a project
            </button>
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
                      <Link
                        to={`/projects/edit/${project.project_id}`}
                        type="button"
                        className="btn btn-secondary me-1"
                        id={`edit-button${index}`}
                        onClick={handleEdit}
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </Link>
                      <button
                        type="button"
                        className="btn btn-danger"
                        id={`delete-button${index}`}
                        onClick={handleDelete}
                      >
                        <i className="fa-solid fa-trash"></i>
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
