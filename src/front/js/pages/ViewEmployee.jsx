import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import profilePicture from "../../img/Default_pfp.jpg";

export const ViewEmployee = () => {
  const [employee, setEmployee] = useState({});
  const [projects, setProjects] = useState({});
  let { id } = useParams();
  console.log(employee, projects);
  useEffect(() => {
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
  }, []);
  return (
    <>
      <div className="container-fluid col-9 mt-3">
        <div className="row col-1 mb-3">
          <Link
            to={`/employees/#${id}`}
            type="button"
            className="btn btn-success p-0"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
        </div>
        <div className="row">
          <div className="card mb-3 p-0 border border-warning">
            <div className="card-body">
              <div className="mb-3 d-flex align-items-end border-bottom">
                <h1 className="border-end pe-3 me-3">
                  {employee.name} {employee.last_name}
                </h1>
                <h1>
                  {employee.department} - {employee.role}
                </h1>
              </div>
              <div className="d-flex justify-content-center">
                <div className="col-3 border-end p-3">
                  <img
                    src={profilePicture}
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-9 card-text ms-3 me-3">
                  <h5 className="card-title fs-4">Description</h5>
                  <textarea
                    type="text"
                    className="form-control"
                    id="projectDescriptionInput"
                    defaultValue={"a"}
                    placeholder="Project Description"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
