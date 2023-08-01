import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Dashboard = () => {
    let navigate = useNavigate();
    
    useEffect(() => {
        if (token) {
            if (
            user.role != "Admin" &&
            user.role != "Head of Department" &&
            user.role != "Account Manager"
            ) {
            navigate("/dashboard");
            }
        } else {
            navigate("/");
            return jsonify({"message":"You are not allow to navigate here"})
        }
        }, []);

    return (
        <>
            <div className="container">
                <div className="col 12 mt-3">
                    <div className="row mb-3">
                        <div className="d-grid gap-3">
                            <button className="btn btn-success" type="button"><Link to="/projects">Go to Projects</Link></button>
                            <button className="btn btn-success" type="button"><Link to="/employees">Go to Employees</Link></button>
                            <button className="btn btn-success" type="button"><Link to="/customers">Go to Customers</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}