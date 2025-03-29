import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPasswordImage from "../../assets/images/WouessiLoginPageImage1.jpg";
import Button from "../../components/common/Button";
import TextBox from "../../components/common/TextBox";
import "../../styles/pages/ForgotPassword.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Password reset link sent to " + email);
        navigate("/login");
    };

    return (
    <div className="forgot-password-container">
            <div className="forgot-password-left">
                <div className="forgot-password-image">
                    <img src={ForgotPasswordImage} alt="Forgot Password Illustration" />
                </div>
            </div>
            <div className="form-forgot-password">
                <div className="form-forgot-password-header">
                    <h1>Forgot Password</h1>
                    <p>Password reset instructions will be send to your email.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="email-field">
                        <label htmlFor="email">Email Address</label>
                        <TextBox
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="forgot-password-button">
                        <Button type="submit" text="Reset Password" className="btn-primary" />
                    </div>
                    <div className="back-to-login">
                        <Button text="Back" className="btn-link" onClick={() => navigate("/login")} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;