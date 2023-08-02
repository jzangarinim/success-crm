import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import { EmployeeList } from "../component/EmployeeList.jsx";
import { BackButton } from "../component/BackButton.jsx";

export const EditProject = () => {
  const { store, actions } = useContext(Context);
  const { user, token } = store;
  const { editProject } = actions;
  const [project, setProject] = useState({});
  const location = useLocation();
  const { data } = location.state || {};
  let { project_id } = useParams();
  let navigate = useNavigate();

  function formatDate(date) {
    let aux = new Date(date);
    let result = aux.toLocaleDateString("en-GB");
    return result;
  }
  async function handleSubmit() {
    let title = document.getElementById("projectTitleInput").value;
    let manager = document.getElementById("selectHead").value;
    let assistant = document.getElementById("selectVirtual").value;
    let description = document.getElementById("projectDescriptionInput").value;
    let response = await editProject(
      project_id,
      title,
      manager,
      assistant,
      project.customer_id,
      description,
      project.start_date,
      project.end_date
    );
    if (response) {
      console.log("Project edited successfully!");
    }
  }

  useEffect(() => {
    if (token) {
      if (
        user.role != "Admin" &&
        user.role != "Head of Department" &&
        user.role != "Account Manager"
      ) {
        navigate("/projects");
      }
      async function getProject() {
        try {
          let response = await fetch(
            `${process.env.BACKEND_URL}/api/projects/${project_id}`
          );
          let data = await response.json();
          setProject(data);
        } catch (error) {}
      }
      getProject();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      {data && (
        <div className="container-fluid col-9 mt-3">
          <BackButton />
          <div className="row">
            <div className="card mb-3 p-0 border border-warning">
              <div className="row g-0">
                <div className="col-md-12">
                  <div className="card-body">
                    <div className="mb-3">
                      <input
                        type="text"
                        required
                        className="form-control"
                        id="projectTitleInput"
                        defaultValue={project?.project_name}
                        placeholder="Project Title"
                      />
                    </div>
                    {/* <div className="border-bottom">
                    <h5 className="card-title fs-1">{project?.project_name}</h5>
                  </div> */}
                    <div className="d-flex justify-content-center mt-3 ms-3">
                      <div className="col-3 border-end">
                        <div className="text-body-secondary mb-3 me-3">
                          ► Manager: {data?.account_manager_id}
                          <EmployeeList role="Head" />
                        </div>
                        <div className="text-body-secondary mb-3 me-3">
                          ► Assistant: {data?.assistant_id}
                          <EmployeeList role="Virtual" />
                        </div>
                        <div className="text-body-secondary mb-3 me-3">
                          ► Customer: {data?.customer_id}
                        </div>
                        <div className="text-body-secondary mb-3 me-3">
                          ► Start date: {formatDate(project?.start_date)}
                        </div>
                        <div className="text-body-secondary mb-3 me-3">
                          ► End date:{" "}
                          {project?.end_date === null
                            ? "Ongoing"
                            : formatDate(project?.end_date)}
                        </div>
                      </div>
                      <div className="col-9 card-text ms-3 me-3">
                        <h5 className="card-title fs-4">Description</h5>
                        <textarea
                          type="text"
                          className="form-control"
                          id="projectDescriptionInput"
                          defaultValue={project?.description}
                          placeholder="Project Description"
                        ></textarea>
                      </div>
                    </div>
                    <div className="float-end mb-3 mt-3">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleSubmit}
                      >
                        Submit changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
