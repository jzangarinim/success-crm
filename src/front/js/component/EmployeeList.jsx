import React, { useState, useEffect } from "react";
import test_users from "C://4GeeksAcademy/MOCK_DATA_USERS.json";

export const EmployeeList = (props) => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    /* const postEmployees = async () => {
      for await (let example of test_users) {
        try {
          let response = await fetch(`${process.env.BACKEND_URL}/api/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: `${example.name}`,
              last_name: `${example.last_name}`,
              email: `${example.email}`,
              password: `${example.password}`,
              department: `${example.department}`,
              role: `${example.role}`,
              city: `${example.city}`,
              country: `${example.country}`,
              is_active: `${example.is_active}`,
            }),
          });
        } catch (error) {}
      }
    };
    postEmployees(); */
    const getEmployees = async () => {
      try {
        let response = await fetch(`${process.env.BACKEND_URL}/api/users`);
        let data = await response.json();
        // Sorts employees by department role (Head > Member)
        //const aux = [...data].sort((a, b) => (a.role > b.role ? -1 : 1));
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
