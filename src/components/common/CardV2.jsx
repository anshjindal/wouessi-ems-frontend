import React from "react";
import "../../styles/components/CardV2.css";

const CardV2 = ({ leaveType, remaining, total, color }) => {
  const percentage = (remaining / total) * 100;
  const strokeDasharray = 50;
  const strokeDashoffset =
    strokeDasharray - (percentage / 100) * strokeDasharray;

  return (
    <div className="V2">
      <div className="v2-top">
        <h2 className="remaining">Remaining</h2>
        <h2 className="leaveType">{leaveType}</h2>
      </div>
      <div className="cricleRemainingContainer">
        <svg className="progressRing" viewBox="0 0 36 36">
          <path className="progress-ring-bg" d="M 2 18 A 16 16 0 0 1 34 18" />

          <path
            className="progress-ring-fill"
            d="M 2 18 A 16 16 0 0 1 34 18"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            style={{ stroke: color }}
          />
        </svg>
        <span className="leave-count">{remaining}</span>
      </div>
    </div>
  );
};

export default CardV2;
/*
Missing:
Center action
Background color on proress
*/