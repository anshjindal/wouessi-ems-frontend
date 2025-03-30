// src/components/forms/TeamMemberForm.jsx
import PropTypes from "prop-types";
import React, { useState } from "react";
import "../../styles/components/TeamMemberForm.css";

const TeamMemberForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    empId: initialData.empId || "",
    teamId: initialData.teamId || "",
    role: initialData.role || "",
    status: initialData.status || "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // We'll just build a plain object, not FormData
    const data = {
      empId: formData.empId,
      teamId: formData.teamId,
      role: formData.role,
      status: formData.status,
    };

    onSubmit(data);
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
            required
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
