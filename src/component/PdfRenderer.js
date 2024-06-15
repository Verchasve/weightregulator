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

    const intervalId = setInterval(updateDateTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const generatePdf = async () => {
    const content = contentRef.current;

    if (!content) {
      console.error("PDF content element not found");
      return;
    }

    try {
      const rows = Array.from(content.querySelectorAll("tbody tr"));
      const totalRows = rows.length;
      const rowsPerPage = 49;
      const firstPageRows = 44;

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      
      const margin = 4;

      let currentPage = 1;
      let startRow = 0;
      let endRow = firstPageRows;

     function addHeader (pdf, pageNumber){
        pdf.setFont("helvetica", "bold");
        pdf.text("MP & AD Enterprise", 72, 20);
        pdf.setFont("helvetica", "normal");
        const xOffset = 50;

        pdf.text(` ${currentDate}`, 40, 30);
        pdf.text(`${currentTime}`, 40 - 50 + 2 * xOffset, 30);
        pdf.text(
          `Operator: ${selectedOperatorvalue}`,
          40 - 10 + 2 * xOffset,
          30
        );
        pdf.text(`Brand: ${selectedBrandValue}`, 40 - 10, 40);
        pdf.text(`Size: ${selectedSizeValue}`, 40 - 15 + xOffset, 40);
        pdf.text(`Layer: ${selectedLayerValue}`, 40 - 25 + 2 * xOffset, 40);
        pdf.text(`Color: ${selectedColorValue}`, 40 - 35 + 3 * xOffset, 40);
      };

      while (startRow < totalRows) {
        const pageContent = rows.slice(startRow, endRow);
        const pageElement = document.createElement("div");
        pageElement.innerHTML =
          "<Table><tbody> " +
          pageContent.map((row) => row.outerHTML).join("") +
          "</tbody></Table>";

        document.body.appendChild(pageElement);

        const canvas = await html2canvas(pageElement, {
          scrollY: -window.scrollY,
        });
        document.body.removeChild(pageElement);

        const imgData = canvas.toDataURL("image/png");
        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = pdfWidth - 8;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

        if (currentPage > 1) {
          pdf.addPage();
        }

        addHeader(pdf, currentPage);
        pdf.addImage(imgData, "PNG", margin, 50, imgWidth, imgHeight);

        startRow = endRow;
        endRow = startRow + rowsPerPage;
        currentPage++;
      }

      pdf.save("sample.pdf");
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

