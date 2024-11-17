import React, { useState , useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import '../App.css';
import Settings from '../settings'; // If Settings is a regular object, import it directly
import axios from 'axios';

function Port() {
    const [portValue, setPortValue] = useState("");
    const [baudRateValue, setBaudRateValue] = useState("");
    const navigate = useNavigate();
   
    useEffect(() => {
      retrievePortSettings();
    }, "");


    const handlePortChange = (event) => {
    event.target.name === 'portNo'
     ? setPortValue(event.target.value) : setBaudRateValue(event.target.value);
    };


    const retrievePortSettings = () => {
      axios
        .get(`${Settings.serviceHost}:${Settings.servicePort}/getPortBaudRate`)
        .then(function (response) {
          const portValue = response?.data[0].port;

          setPortValue(portValue);

          const baudRateValue = response?.data[0].baudrate;
          setBaudRateValue(baudRateValue);

        })
        .catch(function (error) {
          console.log(error);
        });
    };
    
      const savePortvalue = () => {
        localStorage.setItem("portValue", portValue);
        localStorage.setItem("baudRateValue", baudRateValue);
       
        const dataToSend = {
          "port": portValue ,
          "baudrate" : baudRateValue
        };

        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        };
        const apiUrlBrand = `${Settings.serviceHost}:${Settings.servicePort}/setPortBaudRate`;
        fetch(apiUrlBrand, options)
          .then((response) => response.json()) 
          .catch((err) => console.error(err));

        alert("Port and BaudRate value saved!");

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
              name="portNo"
              value={portValue}
              onChange={handlePortChange}
              placeholder="Set Port"
            />
          </div>

          <div className="my-4 mx-4">
            Set BaudRate {" "}
            <input
              type="number"
              name="BaudRate"
              value={baudRateValue}
              onChange={handlePortChange}
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
              onClick={() => savePortvalue()}
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
