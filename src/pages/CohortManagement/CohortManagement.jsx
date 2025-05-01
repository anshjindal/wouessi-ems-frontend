import React, { useState } from 'react';
import EMSIcon from '../../assets/icons/EMS.png';
import studentIcon from '../../assets/icons/student.png';
import studentSystemIcon from '../../assets/icons/vettingSytem.png';
import cohortsIcon from '../../assets/icons/cohorts.png';
import wouessiLogo from '../../assets/icons/wouessiVettingLogo.png';
import '../../styles/pages/CohortManagement.css'; // 🔄 updated CSS filename

// Sidebar component
const Sidebar = ({ activeItem }) => (
    <div className="cohort-management-sidebar">
        <div className="cohort-management-sidebar-header">
            <img src={EMSIcon} alt="EMS" className="cohort-management-title-nav-icon" />
            <p className="cohort-management-sidebar-subtitle">Employee Management System</p>
        </div>
        <hr />
        <nav className="cohort-management-sidebar-nav">
            <div className={`cohort-management-nav-item ${activeItem === 'students' ? '' : ''}`}>
                <img src={studentIcon} alt="Students" className="cohort-management-nav-icon" />
                <span className="cohort-management-nav-text">Students</span>
            </div>
            <div className={`cohort-management-nav-item ${activeItem === 'system' ? '' : ''}`}>
                <img src={studentSystemIcon} alt="System" className="cohort-management-nav-icon" />
                <span className="cohort-management-nav-text">Vetting System</span>
            </div>
            <div className={`cohort-management-nav-item ${activeItem === 'cohorts' ? 'cohort-management-active' : ''}`}>
                <img src={cohortsIcon} alt="Cohorts" className="cohort-management-nav-icon" />
                <span className="cohort-management-nav-text">Cohorts</span>
            </div>
        </nav>
        <div className="cohort-management-sidebar-footer">
            <img src={wouessiLogo} alt="Logo" className="cohort-management-nav-icon" />
            <p className="cohort-management-sidebar-subtitle">EMS is a product of</p>
            <p className="cohort-management-sidebar-subtitle">Wouessi Inc.</p>
        </div>
    </div>
);

const TitleWithCohort = ({ cohort }) => (
    <div className="cohort-management-title-row">
        <h1 className="cohort-management-form-title">Cohort Management</h1>
        <span className="cohort-management-cohort-tag">{cohort}</span>
    </div>
);

const CohortManagement = () => {
    const [cohort] = useState('Cohort 4');

    return (
        <div className="cohort-management-app-container">
            <Sidebar activeItem="cohorts" />
            <div className="cohort-management-main-content">
                <TitleWithCohort cohort={cohort} />
            </div>
        </div>
    );
};

export default CohortManagement;
