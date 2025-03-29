import React from "react";
import "../../styles/pages/Leaves.css";

const Sidebar = () => {
  return (
    <div className="lsidebar">
      <h2 className="logo">Wouessi</h2>
      <ul>
        <li className="menu-item active">Dashboard</li>
        <li className="menu-item">Your Leave History</li>
        <li className="menu-item">Team Leave Calendar</li>
      </ul>
    </div>
  );
};

export default Sidebar;
