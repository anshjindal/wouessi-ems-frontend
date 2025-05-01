import React, { useState } from "react";
import EMSIcon from "../../assets/icons/EMS.png";
import studentIcon from "../../assets/icons/student.png";
import studentSystemIcon from "../../assets/icons/vettingSytem.png";
import cohortsIcon from "../../assets/icons/cohorts.png";
import wouessiLogo from "../../assets/icons/wouessiVettingLogo.png";
import "../../styles/pages/StudentList.css";

const TitleWithCohort = ({ title, cohort }) => (
  <div className="student-title-row">
    <h1 className="student-form-title">{title}</h1>
    <span className="student-cohort-tag">{cohort}</span>
  </div>
);

const StudentProcess = () => {
  const [cohort] = useState("Cohort 4");

  return (
    <div className="student-main-content">
      <TitleWithCohort title="Tainees list " cohort={cohort} />
    </div>
  );
};

export default StudentProcess;
