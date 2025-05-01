import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TraineeRegistration from "./pages/TraineeRegistration/TraineeRegistration";
import TraineeLogin from './pages/TraineeLogin/TraineeLogin';
import VettingProcess from './pages/VettingProcess/VettingProcess';
import StudentList from "./pages/StudentList/StudentList";
import CohortManagement from "./pages/CohortManagement/CohortManagement"
import GlobalWrapper from "./layouts/GlobalWrapper";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<GlobalWrapper />}>
                    {/** Landing route */}
                    <Route index element={<TraineeRegistration />} />  
                    <Route path="/trainee-registration" element={<TraineeRegistration />} />
                    <Route path="/trainee-login" element={<TraineeLogin />} /> 
                    <Route path="/vetting-system" element={<VettingProcess/>} />
                    <Route path="/trainees-list" element={<StudentList/>} />
                    <Route path="/cohorts-management" element={<CohortManagement/>} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;
