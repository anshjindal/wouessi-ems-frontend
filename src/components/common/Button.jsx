import PropTypes from "prop-types";
import React from "react";
import "../../styles/components/Button.css";

const Button = ({ type = "button", text, onClick, className, disabled}) => {
    return (
        <button type={type} className={`btn ${className}`} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
};

Button.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool
};

export default Button;
