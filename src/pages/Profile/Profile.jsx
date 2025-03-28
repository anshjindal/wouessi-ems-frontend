import React, { useEffect, useState } from "react";
import { FaBuilding, FaCheck, FaEdit, FaEnvelope, FaPhone, FaTimes, FaVenusMars } from "react-icons/fa";
import profile from "../../assets/icons/profile.jpg";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import { getEmployeeById, updateEmployee } from "../../services/employeeService";
import "../../styles/pages/Profile.css";

const Profile = () => {
    const [employee, setEmployee] = useState(null);
    const [isEditing, setIsEditing] = useState({});
    const [updatedData, setUpdatedData] = useState({});

    useEffect(() => {
        const fetchEmployee = async () => {
            const empId = localStorage.getItem("empId");
            const authToken = localStorage.getItem("accessToken");
            if (!empId || !authToken) return;
            try {
                const response = await getEmployeeById(empId, authToken);
                if (response && response.employee) {
                    console.log("Employee Data:", response.employee);
                    setEmployee(response.employee);
                    setUpdatedData(response.employee);
                }
            } catch (error) {
                console.error("Failed to fetch employee data:", error);
            }
        };
        fetchEmployee();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEdit = (section) => {
        setIsEditing({ ...isEditing, [section]: true });
    };

    const handleCancel = (section) => {
        setUpdatedData(employee);
        setIsEditing({ ...isEditing, [section]: false });
    };

    const handleSave = async (section) => {
        try {
            await updateEmployee(employee.empId, updatedData);
            setEmployee(updatedData);
            setIsEditing({ ...isEditing, [section]: false });
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    if (!employee) return <p>Loading...</p>;

    return (
        <>
            <Header />
            <div className="profile-container">
                {/* Left Profile Section */}
                <div className="profile-sidebar">
                    <div className="profile-image-container">
                        <img
                            src={profile || employee.imageFolder}
                            alt="Profile"
                            className="profile-image"
                        />
                        <FaEdit className="edit-icon" />
                    </div>
                    <h3>{employee.firstName} {employee.lastName}</h3>
                    <span className="designation">{employee.designations}</span>

                    <div className="basic-info">
                        <p><FaEnvelope /> {employee.workMail}</p>
                        <p><FaPhone /> {employee.contactNumber}</p>
                        <p><FaVenusMars /> {employee.gender}</p>
                        <p><FaBuilding /> {employee.departmentId}</p>
                    </div>
                </div>

                {/* Right Profile Sections */}
                <div className="profile-content">
                    <h2 className="profile-title">Profile Details</h2>

                    {/* Personal Information */}
                    <div className="card">
                        <div className="card-header">
                            <span>Personal Information</span>
                            <FaEdit onClick={() => handleEdit("personal")} />
                        </div>
                        <div className="info-row">
                            <div>
                                <label>First Name:</label>
                                <input type="text" name="firstName" value={updatedData.firstName} onChange={handleInputChange} disabled={!isEditing.personal} />
                            </div>
                            <div>
                                <label>Middle Name:</label>
                                <input type="text" name="middleName" value={updatedData.middleName} onChange={handleInputChange} disabled={!isEditing.personal} />
                            </div>
                            <div>
                                <label>Last Name:</label>
                                <input type="text" name="lastName" value={updatedData.lastName} onChange={handleInputChange} disabled={!isEditing.personal} />
                            </div>
                            <div>
                                <label>Date of Birth:</label>
                                <input type="date" name="dateOfBirth" value={updatedData.dateOfBirth.split("T")[0]} onChange={handleInputChange} disabled={!isEditing.personal} />
                            </div>
                            <div>
                                <label>Gender:</label>
                                <input type="text" name="gender" value={updatedData.gender} onChange={handleInputChange} disabled={!isEditing.personal} />
                            </div>
                            <div>
                                <label>Contact Number:</label>
                                <input type="text" name="contactNumber" value={updatedData.contactNumber} onChange={handleInputChange} disabled={!isEditing.personal} />
                            </div>
                            <div>
                                <label>Personal Email:</label>
                                <input type="text" name="email" value={updatedData.email} onChange={handleInputChange} disabled={!isEditing.personal} />
                            </div>
                            <div>
                                <label>Marital Status</label>
                                <input type="text" name="maritalStatus" value={updatedData.maritalStatus} onChange={handleInputChange} disabled={!isEditing.personal} />
                            </div>
                        </div>
                        {isEditing.personal && (
                            <div className="button-group">
                                <button className="btn btn-save" onClick={() => handleSave("personal")}><FaCheck /> Save</button>
                                <button className="btn btn-cancel" onClick={() => handleCancel("personal")}><FaTimes /> Cancel</button>
                            </div>
                        )}
                    </div>

                    {/* Work Information */}
                    <div className="card">
                        <div className="card-header">
                            <span>Work Information</span>
                            <FaEdit onClick={() => handleEdit("work")} />
                        </div>
                        <div className="info-row">
                            <div>
                                <label>Employee ID:</label>
                                <input type="text" value={employee.empId} disabled />
                            </div>
                            <div>
                                <label>Employement Type:</label>
                                <input type="text" value={employee.employmentType} disabled />
                            </div>
                            <div>
                                <label>Work Mail:</label>
                                <input type="text" name="workMail" value={employee.workMail} disabled />
                            </div>
                            <div>
                                <label>Department:</label>
                                <input type="text" name="departmentId" value={updatedData.departmentId} onChange={handleInputChange} disabled={!isEditing.work} />
                            </div>
                            <div>
                                <label>Work Location:</label>
                                <input type="text" name="workLocation" value={updatedData.workLocation} onChange={handleInputChange} disabled={!isEditing.work} />
                            </div>
                            <div>
                                <label>Employment Status:</label>
                                <input type="text" name="workLocation" value={updatedData.status} disabled />
                            </div>
                        </div>
                        {isEditing.work && (
                            <div className="button-group">
                                <button className="btn btn-save" onClick={() => handleSave("work")}><FaCheck /> Save</button>
                                <button className="btn btn-cancel" onClick={() => handleCancel("work")}><FaTimes /> Cancel</button>
                            </div>
                        )}
                    </div>

                    {/* Banking Information */}
                    <div className="card">
                        <div className="card-header">
                            <span>Banking Details</span>
                            <FaEdit onClick={() => handleEdit("banking")} />
                        </div>
                        <div className="info-row">
                            <div>
                                <label>Bank Name:</label>
                                <input type="text" value={employee.bankName} disabled />
                            </div>
                            <div>
                                <label>Account Number:</label>
                                <input type="text" value={employee.accountNumber} disabled />
                            </div>
                            <div>
                                <label>Transit Number:</label>
                                <input type="text" value={employee.transitNumber} disabled />
                            </div>
                            <div>
                                <label>Institution Number:</label>
                                <input type="text" value={employee.institutionNumber} disabled />
                            </div>
                            <div>
                                <label>Interac ID:</label>
                                <input type="text" value={employee.interacId} disabled />
                            </div>
                        </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="card">
                        <div className="card-header">
                            <span>Emergency Contact</span>
                            <FaEdit onClick={() => handleEdit("emergency")} />
                        </div>
                        <div className="info-row">
                            <div>
                                <label>Full Name:</label>
                                <input type="text" value={employee.emergencyContactName} disabled />
                            </div>
                            <div>
                                <label>Contact Number:</label>
                                <input type="text" value={employee.emergencyContactNumber} disabled />
                            </div>
                            <div>
                                <label>RelationShip:</label>
                                <input type="text" value={employee.emergencyContactRelation} disabled />
                            </div>
                        </div>
                    </div>

                    {/* Health */}
                    <div className="card">
                        <div className="card-header">
                            <span>Health Information</span>
                            <FaEdit onClick={() => handleEdit("emergency")} />
                        </div>
                        <div className="info-row">
                            <div>
                                <label>Health Card No:</label>
                                <input type="text" name="healthCardNo" value={updatedData.healthCardNo} onChange={handleInputChange} disabled={!isEditing.work} />
                            </div>
                            <div>
                                <label>Practitioner Clinic:</label>
                                <input type="text" name="practitionerClinicName" value={updatedData.practitionerClinicName} onChange={handleInputChange} disabled={!isEditing.work} />
                            </div>
                            <div>
                                <label>Practitioner Name:</label>
                                <input type="text" name="practitionerName" value={updatedData.practitionerName} onChange={handleInputChange} disabled={!isEditing.work} />
                            </div>
                            <div>
                                <label>Family Practitioner Name:</label>
                                <input type="text" name="familyPractitionerName" value={updatedData.familyPractitionerName} onChange={handleInputChange} disabled={!isEditing.work} />
                            </div>
                        </div>
                    </div>

                    {/* Other Information */}
                    <div className="card">
                        <div className="card-header">
                            <span>Other Information</span>
                            <FaEdit onClick={() => handleEdit("Others")} />
                        </div>
                        <div className="info-row">
                            <div>
                                <label>Work Permit ID</label>
                                <input type="text" name="workPermitDetails" value={employee.workPermitDetails} onChange={handleInputChange} disabled={!isEditing.Others} />
                            </div>
                            <div>
                                <label>PR Card Number:</label>
                                <input type="text" name="prDetails" value={employee.prDetails} onChange={handleInputChange} disabled={!isEditing.Others} />
                            </div>
                            <div>
                                <label>SIN:</label>
                                <input type="text" name="sin" value={employee.sin} onChange={handleInputChange} disabled={!isEditing.Others} />
                            </div>
                            <div>
                                <label>Citizenship ID:</label>
                                <input type="text" name="citizenshipId" value={employee.citizenshipId} onChange={handleInputChange} disabled={!isEditing.Others} />
                            </div>
                            <div>
                                <label>Tax Code:</label>
                                <input type="text" name="taxCode" value={employee.taxCode} onChange={handleInputChange} disabled={!isEditing.Others} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;