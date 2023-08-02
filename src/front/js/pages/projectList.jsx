import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";

export const One_project = () => {
  let navigate = useNavigate();
  const [project, setProject] = useState([]);
  const { store } = useContext(Context);
  const { token } = store;

function handleProject(event, str) {
  event.target.project_id === `${str}-button`
}

useEffect(() => {

  if (token) {
    const getProject = async () => {
      try {
        let response = await fetch(`${process.env.BACKEND_URL}/api/projects`);
        let data = await response.json();
        console.log(data);
        setProject(data);

      } catch (error) {
        console.log(error);
      }
    }
    getProject();
  } 
}, []);

  return (
    <>
      <div className="Container justify-content-center">
      <div className="row col-1 m-3">
          <Link
            to={`/projects/`}
            type="button"
            className="btn btn-success p-0"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
        </div>
        <div className="col 12 "> 
        {project.map((project, index) => {
              return (
                <div className="card m-4">
                  <h5 className="card-header">Project Name: {project.project_name}</h5>
                  <div className="card-body">
                    <h5 className="card-title">Description: {project.description}</h5>
                    <p className="card-text">
                      Account Manager: {project.account_manager_id}
                    </p>
                    <p className="card-text">Assistant: {project.assistant_id}</p>
                    <p className="card-text">Customer: {project.customer_id}</p>
                    <p className="card-text">Created at: {project.created_at}</p>
                  </div>
                </div>
              );
            })}         
          
        </div>
      </div>
    </>
  );
};
