import React, { useState, useEffect } from 'react';
import './Timesheet.css';
import { getTimesheet, createTimesheet, updateTimesheet } from '../../services/timesheetService';
import Button from '../../components/common/Button'; // Adjust path as necessary

// Define the default entries for each day
const defaultDays = [
    {
        day: "Sunday",
        entries: []
    },
    {
        day: "Monday",
        entries: [
            { start: "9:00 AM", end: "12:00 PM", type: "Paid" },
            { start: "12:00 PM", end: "1:00 PM", type: "Unpaid" },
            { start: "1:00 PM", end: "5:00 PM", type: "Paid" },
        ]
    },
    {
        day: "Tuesday",
        entries: [
            { start: "9:00 AM", end: "12:00 PM", type: "Paid" },
            { start: "12:00 PM", end: "1:00 PM", type: "Unpaid" },
            { start: "1:00 PM", end: "5:00 PM", type: "Paid" },
        ]
    },
    {
        day: "Wednesday",
        entries: [
            { start: "9:00 AM", end: "12:00 PM", type: "Paid" },
            { start: "12:00 PM", end: "1:00 PM", type: "Unpaid" },
            { start: "1:00 PM", end: "5:00 PM", type: "Paid" },
        ]
    },
    {
        day: "Thursday",
        entries: [
            { start: "9:00 AM", end: "12:00 PM", type: "Paid" },
            { start: "12:00 PM", end: "1:00 PM", type: "Unpaid" },
            { start: "1:00 PM", end: "5:00 PM", type: "Paid" },
        ]
    },
    {
        day: "Friday",
        entries: [
            { start: "9:00 AM", end: "12:00 PM", type: "Paid" },
            { start: "12:00 PM", end: "1:00 PM", type: "Unpaid" },
            { start: "1:00 PM", end: "5:00 PM", type: "Paid" },
        ]
    },
    {
        day: "Saturday",
        entries: []
    },
];

// Create a default timesheet object using the defaultDays
const defaultTimesheet = {
    empId: "EMPLOYEE00001",
    weekStartDate: "2025-03-30T00:00:00.000Z", // Adjust as needed or compute dynamically.
    days: defaultDays,
    status: "active"
};

const Timesheet = () => {
    const [timesheet, setTimesheet] = useState(defaultTimesheet);
    const [showWeekends, setShowWeekends] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            const empID = "EMPLOYEE00001";
            const data = await getTimesheet(empID);
            if (data && data.length > 0) {
                // Use the first returned timesheet document (includes _id and days)
                setTimesheet(data[0]);
            } else {
                // No existing timesheet; keep the defaultTimesheet
                setTimesheet(defaultTimesheet);
            }
        };
        fetchData();
    }, []);

    // Update an entry's field for a specific day
    const handleEntryChange = (dayIndex, entryIndex, field, value) => {
        const updatedTimesheet = { ...timesheet };
        updatedTimesheet.days[dayIndex].entries[entryIndex][field] = value;
        setTimesheet(updatedTimesheet);
    };

    // Add a new time range entry for a given day
    const addEntry = (dayIndex) => {
        const newEntry = { start: "", end: "", type: "Paid" };
        const updatedTimesheet = { ...timesheet };
        updatedTimesheet.days[dayIndex].entries.push(newEntry);
        setTimesheet(updatedTimesheet);
    };

    // Delete an entry for a given day
    const handleDeleteEntry = (dayIndex, entryIndex) => {
        const updatedTimesheet = { ...timesheet };
        updatedTimesheet.days[dayIndex].entries.splice(entryIndex, 1);
        setTimesheet(updatedTimesheet);
    };

    // Save the timesheet: if an _id exists, update; otherwise, create a new record.
    const handleSave = async () => {
        let result;
        if (timesheet._id) {
            result = await updateTimesheet(timesheet, timesheet._id);
            if (result) {
                alert("Timesheet updated successfully!");
            } else {
                alert("Failed to update timesheet.");
            }
        } else {
            result = await createTimesheet(timesheet, timesheet.empId);
            if (result) {
                // After creation, update state to include the newly created document’s _id.
                setTimesheet(result);
                alert("Timesheet created successfully!");
            } else {
                alert("Failed to create timesheet.");
            }
        }
    };

    return (
        <div className="timesheet-wrapper">
            <div className="header">
                <h1>Weekly Timesheet</h1>
                <span className="week-start-date">
                    Week Start Date: {new Date(timesheet.weekStartDate).toLocaleDateString()}
                </span>
            </div>
            <br /><br />
            <div className="weekend-toggle">
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={showWeekends}
                        onChange={() => setShowWeekends(!showWeekends)}
                    />
                    <span className="slider"></span>
                </label>
                <span className="toggle-label">Worked Weekends?</span>
            </div>
            <div className="timesheet-container">
                {timesheet.days.map((dayData, originalIndex) => {
                    if (!showWeekends && (dayData.day === "Saturday" || dayData.day === "Sunday")) {
                        return null;
                    }

                    return (
                        <div key={dayData.day} className="day-card">
                            <h3>{dayData.day}</h3>
                            {dayData.entries.map((entry, entryIndex) => (
                                <div key={entryIndex} className="entry-row">
                                    <input
                                        type="text"
                                        placeholder="Start Time"
                                        value={entry.start}
                                        onChange={(e) =>
                                            handleEntryChange(originalIndex, entryIndex, "start", e.target.value)
                                        }
                                        className="time-input"
                                    />
                                    <span> - </span>
                                    <input
                                        type="text"
                                        placeholder="End Time"
                                        value={entry.end}
                                        onChange={(e) =>
                                            handleEntryChange(originalIndex, entryIndex, "end", e.target.value)
                                        }
                                        className="time-input"
                                    />
                                    <select
                                        value={entry.type}
                                        onChange={(e) =>
                                            handleEntryChange(originalIndex, entryIndex, "type", e.target.value)
                                        }
                                        className="type-select"
                                    >
                                        <option value="Paid">Paid</option>
                                        <option value="Unpaid">Unpaid</option>
                                        <option value="Paid Break">Paid Break</option>
                                    </select>
                                    <button
                                        onClick={() => handleDeleteEntry(originalIndex, entryIndex)}
                                        className="delete-entry-button"
                                    >
                                        x
                                    </button>
                                </div>
                            ))}
                            <Button
                                text="Add Time Range"
                                onClick={() => addEntry(originalIndex)}
                                className="add-entry-button"
                            />
                        </div>
                    );
                })}
            </div>
            <div className="save-container">
                <Button
                    text="Save Timesheet"
                    onClick={handleSave}
                    className="save-button"
                />
            </div>
        </div>
    );
};

export default Timesheet;
