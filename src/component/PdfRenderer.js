import React, { useRef, useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";
import "../App.css";

const PdfGenerator = ({ children }) => {
  const contentRef = useRef(null);
  const location = useLocation();

  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const {
    selectedBrandValue,
    selectedSizeValue,
    selectedLayerValue,
    selectedColorValue,
    selectedOperatorvalue,
  } = location.state;

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

    const intervalId = setInterval(updateDateTime, 1000);

    return () => {
      clearInterval(intervalId);
      //socket.close();
    };
  }, []);

  const generatePdf = async () => {
    const content = contentRef.current;

    if (!content) {
      console.error("PDF content element not found");
      return;
    }

    try {
      const canvas = await html2canvas(content);
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF();

      // Add additional information to the PDF
      doc.setFontSize(12);

      // Align and style the selected values horizontally
      const x = 40; // Starting x position
      const y = 30; // Starting y position
      const xOffset = 50; // Horizontal offset between values
      const lineHeight = 2; // Line height between values

      // Set font weight to bold before rendering other text
      doc.setFont("helvetica", "bold");
      
      doc.text(" MP & AD Enterprise ", x + 40, y - 20);

      doc.setFont("helvetica", "normal");

      doc.setFont("helvetica", "bold");
      doc.text("Date:", x, y);

      // Reset font weight to normal before rendering other text
      doc.setFont("helvetica", "normal");
      doc.text(`${currentDate}`, x-38 + xOffset, y);

      doc.setFont("helvetica", "bold");
      doc.text("Time:", x - 60 + 2 * xOffset, y);

      // Reset font weight to normal before rendering other text
      doc.setFont("helvetica", "normal");
      doc.text(`${currentTime}`, x - 48 + 2 * xOffset, y);
      // doc.text(`Date: ${currentDate}`, x, y);
      // doc.text(`Time: ${currentTime}`, x + xOffset, y );
      doc.text(`Operator: ${selectedOperatorvalue}`, x + 2 * xOffset, y);
      doc.text(`Brand: ${selectedBrandValue}`, x - 10, y + 10);
      doc.text(`Size: ${selectedSizeValue}`, x - 15 + xOffset, y + 10);
      doc.text(`Layer: ${selectedLayerValue}`, x - 25 + 2 * xOffset, y + 10);
      doc.text(`Color: ${selectedColorValue}`, x - 35 + 3 * xOffset, y + 10);

      // Add the table image to the PDF

      doc.addImage(imgData, "PNG", 20, y + 10 * lineHeight, 180, 0);
      doc.save("sample.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div>
      <div>
        <h1>PDF Generator</h1>
      </div>
      <button onClick={generatePdf}>Generate PDF</button>
      <br />
      <br />
      <div className="content">
        <div ref={contentRef}>{children}</div>
      </div>
    </div>
  );
};

export default PdfGenerator;

// how to make the Date: and Time: title in bold in the above code
