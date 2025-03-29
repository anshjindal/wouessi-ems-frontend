import PropTypes from "prop-types";
import React from "react";
import "../../styles/components/Tag.css";

const Tag = ({ className, text }) => {
  return (
    <span className={`tag ${className}`}>
      {text}
    </span>
  );
};

Tag.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Tag;
