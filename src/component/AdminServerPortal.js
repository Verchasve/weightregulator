import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function AdminServerPortal() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <body>
          <nav
            className="navbar navbar-expand-lg navbar-dark bg-dark"
            style={{ alignContent: "center" }}
          >
            <div className="container-fluid title">
              <a className="navbar-brand title" href="#">
                <h1>MP&AD ENTERPRISES</h1>
              </a>
            </div>
          </nav>
          <center>
            <div className="container mx-2">
              <div className="mx-3 my-3">
                <div>
                  <h1>Welcome To Admin Portal</h1>
                </div>
                {/* <!-- production sheet table screen monitoring via admin computer on company server --> */}
                <div style={{ color: "black" }}>
                  <table
                    border="2"
                    className="table table-success table-striped"
                  >
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">UBIN</th>
                        <th scope="col">Tank Weight</th>
                        <th scope="col">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="container">
               
                  <button className="btn btn-dark mx-2" onClick={() => navigate("/settingss")}>
                    Settings
                  </button>
               
              
                  <button className="btn btn-dark mx-2" onClick={() => navigate("/correction")}>
                    Correction
                  </button>
               
              
                  <button className="btn btn-dark mx-2" onClick={() => navigate(-1)}>Back</button>
               
               
                  <button  className="btn btn-dark mx-2" onClick={() => navigate("/dataReport")}>
                    DataReport
                  </button>

                  <button  className="btn btn-dark mx-2" onClick={() => navigate("/configuration")}>
                    Configuration
                  </button>
              
              </div>
            </div>
          </center>
        </body>
      </div>
    </>
  );
}
