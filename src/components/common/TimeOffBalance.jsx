import React from "react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const TimeOffBalance = ({ totalDays = 25, usedDays = 17 }) => {
  const remainingDays = totalDays - usedDays;

  return (
    <div
      style={{
        width: "99.49px",
        height: "97px",
        backgroundColor: "#FFD89F",
        borderRadius: "8.48px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px",
        position: "relative",
        textAlign: "center", // Center the text within the box
      }}
    >
      {/* Container for Circular Progress Bar */}
      <div
        style={{
          width: "69.94px",
          height: "69.94px",
          position: "absolute", // Position it absolutely within the parent container
          top: "42%", // Center vertically
          left: "50%", // Center horizontally
          transform: "translate(-50%, -50%)", // Offset by 50% to achieve perfect centering
        }}
      >
        {/* Circular Progress Bar */}
        <CircularProgressbar
          value={(remainingDays / totalDays) * 100} // Convert to percentage
          styles={buildStyles({
            strokeLinecap: "round",
            pathColor: "#FF5804", // Orange stroke color
            trailColor: "transparent",
            textSize: "0px",
          })}
        />

        {/* White Inner Circle */}
        <div
          style={{
            width: "39.09px",
            height: "39.65px",
            borderRadius: "50%",
            backgroundColor: "#FFF",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1, // Ensure it sits on top but doesn't cover progress bar
          }}
        >
          <p
            style={{
              fontSize: "12.62px",
              fontWeight: "500",
              fontFamily: "Poppins, sans-serif",
              letterSpacing: "-0.22px",
              margin: 0,
              textAlign: "center",
              lineHeight: "150%",
            }}
          >
            {remainingDays}
          </p>
          <p
            style={{
              fontSize: "4.73px",
              fontWeight: "300",
              fontFamily: "Poppins, sans-serif",
              letterSpacing: "0%",
              margin: 0,
              textAlign: "center",
              lineHeight: "150%",
            }}
          >
            DAYS
          </p>
        </div>
      </div>

      {/* Timeoff Balance Text */}
      <p
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: "400",
          fontSize: "11px",
          marginTop: "85px", // This pushes the text below the circle
        }}
      >
        Leave Balance
      </p>
    </div>
  );
};

export default TimeOffBalance;
