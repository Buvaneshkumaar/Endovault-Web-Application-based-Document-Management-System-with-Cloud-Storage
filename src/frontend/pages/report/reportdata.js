import React, { useState } from 'react';
import Sidebar from '../sidebar2/sidebar2';
import { PDFDocument } from 'pdf-lib';
import './redata.css'; // Import your CSS file

const Dashboard = () => {
  const [reportStatus, setReportStatus] = useState('');

  const generatePDF = async () => {
    setReportStatus('Generating report...');
    try {
      const response = await fetch('http://localhost:8080/Repo/generatePDFData');
      if (!response.ok) {
        throw new Error('Failed to fetch PDF data');
      }

      const { pdfData } = await response.json();

      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();

      for (const user of pdfData) {
        const page = pdfDoc.addPage();
        const { height } = page.getSize();
        page.drawText(`Dashboard Report - User ID: ${user.userId}`, { x: 50, y: height - 50, size: 18 });

        let currentY = height - 80;

        for (const domain of user.domains) {
          page.drawText(`Domain: ${domain.domain}`, { x: 50, y: currentY, size: 14 });
          page.drawText(`Files Count: ${domain.filesCount} files`, { x: 70, y: currentY - 20, size: 14 });

          currentY -= 40;
        }

        page.drawText(`Total Files Count: ${user.totalFilesCount} files`, { x: 50, y: currentY, size: 14 });

        page.moveDown(2); // You can adjust the value as needed
      }

      // Save the PDF as a Blob
      const pdfBytes = await pdfDoc.save();

      // Create a Blob with the PDF content
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });

      // Create a download link and trigger the download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'dashboard_report.pdf';
      link.click();

      setReportStatus('Report generated successfully!');
    } catch (error) {
      console.error('Error during PDF generation:', error);
      setReportStatus('Failed to generate report.');
    }
  };

  return (
    <div className="body-container">
      <Sidebar className="sidebar" />
      <div className="dashboard-container">
        <div className="content-container">
          <h1 className="dashboard-heading">Dashboard</h1>
          <button className="bn" onClick={generatePDF}>
            Generate Report
          </button>
          <span className="report-status">{reportStatus}</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
