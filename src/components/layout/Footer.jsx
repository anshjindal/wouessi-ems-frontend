import React from "react";
import "../../styles/components/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} . All Rights Reserved By Wouessi Digital.</p>
        </footer>
    );
};

export default Footer;