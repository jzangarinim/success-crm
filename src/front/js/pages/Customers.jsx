import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import profilePicture from "../../img/Default_pfp.jpg";

export const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [original, setOriginal] = useState();
  const { store } = useContext(Context);
  const { token } = store;
  let navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const getCustomers = async () => {
        try {
          let response = await fetch(
            `${process.env.BACKEND_URL}/api/customers`
          );
          let data = await response.json();
          const aux = [...data].sort((a, b) => (a.id > b.id ? 1 : -1));
          setCustomers(aux);
          setOriginal(aux);
        } catch (error) {
          console.log(error);
        }
      };
      getCustomers();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex flex-wrap justify-content-center">
            {customers.map((customer, index) => {
              return (
                <div className="card col-5 mt-3 me-3" key={index}>
                  <div className="row g-0 d-flex">
                    <div className="col-3 mt-3 ms-3 mb-3">
                      <img
                        src={profilePicture}
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className="col-7 w-auto">
                      <div className="card-body">
                        <h5 className="card-title">{`${customer?.company_name}`}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">
                          {`${customer?.company_address} - ${customer?.country}`}
                        </h6>
                        <p className="card-text">{`Rep.: ${customer?.representative_name}`}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
