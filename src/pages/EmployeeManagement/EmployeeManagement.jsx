import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";
import Button from "../../components/common/Button";
import EmployeeForm from "../../components/forms/EmployeeForm";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import EmployeeUpdateModal from "../../components/modals/EmployeeUpdateModal";
import {
    createEmployee,
    getAllEmployees,
    getDepartments,
    getDesignations,
    getRoles,
    updateEmployeeStatus,
} from "../../services/employeeService";
import "../../styles/pages/EmployeeManagement.css";
import LoadingSpinner from "../../components/common/LoadingSpinner.jsx";

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [activeTab, setActiveTab] = useState("VIEW EMPLOYEES LIST");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [authToken, setAuthToken] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        fetchEmployees();
        fetchDropdownData();
    }, []);

    const fetchEmployees = async () => {
        try {
            const res = await getAllEmployees();
            setEmployees(res.employees);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchDropdownData = async () => {
        try {
            const deptRes = await getDepartments();
            const desigRes = await getDesignations();
            const rolesRes = await getRoles();

            setDepartments(deptRes.departments);
            setDesignations(desigRes.designations);
            setRoles(rolesRes.roles);
        } catch (error) {
            console.error("Error fetching dropdown data:", error);
        }
    };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

    const handleAddEmployee = async (formData) => {
        try {
            await createEmployee(formData);
            toast.success("Employee successfully added!");
            fetchEmployees();
            setActiveTab("VIEW EMPLOYEES LIST");
        } catch (error) {
            toast.error("Error adding employee.");
        }
    };

  const handleEditClick = (empId) => {
    setSelectedEmployeeId(empId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployeeId(null);
  };

    const handleDeactivateEmployee = async (empId) => {
        try {
            const employee = employees.find(e => e.empId === empId);
            const newStatus = employee.status === "active" ? "inactive" : "active";
            await updateEmployeeStatus(empId, newStatus);
            fetchEmployees();
            toast.success(`Employee ${newStatus === "active" ? "activated" : "deactivated"} successfully`);
        } catch (error) {
            toast.error("Failed to update employee status");
        }
    };

  const filteredEmployees = employees.filter((emp) =>
    `${emp.empId} ${emp.firstName} ${emp.middleName} ${emp.lastName} ${emp.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

    const exportToExcel = () => {
        if (employees.length === 0) {
            alert("No employees to export.");
            return;
        }

    const employeeData = employees.map((emp) => ({
      "Emp ID": emp.empId,
      Name: `${emp.firstName} ${emp.middleName || ""} ${emp.lastName}`,
      Email: emp.email,
      "Work Email": emp.workMail,
      Gender: emp.gender,
      "Employment Type": emp.employmentType,
      Status: emp.status,
      "Contact Number": emp.contactNumber,
      "Date of Join": emp.dateOfJoin
        ? new Date(emp.dateOfJoin).toLocaleDateString()
        : "N/A",
      "Work Location": emp.workLocation,
    }));

        const worksheet = XLSX.utils.json_to_sheet(employeeData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
        XLSX.writeFile(workbook, "EmployeeList.xlsx");
    };

    return (
        <>
            <Header />
            <div className="container employee-management">
                {/* Navigation Tabs */}
                <ul className="nav nav-tabs mb-3">
                    {["VIEW EMPLOYEES LIST", "ADD NEW EMPLOYEE", "UPDATE EMPLOYEE", "DEACTIVATE EMPLOYEE"].map((tab) => (
                        <li className="nav-item" key={tab}>
                            <button
                                className={`nav-link ${activeTab === tab ? "active" : ""}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Search & Export */}
                {activeTab === "VIEW EMPLOYEES LIST" && (
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search employees..."
                            className="form-control search-input"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <Button text="Export to Excel" className="btn-export" onClick={exportToExcel} />
                    </div>
                )}

                {/* View Employees */}
                {activeTab === "VIEW EMPLOYEES LIST" && (
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>EmpID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>Designation</th>
                                    <th>EmpType</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEmployees.map((emp) => (
                                    <tr key={emp.empId}>
                                        <td>{emp.empId}</td>
                                        <td>{`${emp.firstName} ${emp.middleName || ""} ${emp.lastName}`}</td>
                                        <td>{emp.workMail}</td>
                                        <td>{emp.gender}</td>
                                        <td>{emp.designations}</td>
                                        <td>{emp.employmentType}</td>
                                        <td>{emp.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Add Employee */}
                {activeTab === "ADD NEW EMPLOYEE" && (
                    <div className="form-container">
                        <EmployeeForm
                            onSubmit={handleAddEmployee}
                            departments={departments}
                            designations={designations}
                            roles={roles}
                        />
                    </div>
                )}

                {/* Update Employee */}
                {activeTab === "UPDATE EMPLOYEE" && (
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>EmpID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>Designation</th>
                                    <th>EmpType</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEmployees.map((emp) => (
                                    <tr key={emp.empId}>
                                        <td>{emp.empId}</td>
                                        <td>{`${emp.firstName} ${emp.middleName || ""} ${emp.lastName}`}</td>
                                        <td>{emp.workMail}</td>
                                        <td>{emp.gender}</td>
                                        <td>{emp.designations}</td>
                                        <td>{emp.employmentType}</td>
                                        <td>{emp.status}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning btn-sm"
                                                onClick={() => handleEditClick(emp.empId)}
                                            >
                                                Edit
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
                    empId={selectedEmployeeId}
                    authToken={authToken}
                    onUpdate={fetchEmployees}
                />

                {/* Deactivate Employee */}
                {activeTab === "DEACTIVATE EMPLOYEE" && (
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="table-danger">
                                <tr>
                                    <th>Emp ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>Designation</th>
                                    <th>Emp Type</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((emp) => (
                                    <tr key={emp.empId}>
                                        <td>{emp.empId}</td>
                                        <td>{`${emp.firstName} ${emp.middleName || ""} ${emp.lastName}`}</td>
                                        <td>{emp.email}</td>
                                        <td>{emp.gender}</td>
                                        <td>{emp.designations}</td>
                                        <td>{emp.employmentType}</td>
                                        <td className={emp.status === "active" ? "text-success" : "text-danger"}>
                                            {emp.status}
                                        </td>
                                        <td>
                                            <button
                                                className={`btn ${emp.status === "active" ? "btn-danger" : "btn-success"} btn-sm`}
                                                onClick={() => handleDeactivateEmployee(emp.empId)}
                                            >
                                                {emp.status === "active" ? "Deactivate" : "Activate"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default EmployeeManagement;
