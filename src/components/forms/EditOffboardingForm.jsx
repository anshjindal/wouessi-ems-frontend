import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/components/OffboardingForm.css';

const EditOffboardingForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Not Started'
  });

  // initialize the form with process data
  useEffect(() => {
    if (state?.process) {
      setFormData({
        title: state.process.title,
        description: state.process.description,
        status: state.process.status
      });
    }
  }, [state]);

  // need backend implementation for submission here i think
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedProcess = {
      ...state.process,
      ...formData
    };
    
    state.onUpdate(updatedProcess);
    navigate('/offboarding');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="offboarding-form-container">
      <h2>Edit Offboarding Process</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/offboarding')}
            className="cancel-btn"
          >
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditOffboardingForm;