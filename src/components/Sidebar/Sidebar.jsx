import React from "react";
import { NavLink } from "react-router-dom";
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar} aria-label="Main navigation">
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
    </aside>
  );
};

export default Sidebar;
