import React from "react";
import { useNavigate } from "react-router-dom";

function Configuration() {
  const navigate = useNavigate();
  return (
    <>
      <div>
      <nav
            className="navbar navbar-expand-lg navbar-dark bg-dark"
            style={{ alignContent: "center" }}
          >
            <div className="container-fluid title">
              <a className="navbar-brand title" href="#">
              <h3>Configuration</h3>
              </a>
            </div>
          </nav>
        <div>
          <form className="container my-3">
           

            <br />
            <label htmlFor="title" className="form-label mx-3">
              <strong> Set Zero Check Value </strong>
            </label>
            <br />
            <br />
            <input type="text" />
            <button className="mx-2" type="submit">
              Save
            </button>
            {/* <button onClick={() => navigate(-1)}>Back </button> */}
          </form>

          <div className="container my-3">
            <ul
              style={{
                verticalAlign: "auto",
                width: "fit-content",
                alignSelf: "center",
                alignItems: "flex-end",
                backgroundColor: "beige",
                borderColor: "beige",
                borderWidth: "1px",
                borderStyle: "solid",
                borderRadius: "5%",
              }}
            ></ul>

            <div className="my-3">
              <button onClick={() => navigate(-1)}>Back </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Configuration;
