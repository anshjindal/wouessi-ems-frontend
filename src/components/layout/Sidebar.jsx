import React from "react";
import { Link } from "react-router-dom";
import image from "../../assets/icons/profile.jpg";
import "../../styles/components/Sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = ({ user, navLinks, onLogout, isOpen }) => {
  return (
    <aside className={`sidebar`} aria-label="Main navigation">
        <header>
        <NavLink to="/">Logo</NavLink>
        </header>
      <nav>
        <ul>
          <li>
            <NavLink to="/trainees-list">Trainees</NavLink>
          </li>
          <li>
            <NavLink to="/vetting-system">Vetting</NavLink>
          </li>
          <li>
            <NavLink to="/cohorts-management">Cohorts</NavLink>
          </li>
        </ul>
      </nav>

      {/* 
            ---- Trainees sidebar ----
        
        <div className="trainee-sidebar">
        <div className="trainee-sidebar-header">
            <img src={EMS} alt="EMS" className="trainee-tittle-nav-icon" />
            <p className="trainee-sidebar-subtitle">Employee Management System</p>
            <hr/>
        </div>
        <div className="vetting-sidebar-footer">
            <img src={wouessiVettingLogo} alt="VettingLogo" className="vetting-nav-icon" />
            <p className="vetting-sidebar-subtitle">EMS is a product of</p>
            <p className="vetting-sidebar-subtitle">WOESEI INC.</p>
        </div>
        </div> */}

      {/* 
            ---- vetting-system ----

        <div className="vetting-sidebar">
                <div className="vetting-sidebar-header">
                <img src={EMS} alt="EMS" className="vetting-tittle-nav-icon" />
                    <p className="vetting-sidebar-subtitle">Employee Management System</p>
                </div>
                <hr/>
                <nav className="vetting-sidebar-nav">
                    <div className="vetting-nav-item">
                        <img src={student} alt="Student" className="vetting-nav-icon" />
                        <span className="vetting-nav-text">Students</span>
                    </div>
                    <div className="vetting-nav-item active">
                        <img src={vettingSystem} alt="Vetting" className="vetting-nav-icon" />
                        <span className="vetting-nav-text">Vetting system</span>
                    </div>
                    <div className="vetting-nav-item">
                        <img src={cohorts} alt="Cohorts" className="vetting-nav-icon" />
                        <span className="vetting-nav-text">Cohorts</span>
                    </div>
                </nav>
                <div className="vetting-sidebar-footer">
                <img src={wouessiVettingLogo} alt="VettingLogo" className="vetting-nav-icon" />
                    <p className="vetting-sidebar-subtitle">EMS is a product of</p>
                    <p className="vetting-sidebar-subtitle">WOESEI INC.</p>
                </div>
            </div> */}

      {/* 
            ---- students list ----

 
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
    </div> */}
    </aside>
  );
};

export default Sidebar;
