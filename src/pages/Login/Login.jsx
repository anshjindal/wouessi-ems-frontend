import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/icons/WouessiLogo.png";
import LoginImage from "../../assets/images/WouessiLoginPageImage1.jpg";
import Button from "../../components/common/Button";
import CheckBox from "../../components/common/CheckBox";
import TextBox from "../../components/common/TextBox";
import { login } from "../../services/authService";
import "../../styles/pages/Login.css";

const Login = () => {
    const [empId, setEmpId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await login(empId, password);
            localStorage.setItem("sessionId", data.sessionId);
            localStorage.setItem("accessToken", data.accessToken);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <div className="login-image">
                    <img src={LoginImage} alt="Login Page Image" />
                </div>
            </div>

            <div className="form-login">
                <div className="company-logo">
                    <img src={Logo} alt="Wouessi Digital Logo" />
                </div>
                <div className="form-login-header">
                    <h1>Wouessi Digital</h1>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="input-field">
                        <label htmlFor="empId">Employee ID</label>
                        <TextBox
                            id="empId"
                            type="text"
                            value={empId}
                            onChange={(e) => setEmpId(e.target.value)}
                            placeholder="Enter Employee ID"
                            required
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <TextBox
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            required
                        />
                    </div>

                    <div className="remember-forgot-container">
                        <div className="remember-me">
                            <CheckBox
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="rememberMe">Remember Me</label>
                        </div>

                        <div className="forgot-password">
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>
                    </div>

                    <div className="login-button">
                        <Button type="submit" text="Login" className="btn-primary" />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;