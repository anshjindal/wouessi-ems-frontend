import PropTypes from "prop-types";
import React, { useState } from "react";
import "../../styles/components/Dropdown.css";

const Dropdown = ({ label, alt, options, onSelect, className }) => {
  const [selected, setSelected] = useState("");

  const handleChange = (event) => {
    setSelected(event.target.value);
    if (onSelect) {
      onSelect(event.target.value);
    }
  };

  return (
    <form className={`down ${className}`}>
      <label>{label}</label>
      <select
        id="dropdown"
        value={selected}
        onChange={handleChange}
        className="drop"
      >
        <option value="" disabled className="drop-option">
          {alt}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </form>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  alt: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func,
};

export default Dropdown;
//Not this taking longuer than I'd like to admit