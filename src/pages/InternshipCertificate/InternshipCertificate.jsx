import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";

function InternshipCertificate() {
  // State to store form input values
  const [formData, setFormData] = useState({
    name: "",
    internType: "",
    startDate: "",
    endDate: "",
  });

  // Get current date formatted as "Month Day, Year"
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }); // Outputs "March 27, 2025" based on the provided current date

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Format the date range as "MM/DD/YYYY - MM/DD/YYYY"
  const formatDateRange = () => {
    const { startDate, endDate } = formData;
    if (!startDate || !endDate) return "Date range not provided";
    const start = new Date(startDate).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    const end = new Date(endDate).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    return `${start} - ${end}`;
  };

  // Function to generate the certificate
  const generateInternshipCertificate = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("Internship Completion Certificate", 105, 20, { align: "center" });

    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text("This is to certify that", 105, 50, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(formData.name || "Name not provided", 105, 65, {
      align: "center",
    });

    doc.setFont("helvetica", "normal");
    doc.text(`has successfully completed their internship as a`, 105, 80, {
      align: "center",
    });

    doc.setFont("helvetica", "bold");
    doc.text(formData.internType || "Type not provided", 105, 95, {
      align: "center",
    });

    doc.setFont("helvetica", "normal");
    doc.text(`from ${formatDateRange()}.`, 105, 110, { align: "center" });

    doc.setLineWidth(0.5);
    doc.line(30, 30, 180, 30);
    doc.line(30, 130, 180, 130);

    doc.setFontSize(12);
    doc.text(`Issued on: ${currentDate}`, 105, 150, { align: "center" });
    doc.text("Authorized by: xAI Admin", 105, 160, { align: "center" });

    doc.save(`${formData.name || "Intern"}_Internship_Certificate.pdf`);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Internship Certificate Generator</h1>
      <p className="lead text-center">
        Generate a completion certificate for interns.
      </p>

      {/* Form for input */}
      <div className="card mx-auto mb-4" style={{ maxWidth: "500px" }}>
        <div className="card-body">
          <h5 className="card-title">Enter Certificate Details</h5>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="internType" className="form-label">
                Internship Type
              </label>
              <input
                type="text"
                className="form-control"
                id="internType"
                name="internType"
                value={formData.internType}
                onChange={handleInputChange}
                placeholder="e.g., Paid Intern, Volunteer"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="startDate" className="form-label">
                Start Date
              </label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="endDate" className="form-label">
                End Date
              </label>
              <input
                type="date"
                className="form-control"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
              />
            </div>
          </form>

          {/* Preview */}
          <h6 className="mt-4">Preview</h6>
          <p className="card-text">
            <strong>Name:</strong> {formData.name || "Not provided"}
            <br />
            <strong>Intern Type:</strong>{" "}
            {formData.internType || "Not provided"}
            <br />
            <strong>Dates:</strong> {formatDateRange()}
            <br />
            <strong>Issued on:</strong> {currentDate}
            <br />
            <strong>Authorized by:</strong> xAI Admin
          </p>
        </div>
      </div>

      {/* Button to generate PDF */}
      <div className="text-center">
        <button
          className="btn btn-primary"
          onClick={generateInternshipCertificate}
        >
          Generate Certificate
        </button>
      </div>
    </div>
  );
}

export default InternshipCertificate;
