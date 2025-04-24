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
import TraineeRegistration from "./pages/TraineeRegistration/TraineeRegistration";
import TraineeLogin from './pages/TraineeLogin/TraineeLogin';
import DtsDashboardLayout from './pages/DtsDashboard/DtsDashboardLayout';
import DashboardHome from './pages/DtsDashboard/Home';
import Vetting from './pages/DtsDashboard/Vetting/Vetting';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/employee-management" element={<EmployeeManagement />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/trainee_registration" element={<TraineeRegistration />} />
                <Route path="/trainee_login" element={<TraineeLogin />} />
                <Route path="/dts_dashboard" element={<DtsDashboardLayout />}>
                    <Route index element={<DashboardHome />} />
                    <Route path="vetting" element={<Vetting />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;
