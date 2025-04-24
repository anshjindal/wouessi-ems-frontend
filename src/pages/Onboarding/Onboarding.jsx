import React, { useState } from "react";
import {
  FaBriefcase,
  FaCheckCircle,
  FaClock,
  FaEye,
  FaGraduationCap,
  FaIdCard,
  FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import { submitOnboardingDocuments } from "../../services/onboarding";
import "../../styles/pages/Onboarding.css";

const documentSections = {
  Educational: {
    icon: <FaGraduationCap className="me-2" />,
    docs: [
      { label: "SSC / Grade X", field: "grade10Certificate" },
      { label: "+2 / Intermediate", field: "intermediateCertificate" },
      { label: "Bachelor's", field: "bachelorCertificate" },
      { label: "Master's", field: "mastersCertificate" },
      { label: "PhD", field: "phdCertificate" },
    ],
  },
  "ID Proofs": {
    icon: <FaIdCard className="me-2" />,
    docs: [
      { label: "Government ID", field: "governmentId" },
      { label: "Driving License", field: "drivingLicense" },
      { label: "PR Card", field: "prCard" },
      { label: "Passport", field: "passport" },
      { label: "College ID", field: "collegeId" },
    ],
  },
  "Previous Company Proofs": {
    icon: <FaBriefcase className="me-2" />,
    docs: [
      { label: "Experience Letter", field: "experienceLetter" },
      { label: "Relieving Letter", field: "relievingLetter" },
    ],
  },
};

const Onboarding = () => {
  const [uploadedDocs, setUploadedDocs] = useState({});

  const handleFileChange = (field, file) => {
    if (file) {
      const preview = URL.createObjectURL(file);
      setUploadedDocs((prev) => ({
        ...prev,
        [field]: { file, preview, status: "uploaded" },
      }));
    }
  };

  const removeFile = (field) => {
    setUploadedDocs((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  const getStatusBadge = (status) => {
    if (status === "uploaded")
      return (
        <span className="badge bg-warning text-dark">
          <FaClock /> Uploaded
        </span>
      );
    if (status === "approved")
      return (
        <span className="badge bg-success">
          <FaCheckCircle /> Approved
        </span>
      );
    return null;
  };

  const totalDocs = Object.values(documentSections).flatMap((s) => s.docs).length;
  const uploadedCount = Object.keys(uploadedDocs).length;
  const progress = Math.round((uploadedCount / totalDocs) * 100);

  const handleSubmit = async () => {
    const empId = localStorage.getItem("empId");
    try {
      await submitOnboardingDocuments(empId, uploadedDocs);
      toast.success("Documents submitted successfully!");
    } catch (error) {
      toast.error("Submission failed: " + error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <h3 className="text-center text-primary mb-4">
          Employee Onboarding :: Upload Your Documents
        </h3>

        <div className="progress mb-4">
          <div
            className="progress-bar bg-primary"
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {progress}%
          </div>
        </div>

        <div className="row">
          {Object.entries(documentSections).map(([section, { icon, docs }]) => (
            <div className="col-md-6 mb-4" key={section}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title text-dark fw-bold border-bottom pb-2 mb-3">
                    {icon} {section}
                  </h5>
                  {docs.map(({ label, field }) => {
                    const docData = uploadedDocs[field];
                    return (
                      <div className="mb-3" key={field}>
                        <label className="form-label fw-semibold">{label}</label>
                        <div className="d-flex align-items-center gap-2">
                          <input
                            type="file"
                            className="form-control"
                            accept=".pdf,.jpg,.png"
                            disabled={!!docData}
                            onChange={(e) =>
                              handleFileChange(field, e.target.files[0])
                            }
                          />
                          {docData && (
                            <>
                              {getStatusBadge(docData.status)}
                              <a
                                href={docData.preview}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-info btn-sm"
                              >
                                <FaEye />
                              </a>
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => removeFile(field)}
                              >
                                <FaTrash />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="btn btn-primary w-100 mt-4 fw-bold"
          onClick={handleSubmit}
        >
          📤 Submit All Documents
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Onboarding;