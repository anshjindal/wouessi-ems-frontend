import React from "react";
import "../../styles/pages/Leaves.css";

const Sidebar = () => {
  return (
    <div className="lsidebar" role="navigation" aria-label="Sidebar navigation">
      <h2 className="logo" aria-label="Wouessi Logo">Wouessi</h2>
      <ul>
        <li className="menu-item active" tabIndex="0" aria-label="Go to Dashboard">Dashboard</li>
        <li className="menu-item" tabIndex="0" aria-label="View Your Leave History">Your Leave History</li>
        <li className="menu-item" tabIndex="0" aria-label="View Team Leave Calendar">Team Leave Calendar</li>
      </ul>
    </div>
  );
};

export default Sidebar;
