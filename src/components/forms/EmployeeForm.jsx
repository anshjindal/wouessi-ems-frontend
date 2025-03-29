import PropTypes from "prop-types";
import React, { useState } from "react";
import "../../styles/components/EmployeeForm.css";

const EmployeeForm = ({ onSubmit, initialData = {} }) => {
    const [formData, setFormData] = useState({
        profileImage: initialData.profileImage || null,
        firstName: initialData.firstName || "",
        middleName: initialData.middleName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        workMail: initialData.workMail || "",
        contactNumber: initialData.contactNumber || "",
        dateOfBirth: initialData.dateOfBirth || "",
        gender: initialData.gender || "Male",
        bloodGroup: initialData.bloodGroup || "",
        dateOfJoin: initialData.dateOfJoin || "",
        imageFolder: initialData.imageFolder || "",
        dateofExit: initialData.dateofExit || null,
        departmentId: initialData.departmentId || "",
        designations: initialData.designations || "",
        employmentType: initialData.employmentType || "Full-Time",
        workLocation: initialData.workLocation || "On-Site",
        roleRef: initialData.roleRef || "",
        status: initialData.status || "active",
        accountNumber: initialData.accountNumber || "",
        transitNumber: initialData.transitNumber || "",
        institutionNumber: initialData.institutionNumber || "",
        bankName: initialData.bankName || "",
        interacId: initialData.interacId || "",
        sin: initialData.sin || "",
        taxCode: initialData.taxCode || "",
        workPermitDetails: initialData.workPermitDetails || "",
        prDetails: initialData.prDetails || "",
        citizenshipId: initialData.citizenshipId || "",
        maritalStatus: initialData.maritalStatus || "Single",
        emergencyContactName: initialData.emergencyContactName || "",
        emergencyContactNumber: initialData.emergencyContactNumber || "",
        emergencyContactRelation: initialData.emergencyContactRelation || "",
        repManagerRef: initialData.repManagerRef || null,
        healthCardNo: initialData.healthCardNo || "",
        familyPractitionerName: initialData.familyPractitionerName || "",
        practitionerClinicName: initialData.practitionerClinicName || "",
        practitionerName: initialData.practitionerName || "",
        logId: initialData.logId || "LOG456789",
        addresses: initialData.addresses || [
            { type: "permanent", houseNo: "", street: "", city: "", province: "", country: "", pincode: "" },
            { type: "temporary", houseNo: "", street: "", city: "", province: "", country: "", pincode: "" }
        ],
        resume: initialData.resume || null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddressChange = (index, e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const updatedAddresses = [...prev.addresses];
            updatedAddresses[index][name] = value;
            return { ...prev, addresses: updatedAddresses };
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData(prev => ({ ...prev, [name]: files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const data = new FormData();
        if (formData.profileImage) data.append('profileImage', formData.profileImage);
        if (formData.resume) data.append('resume', formData.resume);
    
        const fields = [
            'firstName', 'middleName', 'lastName', 'email', 'workMail', 'contactNumber',
            'dateOfBirth', 'gender', 'bloodGroup', 'dateOfJoin', 'departmentId',
            'employmentType', 'workLocation', 'roleRef', 'status', 'accountNumber',
            'transitNumber', 'institutionNumber', 'bankName', 'interacId', 'sin',
            'taxCode', 'workPermitDetails', 'prDetails', 'citizenshipId', 'maritalStatus',
            'emergencyContactName', 'emergencyContactNumber', 'emergencyContactRelation',
            'repManagerRef', 'healthCardNo', 'familyPractitionerName',
            'practitionerClinicName', 'practitionerName', 'logId', 'designations', 'dateOfExit'
        ];
    
        fields.forEach(key => {
            if (formData[key]) data.append(key, formData[key]);
        });
    
        const addressesWithType = formData.addresses.map((address, index) => ({
            type: index === 0 ? "permanent" : "temporary",
            ...address
        }));
    
        data.append('addresses', JSON.stringify(addressesWithType));
        onSubmit(data);
    };
    
    return (
        <form className="employee-form container" onSubmit={handleSubmit}>
            <h4 className="section-title">Employee Image</h4>
            {/* Upload Employee Picture */}
            <div className="form-group">
                <label>Employee Picture</label>
                <input type="file" name="profileImage" className="form-control-file" onChange={handleFileChange} />
            </div>

            {/* Name Fields */}
            <h4 className="section-title">Personal Details</h4>
            <div className="row">
                <div className="col-md-4"><label>First Name</label><input name="firstName" className="form-control" onChange={handleChange} value={formData.firstName} required /></div>
                <div className="col-md-4"><label>Middle Name</label><input name="middleName" className="form-control" onChange={handleChange} value={formData.middleName} /></div>
                <div className="col-md-4"><label>Last Name</label><input name="lastName" className="form-control" onChange={handleChange} value={formData.lastName} required /></div>
                <div className="col-md-4"><label>Date of Birth</label><input type="date" name="dateOfBirth" className="form-control" onChange={handleChange} value={formData.dateOfBirth} required /></div>
                <div className="col-md-4"><label>Gender</label><select name="gender" className="form-control" onChange={handleChange} value={formData.gender}><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></div>
                <div className="col-md-4"><label>Marital Status</label><select name="maritalStatus" className="form-control" onChange={handleChange} value={formData.maritalStatus}><option value="Single">Single</option><option value="Married">Married</option><option value="Divorced">Divorced</option><option value="Widowed">Widowed</option></select></div>
                <div className="col-md-4"><label>Contact</label><input name="contactNumber" className="form-control" onChange={handleChange} value={formData.contactNumber} required /></div>
                <div className="col-md-4"><label>Personal Email</label><input type="email" name="email" className="form-control" onChange={handleChange} value={formData.email} /></div>
                <div className="col-md-4"><label>Blood Group</label><input name="bloodGroup" className="form-control" onChange={handleChange} value={formData.bloodGroup} /></div>
            </div>

            {/* Address Details */}
            <h4 className="section-title">Address Details</h4>
            {formData.addresses.map((address, index) => (
                <div key={index} className="row address-row">
                    <div className="section-title">
                        <label className="address-label">{address.type.charAt(0).toUpperCase() + address.type.slice(1)} Address</label>
                    </div>
                    <div className="col-md-4">
                        <label>House No.</label>
                        <input name="houseNo" placeholder="House No." className="form-control" value={address.houseNo}
                            onChange={(e) => handleAddressChange(index, e)} required />
                    </div>
                    <div className="col-md-4">
                        <label>Street</label>
                        <input name="street" placeholder="Street" className="form-control" value={address.street}
                            onChange={(e) => handleAddressChange(index, e)} required />
                    </div>
                    <div className="col-md-4">
                        <label>City</label>
                        <input name="city" placeholder="City" className="form-control" value={address.city}
                            onChange={(e) => handleAddressChange(index, e)} required />
                    </div>
                    <div className="col-md-4">
                        <label>Province</label>
                        <input name="province" placeholder="Province" className="form-control" value={address.province}
                            onChange={(e) => handleAddressChange(index, e)} required />
                    </div>
                    <div className="col-md-4">
                        <label>Country</label>
                        <input name="country" placeholder="Country" className="form-control" value={address.country}
                            onChange={(e) => handleAddressChange(index, e)} required />
                    </div>
                    <div className="col-md-4">
                        <label>Pincode</label>
                        <input name="pincode" placeholder="12345" className="form-control" value={address.pincode}
                            onChange={(e) => handleAddressChange(index, e)} required pattern="\d{5,6}" />
                    </div>
                </div>
            ))}

            {/* Work Information */}
            <h4 className="section-title">Work Information</h4>
            <div className="row">
                <div className="col-md-4"><label>Employment Type</label><select name="employmentType" className="form-control" onChange={handleChange} value={formData.employmentType}>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                </select>
                </div>
                <div className="col-md-4"><label>Work Email</label><input name="workMail" className="form-control" onChange={handleChange} value={formData.workMail} required /></div>
                <div className="col-md-4"><label>Designation</label><input name="designations" className="form-control" onChange={handleChange} value={formData.designations} /></div>
                <div className="col-md-4"><label>Department</label><input name="departmentId" className="form-control" onChange={handleChange} value={formData.departmentId} /></div>
                <div className="col-md-4"><label>Date of Joining</label><input type="date" name="dateOfJoin" className="form-control" onChange={handleChange} value={formData.dateOfJoin} required /></div>
                <div className="col-md-4"><label>Work Location</label><input name="workLocation" className="form-control" onChange={handleChange} value={formData.workLocation} /></div>
                <div className="col-md-4"><label>Employment Status</label><select name="status" className="form-control" onChange={handleChange} value={formData.status}><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
            </div>

            {/* Banking Information */}
            <h4 className="section-title">Banking Details</h4>
            <div className="row">
                <div className="col-md-4"><label>Bank Name</label><input name="bankName" className="form-control" onChange={handleChange} value={formData.bankName} /></div>
                <div className="col-md-4"><label>Account Number</label><input name="accountNumber" className="form-control" onChange={handleChange} value={formData.accountNumber} /></div>
                <div className="col-md-4"><label>Transit Number</label><input name="transitNumber" className="form-control" onChange={handleChange} value={formData.transitNumber} /></div>
                <div className="col-md-4"><label>Institution Number</label><input name="institutionNumber" className="form-control" onChange={handleChange} value={formData.institutionNumber} /></div>
                <div className="col-md-4"><label>Interac ID</label><input name="interacId" className="form-control" onChange={handleChange} value={formData.interacId} /></div>
            </div>

            {/* Health Details */}
            <h4 className="section-title">Health Details</h4>
            <div className="row">
                <div className="col-md-4"><label>Health Card No.</label><input name="healthCardNo" className="form-control" onChange={handleChange} value={formData.healthCardNo} /></div>
                <div className="col-md-4"><label>Family Practitioner</label><input name="familyPractitionerName" className="form-control" onChange={handleChange} value={formData.familyPractitionerName} /></div>
                <div className="col-md-4"><label>Clinic Name</label><input name="practitionerClinicName" className="form-control" onChange={handleChange} value={formData.practitionerClinicName} /></div>
                <div className="col-md-4"><label>Practitioner Name</label><input name="practitionerName" className="form-control" onChange={handleChange} value={formData.practitionerName} /></div>
            </div>

            {/* Emergency Contact */}
            <h4 className="section-title">Emergency Contact</h4>
            <div className="row">
                <div className="col-md-4"><label>Contact Name</label><input name="emergencyContactName" className="form-control" onChange={handleChange} value={formData.emergencyContactName} /></div>
                <div className="col-md-4"><label>Contact Number</label><input name="emergencyContactNumber" className="form-control" onChange={handleChange} value={formData.emergencyContactNumber} /></div>
                <div className="col-md-4"><label>Relation</label><input name="emergencyContactRelation" className="form-control" onChange={handleChange} value={formData.emergencyContactRelation} /></div>
            </div>

            {/* Other Details Section */}
            <h4 className="section-title">Other Details</h4>
            <div className="row">
                <div className="col-md-4">
                    <label>Role Reference</label>
                    <input name="roleRef" className="form-control" onChange={handleChange} value={formData.roleRef} required />
                </div>
                <div className="col-md-4">
                    <label>Role Manager Reference</label>
                    <input name="repManagerRef" className="form-control" onChange={handleChange} value={formData.repManagerRef} required />
                </div>
                <div className="col-md-4">
                    <label>SIN</label>
                    <input name="sin" placeholder="123-456-789" className="form-control"
                        onChange={handleChange} value={formData.sin} required pattern="\d{3}-\d{3}-\d{3}" />
                </div>
                <div className="col-md-4"><label>Work Permit Number</label><input name="workPermitDetails" className="form-control" onChange={handleChange} value={formData.workPermitDetails} /></div>
                <div className="col-md-4"><label>Tax Code</label><input name="taxCode" className="form-control" onChange={handleChange} value={formData.taxCode} /></div>
                <div className="col-md-4"><label>PR Details</label><input name="prDetails" className="form-control" onChange={handleChange} value={formData.prDetails} /></div>
                <div className="col-md-4"><label>Citizenship ID</label><input name="citizenshipId" className="form-control" onChange={handleChange} value={formData.citizenshipId} /></div>
            </div>

            {/* Upload Docs */}
            <h4 className="section-title">Upload Resume</h4>
            <div className="form-group">
                <input type="file" name="resume" className="form-control-file" onChange={handleFileChange} />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary btn-block">Submit</button>
        </form>
    );
};

EmployeeForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialData: PropTypes.object,
};

export default EmployeeForm;