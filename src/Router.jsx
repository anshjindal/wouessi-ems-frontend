import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AboutUs from "./pages/AboutUs/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";
import Dashboard from "./pages/Dashboard/Dashboard";
import EmployeeManagement from "./pages/EmployeeManagement/EmployeeManagement";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Login from "./pages/Login/Login";
import Leaves from "./pages/Leaves/Leaves";
import Profile from "./pages/Profile/Profile";
import Timesheet from "./pages/Timesheet/Timesheet"

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/leaves" element={<Leaves />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/timesheets" element={<Timesheet />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/employee-management" element={<EmployeeManagement />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
