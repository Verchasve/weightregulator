import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import md5 from "md5";
import PdfGenerator from "./PdfRenderer";
import Modal from "react-modal";
import Table from "react-bootstrap/Table";

const ProdTable = ({ drnNumber }) => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [socket, setSocket] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState("");
  const { state } = useLocation();
  const [serialNumber, setSerialNumber] = useState(1); // Initialize serial number
  const [ubin, setUbin] = useState(""); // Unique Batch Identification Number
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false);
  const [buttonColor, setButtonColor] = useState("grey");
  const [rejectedBtnClr, setRejectedBtnClr] = useState("grey");
  const [connectionStatus, setConnectionStatus] = useState("disconnected"); // New state for connection status
  
  useEffect(() => {  
    const updateDateTime = () => {
      const now = new Date(); // New state for connection status
      const dateOptions = { year: "numeric", month: "long", day: "numeric" };
      const timeOptions = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      setCurrentDate(now.toLocaleDateString(undefined, dateOptions));
      setCurrentTime(now.toLocaleTimeString(undefined, timeOptions));
      
    };
    const intervalId = setInterval(updateDateTime, 1000);
    return () => {
      clearInterval(intervalId);
      
    };
  }, []);

  const [isSocketOpen, setIsSocketOpen] = useState(false);

  const connectToServer = () => {
    const socket = new WebSocket("ws://localhost:4001");
    let check = false;

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      setIsSocketOpen(true);
      setConnectionStatus("connected");
      setReceivedMessage("connected");
      setSocket(socket);
    };

    socket.onmessage = (event) => {
      if (event.data.includes("Kg")) {
        setReceivedMessage(event.data);
        const weight = parseFloat(event.data.replace("Kg", ""));
        if (weight >= 0.0 && weight <= 2.0) {
          setIsAddButtonDisabled(true);
          check = true;
        } else {
          if (check) {
            setIsAddButtonDisabled(false);
            setButtonColor("green");
            setRejectedBtnClr("yellow");
            check = false;
          }
        }
      } else {
        setReceivedMessage("Connected waiting...."); 
      }
    };

    
  };

 
