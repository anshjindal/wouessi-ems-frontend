import React from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../styles/components/Header.css";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
    return (
        <header className="header">
            <button className="hamburger-btn" onClick={toggleSidebar}>
                {isSidebarOpen ? "X" : "☰"}
            </button>

            <nav className="nav-links">
                <Link to="/dashboard">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact Us</Link>
            </nav>

            <div className="header-right">
                <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                    <FaSearch className="search-icon" />
                </div>

                <Link to="/notifications">
                    <FaBell className="icon bell-icon" />
                </Link>
                {/* <Link to="/profile">
                    <FaUser className="icon profile-icon" />
                </Link> */}
            </div>
        </header>
    );
};

export default Header;