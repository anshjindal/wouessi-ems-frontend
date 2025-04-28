import React, { useState, useEffect } from "react";
import "../../styles/pages/Timesheets.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { saveTimeSheet } from "../../services/timesheetService";

const Timesheets = () => {
  const [date, setDate] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [task, setTask] = useState("");
  const [entries, setEntries] = useState([]);

  //Load saved entries on page load
  useEffect(() => {
    const savedEntries =
      JSON.parse(localStorage.getItem("timesheetEntries")) || [];
    setEntries(savedEntries);
  }, []);

  //Save a new timesheet entry
  const handleSave = async () => {
    if (!date || !hoursWorked || !task.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    if (parseFloat(hoursWorked) <= 0) {
      alert("Hours worked must be greater than 0.");
      return;
    }
    const empId = localStorage.getItem("empId");
    const accessToken = localStorage.getItem("accessToken");
    //saves timesheet to database
    if (!empId || !accessToken) {
      alert("Unable to save timehseet invalid session");
      return;
    }
    await saveTimeSheet(
      {
        date,
        hoursWorked: parseFloat(hoursWorked),
        task,
        empId,
      },
      accessToken
    );

    const newEntry = { date, hoursWorked, task: task.trim() };
    const updatedEntries = [...entries, newEntry];

    localStorage.setItem("timesheetEntries", JSON.stringify(updatedEntries));

    setEntries(updatedEntries);
    setDate("");
    setHoursWorked("");
    setTask("");

    alert("Entry saved successfully!");
  };

  //Delete an entry
  const handleDelete = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    localStorage.setItem("timesheetEntries", JSON.stringify(updatedEntries)); //timesheet entries
    setEntries(updatedEntries);
  };

  return (
    <div className="timesheets-wrapper">
      {/* Header */}
      <Header />

      <div className="timesheets-container">
        <h2>Log Your Work Hours</h2>

        <form className="timesheets-form">
          <label htmlFor="work-date">Date:</label>
          <input
            aria-label="Date"
            type="date"
            id="work-date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="styled-date-picker"
          />

          <label htmlFor="hours-worked">Hours Worked:</label>
          <input
            aria-label="Hours Worked"
            type="number"
            id="hours-worked"
            value={hoursWorked}
            onChange={(e) => setHoursWorked(e.target.value)}
            min="0.5"
            step="0.5"
            required
            className="styled-input"
          />

          <label htmlFor="task">Task/Project:</label>
          <input
            aria-label="Task/Project"
            type="text"
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
            className="styled-input"
          />

          <button
            aria-label="Save"
            type="button"
            className="styled-button"
            onClick={handleSave}
          >
            Save
          </button>
        </form>

        <div className="entries-list">
          <h3>Saved Entries</h3>
          {entries.length === 0 ? (
            <p className="no-entries">No entries yet.</p>
          ) : (
            <ul>
              {entries.map((entry, index) => (
                <li key={index}>
                  <div className="entry-details">
                    <div className="entry-date">
                      <strong>Date:</strong> {entry.date}
                    </div>
                    <div className="entry-task">
                      <strong>Task:</strong> {entry.task}
                    </div>
                    <div className="entry-hours">
                      <strong>Hours:</strong> {entry.hoursWorked}
                    </div>
                  </div>
                  <button
                    aria-label="Delete"
                    className="delete-button"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Timesheets;
