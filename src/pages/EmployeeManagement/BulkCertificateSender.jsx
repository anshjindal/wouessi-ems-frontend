

import { getAllEmployees } from "../../services/employeeService";
import React, { useEffect, useState } from "react";
import { sendBulkCertificates } from "../../services/emailService";

const BulkCertificateSender = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedRecipients, setSelectedRecipients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Fetch employees on load
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const res = await getAllEmployees(token);
                setEmployees(res.employees || []);
            } catch (err) {
                console.error("Failed to fetch employees:", err);
                setMessage("Failed to load employee list. Please try again.");
            }
        };

        fetchEmployees();
    }, []);

    // Handle checkbox toggle
    const handleSelect = (empId) => {
        const alreadySelected = selectedRecipients.find(r => r.empId === empId);
        if (alreadySelected) {
            setSelectedRecipients(selectedRecipients.filter(r => r.empId !== empId));
        } else {
            const employee = employees.find(emp => emp.empId === empId);
            setSelectedRecipients([...selectedRecipients, {
                empId,
                email: employee.email,
                certificateUrl: "" // default empty
            }]);
        }
    };

    // Handle input of certificate URL
    const handleUrlChange = (empId, url) => {
        setSelectedRecipients(prev =>
            prev.map(r =>
                r.empId === empId ? { ...r, certificateUrl: url } : r
            )
        );
    };

    // Send certificates to backend
    const handleSend = async () => {
        setLoading(true);
        setMessage("");

        const recipients = selectedRecipients
            .filter(r => r.certificateUrl.trim() !== "")
            .map(r => ({
                email: r.email,
                certificateUrl: r.certificateUrl
            }));

        if (recipients.length === 0) {
            setMessage("Please enter certificate URLs for selected employees.");
            setLoading(false);
            return;
        }

        try {
            const response = await sendBulkCertificates(recipients);
            setMessage(response.message || "Emails sent successfully!");
            setSelectedRecipients([]); // Clear selection
        } catch (err) {
            console.error("Email send failed:", err);
            setMessage(err.message || "Email sending failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Bulk Certificate Sender</h2>
            {message && <p className="alert alert-info">{message}</p>}

            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Select</th>
                        <th>Emp ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Certificate URL</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => {
                        const isSelected = selectedRecipients.some(r => r.empId === emp.empId);
                        const selected = selectedRecipients.find(r => r.empId === emp.empId);

                        return (
                            <tr key={emp.empId}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => handleSelect(emp.empId)}
                                    />
                                </td>
                                <td>{emp.empId}</td>
                                <td>{`${emp.firstName} ${emp.lastName}`}</td>
                                <td>{emp.email}</td>
                                <td>
                                    {isSelected && (
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="https://example.com/cert.pdf"
                                            value={selected?.certificateUrl || ""}
                                            onChange={(e) => handleUrlChange(emp.empId, e.target.value)}
                                        />
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <button
                className="btn btn-primary"
                disabled={loading || selectedRecipients.length === 0}
                onClick={handleSend}
            >
                {loading ? "Sending..." : "Send Certificates"}
            </button>
        </div>
    );
};

export default BulkCertificateSender;