import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const ProjectList = (props) => {
    const { store, actions } = useContext(Context);
    const { user, token } = store;
    const [project, setProject] = useState([]);

    useEffect(() => {
        if (token) {
          const getProjects = async () => {
            try {
                let response = await fetch(`${process.env.BACKEND_URL}/api/projects`);
                let data = await response.json();
                setProject();
                }
            catch (error) {
                console.log(error);
            }
            getProjects();
            }
        }}, []);

    return (
        <>
        <div className="Container justify-content-center">
            <div className="card">
                <h5 className="card-header">Project Name: {project.project_name}</h5>
                <div className="card-body">
                    <h5 className="card-title">Description: {project.description}</h5>
                    <p className="card-text">Account Manager: {project.account_manager_id}</p>
                    <p className="card-text">Assistant: {project.assistant_id}</p>
                    <p className="card-text">Costumer: {project.customer_id}</p>
                    <p className="card-text">Created at: {project.created_at}</p>

                    <Link to="/projects">Go back to all Projects</Link>
                </div>
            </div>
        </div>
        </>
    )

}