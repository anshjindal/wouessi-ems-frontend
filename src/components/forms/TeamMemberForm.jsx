import PropTypes from "prop-types";
import React, { useState } from "react";
import "../../styles/components/TeamMemberForm.css";

const TeamMemberForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    empId: initialData.empId || "",
    teamId: initialData.teamId || "",
    role: initialData.role || "",
    status: initialData.status || "active",
    file: null,
  });
  
  // Called only when user picks a file
  const handleFileChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, file }));
  };

  // Called for all text / select fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // On submit, build a FormData with the file
  const handleSubmit = (e) => {
    e.preventDefault();

    // We'll just build a plain object, not FormData
    const data = new FormData();
    if (formData.file) {
      data.append("file", formData.file);
    }

    onSubmit({
      ...formData,
      fileData: data
    });
  };

  return (
    <form className="team-member-form container" onSubmit={handleSubmit}>
      <h4 className="section-title">Team Member Details</h4>

      <div className="row">
        <div className="col-md-6">
          <label>Employee ID</label>
          <input
            type="text"
            name="empId"
            className="form-control"
            value={formData.empId}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label>Team ID</label>
          <input
            type="text"
            name="teamId"
            className="form-control"
            value={formData.teamId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label>Role</label>
          <input
            type="text"
            name="role"
            className="form-control"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label>Status</label>
          <select
            name="status"
            className="form-control"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="col-md-12 mt-3">
        <label>Upload Document</label>
        <input
          type="file"
          name="file"
          className="form-control-file"
          onChange={handleFileChange}
        />
      </div>

      <button type="submit" className="btn btn-primary mt-3">
        Save Team Member
      </button>
    </form>
  );
};

TeamMemberForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};

export default TeamMemberForm;