// Improve the following code such that change the state of the socket from null to open when reconnecting to the server by calling connectToServer() function after disconnecting from the server by call of disconnectToServer() function
  
  const disconnectToServer = () => {
    if (socket) {
      socket.close(); 
      setIsSocketOpen(false);
      
      socket.onclose = () => {
        console.log("Disconnected from WebSocket server");
        setConnectionStatus("disconnected");
        setReceivedMessage("Disconnected");
      };

      setSocket(null);
    }
  };

  // change done 05-02-2024 generate ubin code

  const generateUbin = () => {
    // Generate UBIN based on selected values and current data/time
    const selectedOperatorValue = state?.selectedOperatorValue || "";
    const selectedBrandValue = state?.selectedBrandValue || "";
    const selectedSizeValue = state?.selectedSizeValue || "";
    const selectedLayerValue = state?.selectedLayerValue || "";
    const selectedColorValue = state?.selectedColorValue || "";
    // Combine selected values and current date/time to generate UBIN
    const combinedData = `${selectedOperatorValue}-${selectedBrandValue}-${selectedSizeValue}-${selectedLayerValue}-${selectedColorValue}-${receivedMessage}-${currentDate}-${currentTime}`;

    console.log("combinedData =", combinedData);

    // Hash the combinedData to a unique alphanumeric string using md5
    const hashedData = md5(combinedData);
    console.log("hashedData", hashedData);

    // Set the generated UBIN
    setUbin(combinedData);
  };

  // Add row to table when ADD button is clicked

  const addRow = () => {
    if (!isAddButtonDisabled) {
      generateUbin();
      const newRow = {
        serialNumber: serialNumber,
        ubin: Date.parse(new Date()),
        receivedMessage: receivedMessage,
        time: currentTime,
      };
      setTableData([...tableData, newRow]);
      setSerialNumber(serialNumber + 1);
      
      setReceivedMessage(receivedMessage);
      setPreview(newRow);
      setIsModalOpen(true);
      setIsAddButtonDisabled(true);
      setButtonColor("grey"); // Change button color to grey when clicked

    }
  };

  const addDrn = () => {
      const newRow = {
        serialNumber: serialNumber
      };
     
      setSerialNumber(serialNumber + 1);
      localStorage.setItem('drnNumber', serialNumber + 1);
    
  };
  // improve the following code such that

  const addRejectedRow = () => {
    if (!isAddButtonDisabled) {
      generateUbin();
      const newRow = {
        serialNumber: serialNumber,
        ubin: "Rejected",
        receivedMessage: receivedMessage,
        time: "Rejected",
        rejected: true,
      };
      setTableData([...tableData, newRow]);
      setSerialNumber(serialNumber + 1);
      setReceivedMessage(receivedMessage);
      setPreview(newRow);
      setIsModalOpen(true);
      setIsAddButtonDisabled(true);
      setRejectedBtnClr("grey"); // Change button color to red when clicked
    }
  };
    
  return (
    <>
      <div
        className="container-body"
        style={{ widows: "full", height: "fit-content" }}
      >
        <body>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid title">
              <p className="navbar-brand title" href="#">
                <h1>WELCOME TO MP&AD ENTERPRISES</h1>
              </p>
            </div>

            <button
              className="btn btn-outline-success addBtn mx-2"
              onClick={connectToServer}
            >
              Connect
            </button>

            <button
              className="btn btn-outline-danger addBtn mx-2"
              onClick={disconnectToServer}
            >
              DisConnect
            </button>


            <input
              type="text"
              className={` btn ${
                connectionStatus === "connected" ? "btn-success" : "btn-danger"
              }`}
              value={
                connectionStatus === "connected" ? "Connected" : "Disconnected"
              }
              readOnly
            />
          </nav>

          <center>
            <div className="container my-3">
              <div className="weight-container">
                <label for="RealTimeweightScreen" className="weightScreen">
                  DRt No :{" "}
                  <input
                    className="mx-3"
                    type="text"
                    placeholder="DRN"
                    value={drnNumber}
                    readOnly
                  />
                  <input
                    type="text"
                    name="weight-screen"
                    id="weightScreen"
                    className="weightScreen"
                    placeholder="Tank Weight in Kg Screen"
                    value={receivedMessage}
                    style={{
                      height: "2.5em",
                      fontSize: "2.5em",
                      fontWeight: "bolder",
                      textAlign: "center",
                      borderRadius: ".3em",
                    }}
                  />
                </label>

                {/* <!-- Add button will turn Green every time whenb the weight get added and fed in the production table --> */}
                <button
                  className={`btn ${
                    buttonColor === "green" ? "btn-success" : "btn-secondary"
                  } addBtn mx-2`}
                  id="ptAddBtn"
                  onClick={addRow}
                  disabled={isAddButtonDisabled}
                  style={{
                    height: "2em",
                    fontSize: "2em",
                    fontWeight: "bolder",
                    textAlign: "center",
                    borderRadius: ".3em"
                  }}
                 
                >
                  ADD
                </button>

                {/* <!-- By clicking on the Reject Button, The entries will turn red in the production table --> */}
                <button
                  className={`btn ${
                    rejectedBtnClr === "yellow"
                      ? "btn-warning"
                      : "btn-secondary"
                  } addBtn mx-2`}
                  id="ptReject"
                  onClick={addRejectedRow}
                  disabled={isAddButtonDisabled}
                >
                  Reject
                </button>

                {/* <button
                  className={`btn ${
                    buttonColor === "red" ? "btn-danger" : "btn-danger"
                  } addBtn mx-2`}
                  onClick={() => navigate(-1)}
                >
                  Finish{" "}
                </button> */}
              </div>

              <div className="my-3">
                <div className="osdtTable">
                  <input
                    className="mx-2"
                    type="text"
                    value={`Operator : ${state?.selectedOperatorvalue || ""}`}
                    id="print-op-name"
                    placeholder="Operator"
                    disabled
                  />
                  <input
                    className="mx-2"
                    type="text"
                    name=""
                    id="print-op-shift"
                    placeholder="Shift"
                    disabled
                  />

                  <input
                    className="mx-2"
                    type="text"
                    name=""
                    id="print-op-shift"
                    placeholder={currentDate}
                    disabled
                  />

                  <input
                    className="mx-2"
                    type="text"
                    name=""
                    id="print-op-shift"
                    placeholder={currentTime}
                    disabled
                  />
                </div>
              </div>

              <div className="my-2">
                <input
                  className="mx-2"
                  type="text"
                  value={`Brand : ${state?.selectedBrandValue || ""}`}
                  id="print-brand"
                  placeholder="Brand"
                  disabled
                />
                <input
                  className="mx-2"
                  type="text"
                  value={ `Size : ${state?.selectedSizeValue || ""}`}
                  id="print-size"
                  placeholder="Size"
                  disabled
                />
                <input
                  className="mx-2"
                  type="text"
                  value={`Layer : ${state?.selectedLayerValue || ""}`}
                  id="print-layer"
                  placeholder="Layer"
                  disabled
                />
                <input
                  className="mx-2"
                  type="text"
                  value={`Color : ${state?.selectedColorValue || ""}`}
                  id="print-color"
                  placeholder="Colour"
                  disabled
                />
              </div>
            </div>

            <div>
              <div className="container" id="productionTable">
                <br />

                <div
                  style={{
                    maxWidth: "100%",
                    height: "300px",
                    overflow: "auto",
                    boxSizing: "border-box",
                  }}
                >
                  <PdfGenerator data={tableData} drnNumber={drnNumber}>
                    <Table
                      striped
                      bordered
                      hover
                      border="2"
                      id="ptTable"
                      className="table table-success table-striped"
                      style={{ textAlign: "center" }}
                    >
                      <thead style={{ maxWidth: "100%" }}>
                        <tr>
                          <th scope="col" id="sName">
                            <b>Serial Number</b>
                          </th>
                          <th scope="col">
                            <b>UBIN</b>
                          </th>
                          <th scope="col">
                            <b>Tank Weight</b>
                          </th>
                          <th scope="col">
                            <b>Time</b>
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {/* Display table data */}
                        {tableData.map((row, index) => (
                          <tr
                            key={index}
                            className={row.rejected ? "rejected-row" : ""}
                          >
                            <td>{row?.serialNumber}</td>
                            <td>{row?.ubin}</td>
                            <td>{row?.receivedMessage}</td>
                            <td>{row?.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </PdfGenerator>

                  <Modal
                    style={{
                      overlay: {
                        width: "fit-content",
                        height: "fit-content",
                        top: "5%",
                        left: "60.5%",
                        transform: "translateX(50%)",
                        margin: "50px 0 0 100px",
                      },
                      content: {
                        width: "300px",
                        height: "fit-content",
                        backgroundColor: "#f2f2f2",
                        borderRadius: "10px",
                      },
                    }}
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    contentLabel="Contact Preview"
                  >
                    {preview && (
                      <div>
                        <h2>Print Preview</h2>
                        <p>DRT Number: {drnNumber}</p>
                        <p>UBIN: {preview?.ubin}</p>
                        <p>Tank Weight: {preview?.receivedMessage}</p>
                        <p>Time: {preview?.time}</p>
                        <p>Date: {currentDate}</p>
                        <p>Operator: {state?.selectedOperatorvalue}</p>
                        <p>Brand: {state?.selectedBrandValue}</p>
                        <p>Size: {state?.selectedSizeValue}</p>
                        <p>Layer: {state?.selectedLayerValue}</p>
                        <p>Color: {state?.selectedColorValue}</p>
                        <button onClick={() => setIsModalOpen(false)}>
                          QR Code
                        </button>
                      </div>
                    )}
                  </Modal>
                </div>
              </div>
            </div>
          </center>

          <button
            className={`btn ${
              buttonColor === "red" ? "btn-danger" : "btn-danger"
            } addBtn mx-2`}
            onClick={() => navigate(-1)}
          >
            Finish{" "}
          </button>
        </body>
      </div>
    </>
  );
};

export default ProdTable;

//improve the folllowing code such that it should reconnect with the webSocket server by clicking on the connect button next time, once when it is disconnected by the user, by clicking on the disconnect button 



// useEffect(() => {

//   const updateDateTime = () => {
//     const now = new Date();
//     const dateOptions = { year: "numeric", month: "long", day: "numeric" };
//     const timeOptions = {
//       hour: "numeric",
//       minute: "numeric",
//       second: "numeric",
//     };
//     setCurrentDate(now.toLocaleDateString(undefined, dateOptions));
//     setCurrentTime(now.toLocaleTimeString(undefined, timeOptions));
//   };
// }, [currentDate, currentTime]);

// useEffect(() => {
//   const updateDateTime = () => {
//     const now = new Date();
//     const dateOptions = { year: "numeric", month: "long", day: "numeric" };
//     const timeOptions = {
//       hour: "numeric",
//       minute: "numeric",
//       second: "numeric",
//     };
//     setCurrentDate(now.toLocaleDateString(undefined, dateOptions));
//     setCurrentTime(now.toLocaleTimeString(undefined, timeOptions));
//   };
//   const socket = new WebSocket("ws://localhost:4001"); // Replace with your server address
//   socket.onmessage = (event) => {
//     try {
//       const numericWeight = parseFloat(event.data);
//       if (Number.isNaN(numericWeight)) {
//         console.error(`Cannot convert ${event.data} to a number`);
//       } else {
//         console.log(`trackZeroWt - ${trackZeroWt} ::  ${numericWeight.toFixed(2)}`);
//         if (numericWeight >= 0 && numericWeight <= 2) {
//           setIsAddButtonDisabled(true);
//           setTrackZeroWt((prevTrackZeroWt) => prevTrackZeroWt);
//         } else if (trackZeroWt) {
//           setIsAddButtonDisabled(false);
//         } else {
//           setButtonColor("green");
//           setRejectedBtnClr("yellow");
//           setReceivedMessage(numericWeight.toFixed(2));
//         }
//       }
//     } catch (error) {
//       console.error(`Cannot convert ${event.data} to a number`);
//     }
//   };

//   // Set up event listeners
//   socket.onopen = () => {
//     console.log("Connected to WebSocket server");
//   };

//   // Save the socket instance in the state
//   setSocket(socket);

//   const intervalId = setInterval(updateDateTime, 1000);
//   return () => {
//     clearInterval(intervalId);
//   };
// }, [
//   currentDate,
//   currentTime,
//   trackZeroWt,
//   isAddButtonDisabled,
//   buttonColor,
//   rejectedBtnClr,
// ]);





// useEffect(() => {
   
//   const updateDateTime = () => {
//     const now = new Date(); // New state for connection status
//     const dateOptions = { year: "numeric", month: "long", day: "numeric" };
//     const timeOptions = {
//       hour: "numeric",
//       minute: "numeric",
//       second: "numeric",
//     };
//     setCurrentDate(now.toLocaleDateString(undefined, dateOptions));
//     setCurrentTime(now.toLocaleTimeString(undefined, timeOptions));
    
//   };
//   // Connect to the WebSocket server
//   /*const socket = new WebSocket("ws://localhost:4001");
//   let check = false;
//   socket.onmessage = (event) => {
//     if (event.data.includes("Kg")) {
//       setReceivedMessage(event.data);
//       const weight = parseFloat(event.data.replace("Kg", ""));
//       if (weight >= 0.0 && weight <= 2.0) {
//         setIsAddButtonDisabled(true);
//         check = true;
//       } else {
//         if (check) {
//           setIsAddButtonDisabled(false);
//           setButtonColor("green");
//           setRejectedBtnClr("yellow");
//           check = false;
//         }
//       }
//     } else {
//       setReceivedMessage("0.00Kg");
//     }
//   };

//   // Set up event listeners
//   socket.onopen = () => {
//     console.log("Connected to WebSocket server");
//     setConnectionStatus("connected");
//   };

//   socket.onclose = () => {
//     console.log("Disconnected from WebSocket server");
//     setConnectionStatus("disconnected");
//   };

//   // Save the socket instance in the state
//   setSocket(socket);
//   */
//   const intervalId = setInterval(updateDateTime, 1000);
//   return () => {
//     clearInterval(intervalId);
//     //socket.close();
//   };
// }, []);

