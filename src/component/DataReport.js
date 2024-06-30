import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import "../App.css";

function DataReport() {
  const navigate = useNavigate();
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
        <div className="container my-3">
          Enter DRN No{" "}
          <input className="mx-2" type="text" name="correction-ubin" id="correction-ubin" />
          <input
            type="submit"
            defaultValue="Submit"
            id="correction-btn-submit"
          />
        </div>
        <div
          className="my-5 container"
          style={{
            verticalAlign: "auto",
            width: "fit-content",
            alignSelf: "center",
            alignItems: "flex-end",
            backgroundColor: "beige",
          }}
        >
          <div className="container my-3">
            <div className="my-3">
              <div className="osdtTable">
                <input
                  className="mx-2"
                  type="text"
                  value="Operator Name"
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
                  placeholder="currentDate"
                  disabled
                />

                <input
                  className="mx-2"
                  type="text"
                  name=""
                  id="print-op-shift"
                  placeholder="currentTime"
                  disabled
                />
              </div>
            </div>

            <div className="my-2">
              <input
                className="mx-2"
                type="text"
                value="brandValue"
                id="print-brand"
                placeholder="Brand"
                disabled
              />
              <input
                className="mx-2"
                type="text"
                value="selectedSizeValue"
                id="print-size"
                placeholder="Size"
                disabled
              />
              <input
                className="mx-2"
                type="text"
                value="selectedLayerValue"
                id="print-layer"
                placeholder="Layer"
                disabled
              />
              <input
                className="mx-2"
                type="text"
                value="selectedColorValue"
                id="print-color"
                placeholder="Colour"
                disabled
              />
            </div>
          </div>
          <br />
          <div className="my-3">
           
            <button onClick={() => navigate(-1)}>Back </button>
          </div>
        </div>

        <br />

        <div className="my-5 container">
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
          </Table>
        </div>
      </div>
    </>
  );
}

export default DataReport;
