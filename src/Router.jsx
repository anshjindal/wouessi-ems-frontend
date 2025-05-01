import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import TraineeRegistration from "./pages/TraineeRegistration/TraineeRegistration";
import TraineeLogin from './pages/TraineeLogin/TraineeLogin';
import VettingProcess from './pages/VettingProcess/VettingProcess';
import StudentList from "./pages/StudentList/StudentList";
import CohortManagement from "./pages/CohortManagement/CohortManagement"


const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TraineeRegistration />} />  
                <Route path="/profile" element={<Profile />} />   
                <Route path="/trainee-registration" element={<TraineeRegistration />} />
                <Route path="/trainee-login" element={<TraineeLogin />} /> 
                <Route path="/vetting-process" element={<VettingProcess/>} />
                <Route path="/student-list" element={<StudentList/>} />
                <Route path="/cohort-management" element={<CohortManagement/>} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
