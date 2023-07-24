import React, { useState, useEffect } from "react";

export const EmployeeList = (props) => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const getEmployees = async () => {
      try {
        let response = await fetch(`${process.env.BACKEND_URL}/api/users`);
        let data = await response.json();
        let aux = [];
        if (props.role === "Head") {
          aux = data.filter((emp) => {
            return (
              emp.role === "Head of Department" ||
              emp.role === "Account Manager"
            );
          });
          setEmployees(aux);
        } else if (props.role === "Virtual") {
          aux = data.filter((emp) => {
            return emp.role === "Virtual Assistant";
          });
        }
        setEmployees(aux);
      } catch (error) {
        console.log(error);
      }
    };
    getEmployees();
  }, []);
  return (
    <>
      <select
        className="form-select mt-1"
        aria-label="Default select example"
        id={`select${props.role}`}
      >
        <option key={-1} value={-1} defaultValue>{`Select agent`}</option>
        {employees.map((employee, index) => {
          return (
            <option key={employee?.id} value={employee?.id}>
              {`${employee?.name} ${employee?.last_name}`}
            </option>
          );
        })}
      </select>
    </>
  );
};
