import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/Card.css";

const Card = ({ title, image, link }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(link);
    };

    return (
        <div className="card" onClick={handleClick}>
            <img src={image} alt={title} className="card-image" />
            <h3 className="card-title">{title}</h3>
        </div>
    );
};

export default Card;