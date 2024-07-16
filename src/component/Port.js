import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import '../App.css';
import Settings from '../settings'; // If Settings is a regular object, import it directly


function Port() {
    const [portValue, setPortValue] = useState("");
    const [baudRateValue, setBaudRateValue] = useState("");
    const navigate = useNavigate();

    const handlePortChange = (event) => {
        setPortValue(event.target.value);
      };
    
      const savePortvalue = () => {
        localStorage.setItem("portValue", portValue);
        alert("Port value saved!");
      };
    
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid title">
            <a className="navbar-brand title" href="#">
              <h1>WELCOME TO MP&AD ENTERPRISES</h1>
            </a>
          </div>
        </nav>
        <div className="my-4 mx-4">
          <div className="my-4 mx-4">
            Set Port Value {" "}
            <input
              type="text"
              value={portValue}
              onChange={handlePortChange}
              placeholder="Set Port"
            />
            <button onClick={savePortvalue}>Save Port Value</button>
          </div>

          <div className="my-4 mx-4">
            Set BaudRate {" "}
            <input
              type="number"
              name="BaudRate"
              id="footer-remarks"
              placeholder="Set BaudRate"
            />
          </div>

          <div>
            <input
              className="mx-2"
              type="submit"
              value="Save"
              id="footerSaveBtn"
            />
            <input
              type="submit"
              value="Back"
              id="footerBackBtn"
              onClick={() => navigate(-1)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Port;
