import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";
import { BackButton } from "../component/BackButton.jsx";

export const One_project = () => {
  let navigate = useNavigate();
  const [project, setProject] = useState([]);
  const { store } = useContext(Context);
  const { token } = store;
  let { project_id } = useParams();

  useEffect(() => {
    if (token) {
      const getProject = async () => {
        try {
          let response = await fetch(
            `${process.env.BACKEND_URL}/api/projects/${project_id}`
          );
          let data = await response.json();
          setProject(data);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      };
      getProject();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="Container justify-content-center">
        <BackButton />
        <div className="col 12 ">
          <div className="card m-4">
            <h5 className="card-header">
              Project Name: {project.project_name}
            </h5>
            <div className="card-body">
              <h5 className="card-title">Description: {project.description}</h5>
              <p className="card-text">
                Account Manager: {project.account_manager_id}
              </p>
              <p className="card-text">Assistant: {project.assistant_id}</p>
              <p className="card-text">Customer: {project.customer_id}</p>
              <p className="card-text">Created at: {project.start_date}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
