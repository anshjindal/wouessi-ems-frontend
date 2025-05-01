import React, { useState } from 'react';
import EMSIcon from '../../assets/icons/EMS.png';
import studentIcon from '../../assets/icons/student.png';
import studentSystemIcon from '../../assets/icons/vettingSytem.png';
import cohortsIcon from '../../assets/icons/cohorts.png';
import wouessiLogo from '../../assets/icons/wouessiVettingLogo.png';
import '../../styles/pages/StudentList.css';

// Sidebar component
const Sidebar = ({ activeItem }) => (
    <div className="student-sidebar">
        <div className="student-sidebar-header">
            <img src={EMSIcon} alt="EMS" className="student-title-nav-icon" />
            <p className="student-sidebar-subtitle">Employee Management System</p>
        </div>
        <hr />
        <nav className="student-sidebar-nav">
            <div className={`student-nav-item ${activeItem === 'students' ? 'active' : ''}`}>
                <img src={studentIcon} alt="Students" className="student-nav-icon" />
                <span className="student-nav-text">Students</span>
            </div>
            <div className={`student-nav-item ${activeItem === 'system' ? 'active' : ''}`}>
                <img src={studentSystemIcon} alt="System" className="student-nav-icon" />
                <span className="student-nav-text">Vetting System</span>
            </div>
            <div className={`student-nav-item ${activeItem === 'cohorts' ? 'active' : ''}`}>
                <img src={cohortsIcon} alt="Cohorts" className="student-nav-icon" />
                <span className="student-nav-text">Cohorts</span>
            </div>
        </nav>
        <div className="student-sidebar-footer">
            <img src={wouessiLogo} alt="Logo" className="student-nav-icon" />
            <p className="student-sidebar-subtitle">EMS is a product of</p>
            <p className="student-sidebar-subtitle">Wouessi Inc.</p>
        </div>
    </div>
);

const TitleWithCohort = ({ title, cohort }) => (
    <div className="student-title-row">
        <h1 className="student-form-title">{title}</h1>
        <span className="student-cohort-tag">{cohort}</span>
    </div>
);

const StudentProcess = () => {
    const [cohort] = useState('Cohort 4');

    return (
        <div className="student-app-container">
            <Sidebar activeItem="students" />
            <div className="student-main-content">
                <TitleWithCohort title="Students list " cohort={cohort} />
            </div>
        </div>
    );
};

export default StudentProcess;
