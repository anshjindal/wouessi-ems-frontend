import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AboutUs from "./pages/AboutUs/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";
import Dashboard from "./pages/Dashboard/Dashboard";
import EmployeeManagement from "./pages/EmployeeManagement/EmployeeManagement";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Login from "./pages/Login/Login";
import Onboarding from "./pages/Onboarding/Onboarding";
import Profile from "./pages/Profile/Profile";
import DocumentSubmissionForm from "./components/forms/DocumentSubmissionForm";
import TaskForm from "./components/forms/TaskForm";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/document-submission" element={<DocumentSubmissionForm />} />
                <Route path="/create-task" element={<TaskForm />} />
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/employee-management" element={<EmployeeManagement />} />
            </Routes>
        </Router>
    );

};

export default AppRouter;
