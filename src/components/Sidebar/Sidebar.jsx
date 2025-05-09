// @ts-ignore
import React from "react";
import { NavLink } from "react-router-dom";
import styles from './Sidebar.module.scss';
// @ts-ignore
import EMSLogo from "../../assets/icons/EMS.png"
// @ts-ignore
// @ts-ignore
import traineesIcon from "../../assets/icons/student.png";
// @ts-ignore
import vettingIcon from "../../assets/icons/vettingSytem.png";
// @ts-ignore
import cohortsIcon from "../../assets/icons/cohorts.png";
// @ts-ignore
import wouessiIcon from "../../assets/icons/wouessiVettingLogo.png"

const Sidebar = () => {
  return (
    <aside className={styles.sidebar} aria-label="Main navigation">
      {/* Header */}
      <div className={styles.header}>
      <img src={EMSLogo} alt="EMS Logo" className={styles.logo} />
        <p className={styles.subtitle}>Employee Management System</p>
        <hr/>
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink 
              to="/trainees-list" 
              className={({ isActive }) => 
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              <span className={styles.icon}>
              <img src={traineesIcon} alt="trainees-Icon" className={styles.logo} />
              </span>
              <span  className={styles.linktitle}>Trainees</span>
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink 
              to="/vetting-system" 
              className={({ isActive }) => 
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              <span className={styles.icon}>
              <img src={vettingIcon} alt="vetting-Icon" className={styles.logo} />
              </span>
              <span className={styles.linktitle}>Vetting</span>
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink 
              to="/cohorts-management" 
              className={({ isActive }) => 
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              <span className={styles.icon}>
              <img src={cohortsIcon} alt="cohorts-Icon" className={styles.logo} />
              </span>
              <span className={styles.linktitle}>Cohorts</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className={styles.footer}>
        <hr/>
        <div className={styles.footerContent}>
          <div className={styles.logo}>
          <img src={wouessiIcon} alt="wouesii-Icon" className={styles.logo} />
          </div>
          <div className={styles.company}>
            <p>EMS is a product of</p>
            <p className={styles.company}>WOUESSI INC.</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;