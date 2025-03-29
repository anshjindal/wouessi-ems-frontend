import PropTypes from "prop-types";
import React from "react";
import "../../styles/components/TextBox.css";

const TextBox = ({ id, className, type, value, onChange, placeholder, required, disabled }) => {
    return (
        <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={`textbox-field ${className || ""}`.trim()}
        />
    );
};

TextBox.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
};

TextBox.defaultProps = {
    type: "text",
    required: false,
    disabled: false,
    placeholder: "",
    className: "",
};

export default TextBox;
