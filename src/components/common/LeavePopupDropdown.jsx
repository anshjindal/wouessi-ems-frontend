import React from "react";
import "../../styles/components/LeavePopupDropdown.css";

const Dropdown = ({ label, options, value, onChange }) => {

  return (
    <div className="dropdown-wrapper">
      <label htmlFor="dropdownSelect" className="dropdown-label">
        {label}
      </label>
      <div className="dropdown-container">
        <select
          className="dropdown-select"
          id="dropdownSelect"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled>
            Select {label}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;