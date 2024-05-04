import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";
import "../App.css";

const PdfGenerator = ({ children }) => {
  const contentRef = useRef(null);
  const location = useLocation();
  const { currentDate, currentTime, brand, size, layer, color, operator } =
    location.state;

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

      doc.setFont("helvetica", "bold");
      doc.text(" MP & AD Enterprise ", x + 40, y - 20);

      doc.setFont("helvetica", "normal");
      doc.text(`Date: ${currentDate}`, x, y);
      doc.text(`Time: ${currentTime}`, x + xOffset, y );
      doc.text(`Operator: ${operator}`, x + 2 * xOffset, y);
      doc.text(`Brand: ${brand}`, x - 10 , y + 10);
      doc.text(`Size: ${size}`, x - 15 + xOffset,  y + 10);
      doc.text(`Layer: ${layer}`, x - 25 + 2 * xOffset, y + 10);
      doc.text(`Color: ${color}`, x - 35 + 3 * xOffset, y + 10);

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
      <br/>
      <br/>
      <div className="content">
        <div ref={contentRef}>{children}</div>
      </div>
    </div>
  );
};

export default PdfGenerator;

// Improve the PdfGenerator function to create above code, such that it can save the pdf to the local D drive of the computer, and the pdf should
//contain all the N number of entries in the table added by the click of ADD button.
//The pdf should contain only the table data and other information like date and time and operator name, brand, size, layer and color and the generated pdf should hide all the buttons, weight screen
