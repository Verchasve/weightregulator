import React, { useState, useEffect, useContext } from "react";
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
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false);
  const [buttonColor, setButtonColor] = useState("grey");
  const [rejectedBtnClr, setRejectedBtnClr] = useState("grey");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateOptions = { year: "numeric", month: "long", day: "numeric" };
      const timeOptions = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      setCurrentDate(now.toLocaleDateString(undefined, dateOptions));
      setCurrentTime(now.toLocaleTimeString(undefined, timeOptions));
    };
    // Change done 05-02-2024

    // Connect to the WebSocket server
    const socket = new WebSocket("ws://localhost:4001"); // Replace with your server address
    socket.onmessage = (event) => {
      setReceivedMessage(event.data);
      console.log(event.data);
      if (event.data >= "0.00Kg" && event.data <= "2.00Kg") {
        setIsAddButtonDisabled(true); // Disable the Add button when weight is zero
      } else {
        setIsAddButtonDisabled(false); // Enable the Add button when weight is zero
        setButtonColor("green"); // Change button color to green
        setRejectedBtnClr("yellow");
      }
    };

    // Set up event listeners
    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    // Save the socket instance in the state
    setSocket(socket);

    const intervalId = setInterval(updateDateTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // change done 05-02-2024 generate ubin code

  const generateUbin = () => {
    // Generate UBIN based on selected values and current data/time
    const selectedOperatorValue = state?.selectedOperatorvalue || "";
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
              <a className="navbar-brand title" href="#">
                <h1>WELCOME TO MP&AD ENTERPRISES</h1>
              </a>
            </div>
          </nav>

          <center>
            <div className="container my-3">
              <div className="weight-container">
                <label for="RealTimeweightScreen" className="weightScreen">
                 DRt No : <input
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
                >
                  ADD
                </button>

                {/* <!-- By clicking on the Reject Button, The entries will turn red in the production table --> */}
                <button
                  className={`btn ${
                    rejectedBtnClr === "yellow" ? "btn-warning" : "btn-secondary"
                  } addBtn mx-2`}
                  id="ptReject"
                  onClick={addRejectedRow}
                  disabled={isAddButtonDisabled}
                >
                  Reject
                </button>

                <button
                  className={`btn ${
                    buttonColor === "red" ? "btn-danger" : "btn-danger"
                  } addBtn mx-2`}
                  onClick={() => navigate(-1)}
                >
                  Finish{" "}
                </button>
              </div>

              <div className="my-3">
                <div className="osdtTable">
                  <input
                    className="mx-2"
                    type="text"
                    value={state?.selectedOperatorValue || ""}
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
                  value={state?.selectedBrandValue || ""}
                  id="print-brand"
                  placeholder="Brand"
                  disabled
                />
                <input
                  className="mx-2"
                  type="text"
                  value={state?.selectedSizeValue || ""}
                  id="print-size"
                  placeholder="Size"
                  disabled
                />
                <input
                  className="mx-2"
                  type="text"
                  value={state?.selectedLayerValue || ""}
                  id="print-layer"
                  placeholder="Layer"
                  disabled
                />
                <input
                  className="mx-2"
                  type="text"
                  value={state?.selectedColorValue || ""}
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
                  <PdfGenerator data={tableData}>
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
                        left: "70%",
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
                          Print
                        </button>
                      </div>
                    )}
                  </Modal>
                </div>
              </div>
            </div>
          </center>
        </body>
      </div>
    </>
  );
};

export default ProdTable;
