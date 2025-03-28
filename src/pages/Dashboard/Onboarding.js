import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/pages/Onboarding.css';
import logo from '../../assets/images/WouessiImage.png';

const Onboarding = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    empId: '',
    department: '',
    designation: '',
    role: '',
  });

  const [resume, setResume] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'resume') setResume(files[0]);
    if (name === 'profileImage') setProfileImage(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      if (resume) data.append('resume', resume);
      if (profileImage) data.append('profileImage', profileImage);

      const response = await axios.post('http://localhost:5000/api/employee/empAdd', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Employee added successfully!');
      console.log(response.data);
    } catch (err) {
      console.error('Onboarding Error:', err);
      alert('Something went wrong. Check the console for details.');
    }
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-card">
      <div className="onboarding-logo-container">
            <img src={logo} alt="Wouessi Logo" className="onboarding-logo" />
        </div>
        <h2>Employee Onboarding</h2>
       
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input name="firstName" placeholder="First Name" onChange={handleChange} required />
          <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="empId" placeholder="Employee ID" onChange={handleChange} required />
  
          <input name="department" placeholder="Department" onChange={handleChange} required />
          <input name="designation" placeholder="Designation" onChange={handleChange} required />
          <input name="role" placeholder="Role" onChange={handleChange} required />
  
          <label>Resume (PDF)</label>
          <input name="resume" type="file" accept=".pdf" onChange={handleFileChange} />
  
          <label>Profile Image (PNG/JPG)</label>
          <input name="profileImage" type="file" accept="image/*" onChange={handleFileChange} />
  
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );  
};

export default Onboarding;
