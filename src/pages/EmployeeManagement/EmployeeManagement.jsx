import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState, useCallback} from "react";
import * as XLSX from "xlsx";
import Button from "../../components/common/Button";
import EmployeeForm from "../../components/forms/EmployeeForm";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import EmployeeUpdateModal from "../../components/modals/EmployeeUpdateModal";
import {
    createEmployee,
    getAllEmployees,
    updateEmployeeStatus
} from "../../services/employeeService";
import "../../styles/pages/EmployeeManagement.css";

const EmployeeManagement = () => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const handleSelectUser = (userId) => {
        const employee = employees.find((e) => e.empId === userId);
        if (!employee || employee.status === "active") {
            alert("Cannot select active employees for reactivation.");
            return;
        }
    
        setSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };    

    const handleBulkReactivate = async () => {
        if (selectedUsers.length === 0) return;
    
        const confirmReactivation = window.confirm(
            `Are you sure you want to reactivate ${selectedUsers.length} ${selectedUsers.length === 1 ? 'employee' : 'employees'}? This will restore their access to the system.`
        );
    
        if (!confirmReactivation) return;
    
        try {
            for (const empId of selectedUsers) {
                const emp = employees.find(e => e.empId === empId);
                if (emp.status !== "inactive") {
                    throw new Error ("VALIDATION_ERROR");
                }
                await updateEmployeeStatus(empId, authToken);
            }
    
            await fetchEmployees();
            setSelectedUsers([]);
            alert("✅ Selected employees reactivated successfully.");
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            alert("❌ " + errorMessage);
        }
    };
    
    const [employees, setEmployees] = useState([]);
    const [activeTab, setActiveTab] = useState("VIEW EMPLOYEES LIST");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [authToken, setAuthToken] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const getErrorMessage = (error) => {
        if (!error || typeof error !== "object") return "An unexpected error occurred.";
        
        if (error.message?.includes("AUTH_ERROR")) {
            return "You do not have permission to reactivate employees.";
        }
        if (error.message?.includes("VALIDATION_ERROR")) {
            return "Selected employee(s) cannot be reactivated.";
        }
        if (error.message?.includes("NetworkError")) {
            return "Unable to connect to the server.";
        }
    
        return "An error occurred while reactivating employees.";
    };    
    const fetchEmployees = useCallback(async () => {
        try {
            const res = await getAllEmployees(authToken);
            setEmployees(res.employees);
        } catch (err) {
            console.error(err);
        }
    }, [authToken]);

    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");
        if (storedToken) {
            setAuthToken(storedToken);
        }
    }, []);
    
    useEffect(() => {
        if (authToken) {
            fetchEmployees(); // ✅ this only runs when authToken is set
        }
    }, [authToken, fetchEmployees]);
    
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleAddEmployee = async (formData) => {
        try {
            await createEmployee(formData, authToken);
            alert("Employee successfully added!");
            fetchEmployees();
            setActiveTab("VIEW EMPLOYEES LIST");
        } catch (error) {
            alert("Error adding employee.");
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
            const emp = employees.find(e => e.empId === empId);
            if (!emp) return alert("Employee not found.");
    
            const endpoint =
                emp.status === "active"
                    ? `${process.env.REACT_APP_API_URL}/employee/${empId}/status`
                    : `${process.env.REACT_APP_API_URL}/employee/reactivate/${empId}`;
    
            const response = await fetch(endpoint, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                credentials: "include",
            });
    
            if (!response.ok) {
                throw new Error("Failed to update employee status");
            }
    
            const result = await response.json();
            alert(result.message);
            fetchEmployees();
        } catch (error) {
            console.error("Error:", error);
            alert("Error updating employee status.");
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
            "Name": `${emp.firstName} ${emp.middleName || ""} ${emp.lastName}`,
            "Email": emp.email,
            "Work Email": emp.workMail,
            "Gender": emp.gender,
            "Employment Type": emp.employmentType,
            "Status": emp.status,
            "Contact Number": emp.contactNumber,
            "Date of Join": emp.dateOfJoin ? new Date(emp.dateOfJoin).toLocaleDateString() : "N/A",
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
                                onClick={() => {
                                    setActiveTab(tab);
                                }}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Search Bar & Export Button */}
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

                {/* VIEW Employees */}
                {activeTab === "VIEW EMPLOYEES LIST" && (
                    <div className="table-responsive">
                    {employees.some(emp => emp.status === "inactive") && (
                        <button
                        onClick={handleBulkReactivate}
                        disabled={selectedUsers.length === 0}
                        className="btn btn-success mb-2"
                        >
                            Reactivate Selected ({selectedUsers.length})
                            </button>
                    )}
                            {!employees.some(emp => emp.status === "inactive") && (
                            <p className="text-muted">There are no inactive employees to reactivate.</p>
                         )}
                              
                        <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                {employees.some(emp => emp.status === "inactive") && <th>Select</th>}
                                <th>EmpID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Designation</th>
                                <th>EmpType</th>
                                <th>Partner Company</th>
                                <th>Paid Status</th>
                                <th>Status</th>
                                <th>Action</th>
                                </tr>
</thead>

<tbody>
  {filteredEmployees.map((emp) => (
    <tr key={emp.empId}>
      {employees.some(e => e.status === "inactive") && (
        <td>
          {emp.status === "inactive" && (
            <input
              type="checkbox"
              onChange={() => handleSelectUser(emp.empId)}
              checked={selectedUsers.includes(emp.empId)}
            />
          )}
        </td>
      )}
      <td>{emp.empId}</td>
      <td>{`${emp.firstName} ${emp.middleName || ""} ${emp.lastName}`}</td>
      <td>{emp.workMail}</td>
      <td>{emp.gender}</td>
      <td>{emp.designations}</td>
      <td>{emp.employmentType}</td>
      <td>ABC Corp</td>
      <td>Unpaid</td>
      <td>{emp.status}</td>
      <td></td>
    </tr>
  ))}
</tbody>

                                            </table>
                                            </div>
                                        )}

                {/* ADD Employee - Uses Reusable Component */}
                {activeTab === "ADD NEW EMPLOYEE" && (
                    <div className="form-container">
                        <EmployeeForm onSubmit={handleAddEmployee} />
                    </div>
                )}

                {/* UPDATE Employee */}
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
                                            <button className="btn btn-warning btn-sm" onClick={() => handleEditClick(emp.empId)}>
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
                                                {emp.status === "active" ? "Deactivate" : "Reactivate"}
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