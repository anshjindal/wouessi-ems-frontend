import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import axios from "axios";
import "../../styles/pages/Profile.css";

const Certificates = () => {
    const [certificates, setCertificates] = useState([]);
    const [empId, setEmpId] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCertificates = async () => {
            const storedEmpId = localStorage.getItem("empId");
            if (!storedEmpId) return;
            setEmpId(storedEmpId);
            try {
                const res = await axios.get(`/api/employee/${storedEmpId}`);
                setCertificates(res.data.employee.certificates || []);
            } catch (error) {
                console.error("Failed to fetch certificates:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCertificates();
    }, []);

    const markAsSent = async (certificateName) => {
        try {
            const res = await axios.put("/api/certificates/send", {
                empId,
                certificateName,
            });
            setCertificates(res.data.updatedCertificates);
        } catch (err) {
            console.error("Failed to update certificate status:", err);
        }
    };

    if (loading) return <p>Loading certificates...</p>;

    return (
        <>
            <Header />
            <div className="profile-container">
                <div className="profile-content">
                    <h2 className="profile-title">Certificates</h2>
                    <div className="card">
                        <div className="info-row">
                            <table className="certificates-table">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {certificates.length === 0 ? (
                                    <tr>
                                        <td colSpan="3">No certificates found.</td>
                                    </tr>
                                ) : (
                                    certificates.map((cert, index) => (
                                        <tr key={index}>
                                            <td>{cert.name}</td>
                                            <td>
                                                {cert.sentAt ? (
                                                    `Sent on ${new Date(cert.sentAt).toLocaleDateString()}`
                                                ) : (
                                                    "Not Sent"
                                                )}
                                            </td>
                                            <td>
                                                {!cert.sentAt && (
                                                    <button
                                                        className="btn btn-save"
                                                        onClick={() => markAsSent(cert.name)}
                                                    >
                                                        <FaCheck /> Send
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Certificates;
