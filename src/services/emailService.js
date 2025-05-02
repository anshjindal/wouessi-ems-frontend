import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeForm from "./EmployeeForm";
import EmployeeUpdateModal from "./EmployeeUpdateModal";
import Footer from "../../components/Footer";
import { getAllEmployees, addEmployee, updateEmployee, deactivateEmployee } from "../../services/employeeService";
import BulkCertificateSender from "./BulkCertificateSender"; // ✅ NEW

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [activeTab, setActiveTab] = useState("VIEW EMPLOYEES LIST");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const res = await getAllEmployees(token);
            setEmployees(res.employees || []);
        } catch (err) {
            console.error("Failed to fetch employees:", err);
            setMessage("Failed to load employee list. Please try again."); // ✅ NEW (UI feedback)
        }
    };

    const handleAddEmployee = async (employeeData) => {
        try {
            await addEmployee(employeeData);
            fetchEmployees();
        } catch (err) {
            console.error("Add employee error:", err);
        }
    };

    const handleUpdateEmployee = async (updatedData) => {
        try {
            await updateEmployee(selectedEmployee.empId, updatedData);
            fetchEmployees();
            setIsModalOpen(false);
        } catch (err) {
            console.error("Update employee error:", err);
        }
    };

    const handleDeactivateEmployee = async (empId) => {
        try {
            await deactivateEmployee(empId);
            fetchEmployees();
        } catch (err) {
            console.error("Deactivate employee error:", err);
        }
    };

    const handleOpenModal = (employee) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedEmployee(null);
        setIsModalOpen(false);
    };

    const exportToExcel = () => {
        if (employees.length === 0) {
            alert("No employees to export.");
            return;
        }

        const employeeData = employees.map(({ empId, firstName, lastName, email }) => ({
            empId,
            firstName,
            lastName,
            email,
        }));

        const worksheet = XLSX.utils.json_to_sheet(employeeData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
        XLSX.writeFile(workbook, "EmployeeList.xlsx");
    };

    return (
        <>
            <div className="container mt-4">
                <ul className="nav nav-tabs mb-3">
                    {[
                        "VIEW EMPLOYEES LIST",
                        "ADD NEW EMPLOYEE",
                        "UPDATE EMPLOYEE",
                        "DEACTIVATE EMPLOYEE",
                        "SEND CERTIFICATES" // ✅ NEW
                    ].map((tab) => (
                        <li className="nav-item" key={tab}>
                            <button
                                className={`nav-link ${activeTab === tab ? "active" : ""}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* VIEW EMPLOYEES LIST */}
                {activeTab === "VIEW EMPLOYEES LIST" && (
                    <div className="table-responsive">
                        <button className="btn btn-success mb-2" onClick={exportToExcel}>
                            Export to Excel
                        </button>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Emp ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((emp) => (
                                    <tr key={emp.empId}>
                                        <td>{emp.empId}</td>
                                        <td>{`${emp.firstName} ${emp.lastName}`}</td>
                                        <td>{emp.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* ADD Employee */}
                {activeTab === "ADD NEW EMPLOYEE" && (
                    <div className="form-container">
                        <EmployeeForm onSubmit={handleAddEmployee} />
                    </div>
                )}

                {/* UPDATE Employee */}
                {activeTab === "UPDATE EMPLOYEE" && (
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Emp ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((emp) => (
                                    <tr key={emp.empId}>
                                        <td>{emp.empId}</td>
                                        <td>{`${emp.firstName} ${emp.lastName}`}</td>
                                        <td>{emp.email}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => handleOpenModal(emp)}
                                            >
                                                Update
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <EmployeeUpdateModal
                    show={isModalOpen}
                    onClose={handleCloseModal}
                    employee={selectedEmployee}
                    onUpdate={handleUpdateEmployee}
                />

                {/* DEACTIVATE Employee */}
                {activeTab === "DEACTIVATE EMPLOYEE" && (
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Emp ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((emp) => (
                                    <tr key={emp.empId}>
                                        <td>{emp.empId}</td>
                                        <td>{`${emp.firstName} ${emp.lastName}`}</td>
                                        <td>{emp.email}</td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDeactivateEmployee(emp.empId)}
                                            >
                                                Deactivate
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* SEND CERTIFICATES Tab */}
                {activeTab === "SEND CERTIFICATES" && (
                    <div className="send-certificates-tab">
                        <BulkCertificateSender />
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
};

export default EmployeeManagement;
