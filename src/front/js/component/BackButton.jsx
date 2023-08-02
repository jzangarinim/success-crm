import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const BackButton = () => {
  let navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  return (
    <>
      <div className="row col-1 mt-3 mb-3">
        <button
          type="button"
          className="btn btn-success p-0"
          onClick={handleBack}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      </div>
    </>
  );
};
