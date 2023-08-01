import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const ProjectList = (props) => {
    const { store, actions } = useContext(Context);
    const { user, project } = store;
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        const getProject = async () => {
            try {
            let response = await fetch(`${process.env.BACKEND_URL}/api/projects`);
            let data = await response.json();
            let aux = [];
            if (user.role === "Admin" ||
            user.role === 'Head of Department' ||
            user.role === 'Account Manager' ||
            user.role === 'Virtual Assistant' ){

                aux = data.filter((proj) => {
                return ( 
                    
                );
                });
                setProjectList(aux);
            } 
            // setProjectList(aux);
            } catch (error) {
            console.log(error);
            }
        };
        getProject();
        }, []);
        return (
        <>
            <select
            className="form-select mt-1"
            aria-label="Default select example"
            id={`select${props.project_name}`}
            >
            <option key={-1} value={-1} defaultValue>{`Select project`}</option>
            {projects.map((project, index) => {
                return (
                <option key={project?.id} value={project?.id}>
                    {`${project?.project_name} ${project?.description}`}
                </option>
                );
            })}
            </select>
        </>
      );
    };

//     return (
//         <>
//         <div className="Container justify-content-center">
//             <div className="card">
//                 <h5 className="card-header">Project Name: {project.project_name}</h5>
//                 <div className="card-body">
//                     <h5 className="card-title">Description: {project.description}</h5>
//                     <p className="card-text">Account Manager ID: {project.account_manager_id}</p>
//                     <p className="card-text">Assistant ID: {project.assistant_id}</p>
//                     <p className="card-text">Costumer ID: {project.customer_id}</p>
//                     <p className="card-text">Created at: {project.created_at}</p>

//                     <Link to="/projects">Go back to all Projects</Link>
//                 </div>
//             </div>
//         </div>
//         </>
//     )

// }