import React, { useState } from 'react';
import EMSIcon from '../../assets/icons/EMS.png';
import studentIcon from '../../assets/icons/student.png';
import studentSystemIcon from '../../assets/icons/vettingSytem.png';
import cohortsIcon from '../../assets/icons/cohorts.png';
import wouessiLogo from '../../assets/icons/wouessiVettingLogo.png';
import '../../styles/pages/CohortManagement.css'; // 🔄 updated CSS filename

// Sidebar component
const Sidebar = ({ activeItem }) => (
    <div className="cohorts-management-sidebar">
        <div className="cohorts-management-sidebar-header">
            <img src={EMSIcon} alt="EMS" className="cohorts-management-title-nav-icon" />
            <p className="cohorts-management-sidebar-subtitle">Employee Management System</p>
        </div>
        <hr />
        <nav className="cohorts-management-sidebar-nav">
            <div className={`cohorts-management-nav-item ${activeItem === 'students' ? '' : ''}`}>
                <img src={studentIcon} alt="Students" className="cohorts-management-nav-icon" />
                <span className="cohorts-management-nav-text">Students</span>
            </div>
            <div className={`cohorts-management-nav-item ${activeItem === 'system' ? '' : ''}`}>
                <img src={studentSystemIcon} alt="System" className="cohorts-management-nav-icon" />
                <span className="cohorts-management-nav-text">Vetting System</span>
            </div>
            <div className={`cohorts-management-nav-item ${activeItem === 'cohorts' ? 'cohorts-management-active' : ''}`}>
                <img src={cohortsIcon} alt="Cohorts" className="cohorts-management-nav-icon" />
                <span className="cohorts-management-nav-text">Cohorts</span>
            </div>
        </nav>
        <div className="cohorts-management-sidebar-footer">
            <img src={wouessiLogo} alt="Logo" className="cohorts-management-nav-icon" />
            <p className="cohorts-management-sidebar-subtitle">EMS is a product of</p>
            <p className="cohorts-management-sidebar-subtitle">Wouessi Inc.</p>
        </div>
    </div>
);

const TitleWithCohort = ({ cohort }) => (
    <div className="cohorts-management-title-row">
        <h1 className="cohorts-management-form-title">Cohort Management</h1>
        <span className="cohorts-management-cohort-tag">{cohort}</span>
    </div>
);

const CohortManagement = () => {
    const [cohort] = useState('Cohort 4');

    return (
        <div className="cohorts-management-app-container">
            <Sidebar activeItem="cohorts" />
            <div className="cohorts-management-main-content">
                <TitleWithCohort cohort={cohort} />
            </div>
        </div>
    );
};

export default CohortManagement;
