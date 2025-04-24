import React, { useEffect, useState } from "react";
import { FaBuilding, FaCheck, FaEdit, FaEnvelope, FaPhone, FaTimes, FaVenusMars } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profile from "../../assets/icons/profile.jpg";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import {
  getEmployeeById,
  updateEmployee,
} from "../../services/employeeService";
import "../../styles/pages/Profile.css";
import LoadingSpinner from "../../components/common/LoadingSpinner.jsx";

const Profile = () => {
  const [employee, setEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState({});
  const [updatedData, setUpdatedData] = useState({});

    useEffect(() => {
        const fetchEmployee = async () => {
            const empId = localStorage.getItem("empId");
            if (!empId) return;
            try {
                const response = await getEmployeeById(empId);
                if (response && response.employee) {
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
        const sectionFields = {
            personal: [
                "firstName", "middleName", "lastName", "dateOfBirth",
                "gender", "contactNumber", "email", "maritalStatus", "bloodGroup"
            ],
            work: [
                "departmentId", "workLocation", "dateOfJoin",
                "dateOfExit", "repManagerRef"
            ],
            banking: [
                "bankName", "accountNumber", "transitNumber", "institutionNumber", "interacId"
            ],
            Others: [
                "workPermitDetails", "prDetails", "sin",
                "citizenshipId", "taxCode"
            ],
            emergency: [
                "emergencyContactName", "emergencyContactNumber", "emergencyContactRelation"
            ],
            health: [
                "healthCardNo", "practitionerClinicName", "practitionerName", "familyPractitionerName"
            ]
        };

        const filteredData = {};
        sectionFields[section]?.forEach((field) => {
            filteredData[field] = updatedData[field];
        });

        try {
            await updateEmployee(employee.empId, filteredData);
            setEmployee((prev) => ({ ...prev, ...filteredData }));
            setIsEditing({ ...isEditing, [section]: false });
            toast.success(`${section.charAt(0).toUpperCase() + section.slice(1)} details updated successfully!`);
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile.");
        }
    };

  if (!employee) return <LoadingSpinner message="Loading profile..." />;

    return (
        <>
            <Header />
            <div className="profile-container">
                {/* Left Profile Section */}
                <div className="profile-sidebar">
                    <div className="profile-image-container">
                        <img
                            src={`http://localhost:5000/uploads/${employee.empId}/profileimage.jpg`}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = profile;
                            }}
                            alt="Profile"
                            className="profile-image"
                        />
                        <FaEdit className="edit-icon" />
                    </div>
                    <h3>{employee.firstName} {employee.lastName}</h3>
                    <span className="designation">{employee.designations}</span>

          <div className="basic-info">
            <p>
              <FaEnvelope /> {employee.workMail}
            </p>
            <p>
              <FaPhone /> {employee.contactNumber}
            </p>
            <p>
              <FaVenusMars /> {employee.gender}
            </p>
            <p>
              <FaBuilding /> {employee.departmentId}
            </p>
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
                            <div>
                                <label>Blood Group</label>
                                <input type="text" name="bloodGroup" value={updatedData.bloodGroup} onChange={handleInputChange} disabled={!isEditing.personal} />
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
                                <input type="text" name="departmentId" value={updatedData.departmentId} onChange={handleInputChange} disabled />
                            </div>
                            <div>
                                <label>Work Location:</label>
                                <input type="text" name="workLocation" value={updatedData.workLocation} onChange={handleInputChange} disabled />
                            </div>
                            <div>
                                <label>Employment Status:</label>
                                <input type="text" name="workLocation" value={updatedData.status} disabled />
                            </div>
                            <div>
                                <label>Date of Join:</label>
                                <input type="date" name="dateOfJoin" value={updatedData.dateOfJoin?.split("T")[0]} onChange={handleInputChange} disabled />
                            </div>
                            <div>
                                <label>Date of Exit:</label>
                                <input type="date" name="dateOfExit" value={updatedData.dateOfExit?.split("T")[0]} onChange={handleInputChange} disabled />
                            </div>
                            <div>
                                <label>Role</label>
                                <input
                                    type="text"
                                    name="roleRef"
                                    value={updatedData.roleRef?.roleName || ""}
                                    onChange={handleInputChange}
                                    disabled
                                />
                            </div>
                            <div>
                                <label>Reporting Manager:</label>
                                <input type="text" name="repManagerRef" value={updatedData.repManagerRef} onChange={handleInputChange} disabled />
                            </div>
                        </div>
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
                                <input type="text" name="bankName" value={updatedData.bankName} onChange={handleInputChange} disabled={!isEditing.banking} />
                            </div>
                            <div>
                                <label>Account Number:</label>
                                <input type="text" name="accountNumber" value={updatedData.accountNumber} onChange={handleInputChange} disabled={!isEditing.banking} />
                            </div>
                            <div>
                                <label>Transit Number:</label>
                                <input type="text" name="transitNumber" value={updatedData.transitNumber} onChange={handleInputChange} disabled={!isEditing.banking} />
                            </div>
                            <div>
                                <label>Institution Number:</label>
                                <input type="text" name="institutionNumber" value={updatedData.institutionNumber} onChange={handleInputChange} disabled={!isEditing.banking} />
                            </div>
                            <div>
                                <label>Interac ID:</label>
                                <input type="text" name="interacId" value={updatedData.interacId} onChange={handleInputChange} disabled={!isEditing.banking} />
                            </div>
                        </div>
                        {isEditing.banking && (
                            <div className="button-group">
                                <button className="btn btn-save" onClick={() => handleSave("banking")}><FaCheck /> Save</button>
                                <button className="btn btn-cancel" onClick={() => handleCancel("banking")}><FaTimes /> Cancel</button>
                            </div>
                        )}
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
                                <input
                                    type="text"
                                    name="emergencyContactName"
                                    value={updatedData.emergencyContactName}
                                    onChange={handleInputChange}
                                    disabled={!isEditing.emergency}
                                />
                            </div>
                            <div>
                                <label>Contact Number:</label>
                                <input
                                    type="text"
                                    name="emergencyContactNumber"
                                    value={updatedData.emergencyContactNumber}
                                    onChange={handleInputChange}
                                    disabled={!isEditing.emergency}
                                />
                            </div>
                            <div>
                                <label>Relationship:</label>
                                <input
                                    type="text"
                                    name="emergencyContactRelation"
                                    value={updatedData.emergencyContactRelation}
                                    onChange={handleInputChange}
                                    disabled={!isEditing.emergency}
                                />
                            </div>
                        </div>
                        {isEditing.emergency && (
                            <div className="button-group">
                                <button className="btn btn-save" onClick={() => handleSave("emergency")}><FaCheck /> Save</button>
                                <button className="btn btn-cancel" onClick={() => handleCancel("emergency")}><FaTimes /> Cancel</button>
                            </div>
                        )}
                    </div>

                    {/* Health */}
                    <div className="card">
                        <div className="card-header">
                            <span>Health Information</span>
                            <FaEdit onClick={() => handleEdit("health")} />
                        </div>
                        <div className="info-row">
                            <div>
                                <label>Health Card No:</label>
                                <input
                                    type="text"
                                    name="healthCardNo"
                                    value={updatedData.healthCardNo}
                                    onChange={handleInputChange}
                                    disabled={!isEditing.health}
                                />
                            </div>
                            <div>
                                <label>Practitioner Clinic:</label>
                                <input
                                    type="text"
                                    name="practitionerClinicName"
                                    value={updatedData.practitionerClinicName}
                                    onChange={handleInputChange}
                                    disabled={!isEditing.health}
                                />
                            </div>
                            <div>
                                <label>Practitioner Name:</label>
                                <input
                                    type="text"
                                    name="practitionerName"
                                    value={updatedData.practitionerName}
                                    onChange={handleInputChange}
                                    disabled={!isEditing.health}
                                />
                            </div>
                            <div>
                                <label>Family Practitioner Name:</label>
                                <input
                                    type="text"
                                    name="familyPractitionerName"
                                    value={updatedData.familyPractitionerName}
                                    onChange={handleInputChange}
                                    disabled={!isEditing.health}
                                />
                            </div>
                        </div>
                        {isEditing.health && (
                            <div className="button-group">
                                <button className="btn btn-save" onClick={() => handleSave("health")}><FaCheck /> Save</button>
                                <button className="btn btn-cancel" onClick={() => handleCancel("health")}><FaTimes /> Cancel</button>
                            </div>
                        )}
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
                                <input
                                    type="text"
                                    name="workPermitDetails"
                                    value={updatedData.workPermitDetails}
                                    onChange={handleInputChange}
                                    disabled={!isEditing.Others}
                                />
                            </div>
                            <div>
                                <label>PR Card Number:</label>
                                <input
                                    type="text"
                                    name="prDetails"
                                    value={updatedData.prDetails}
                                    onChange={handleInputChange}
                                    disabled={!isEditing.Others}
                                />
                            </div>
                            <div>
                                <label>SIN:</label>
                                <input
                                    type="text"
                                    name="sin"
                                    value={updatedData.sin}
                                    onChange={handleInputChange}
                                    disabled={!isEditing.Others}
                                />
                            </div>
                            <div>
                                <label>Citizenship ID:</label>
                                <input
                                    type="text"
                                    name="citizenshipId"
                                    value={updatedData.citizenshipId}
                                    onChange={handleInputChange}
                                    disabled={!isEditing.Others}
                                />
                            </div>
                            <div>
                                <label>Tax Code:</label>
                                <input
                                    type="text"
                                    name="taxCode"
                                    value={updatedData.taxCode}
                                    onChange={handleInputChange}
                                    disabled={!isEditing.Others}
                                />
                            </div>
                            <div>
                                <label>Resume:</label>
                                <a
                                    href={`http://localhost:5000/uploads/${employee.empId}/resume.pdf`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline-secondary"
                                >
                                    📄 View Resume
                                </a>
                            </div>
                        </div>
                        {isEditing.Others && (
                            <div className="button-group">
                                <button className="btn btn-save" onClick={() => handleSave("Others")}><FaCheck /> Save</button>
                                <button className="btn btn-cancel" onClick={() => handleCancel("Others")}><FaTimes /> Cancel</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;
