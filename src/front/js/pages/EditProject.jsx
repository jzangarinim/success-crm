import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import test_projects from "C://4GeeksAcademy/MOCK_DATA.json";
import { EmployeeList } from "../component/EmployeeList.jsx";

export const EditProject = () => {
  let navigate = useNavigate();
  const { store } = useContext(Context);
  const { user } = store;
  const [project, setProject] = useState({});
  let { project_id } = useParams();

  function formatDate(date) {
    let aux = new Date(date);
    let result = aux.toLocaleDateString("en-GB");
    return result;
  }
  async function handleSubmit() {
    let title = document.getElementById("projectTitleInput").value;
    let manager = document.getElementById("selectHead").value;
    let assistant = document.getElementById("selectVirtual").value;
    console.log(title, manager, assistant);
  }
  useEffect(() => {
    let aux = test_projects.find((item) => item.id === parseInt(project_id));
    setProject(aux);
  }, []);
  return (
    <>
      <div className="container-fluid col-9 mt-3">
        <div className="row col-1 mb-3">
          <Link type="button" className="btn btn-success p-0" to="/projects">
            {`< Go back`}
          </Link>
        </div>
        <div className="row">
          <div className="card mb-3 p-0 border border-warning">
            <div className="row g-0">
              <div className="col-md-12">
                <div className="card-body">
                  <div className="mb-3">
                    <input
                      type="text"
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
                        ► Manager: {project?.account_manager_name}
                        <EmployeeList role="Head" />
                      </div>
                      <div className="text-body-secondary mb-3 me-3">
                        ► Assistant: {project?.assistant_name}
                        <EmployeeList role="Virtual" />
                      </div>
                      <div className="text-body-secondary mb-3 me-3">
                        ► Customer: {project?.customer_name}
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
    </>
  );
};
