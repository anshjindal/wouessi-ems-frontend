import React from "react";
import "../../styles/components/SubmittedTimesheetsTable.css";
const columns = ["Employee", "Week", "Total Hours", "Status"];
const dummyData = [
  {
    employee: "John Doe",
    week: "03/25/2025",
    totalHours: "40h",
    status: "Pending",
  },
  {
    employee: "John Doe",
    week: "03/25/2025",
    totalHours: "40h",
    status: "Pending",
  },
  {
    employee: "John Doe",
    week: "03/25/2025",
    totalHours: "40h",
    status: "Pending",
  },
  {
    employee: "John Doe",
    week: "03/25/2025",
    totalHours: "40h",
    status: "Accepted",
  },
  {
    employee: "John Doe",
    week: "03/25/2025",
    totalHours: "40h",
    status: "Rejected",
  },
];
const statusStyle = {
  Pending: "#F29339",
  Accepted: "green",
  Rejected: "red",
};
export default function SubmittedTimesheetsTable() {
  return (
      <main className="submittedtimesheets-wrapper">
        <table>
          <caption>Submitted TimeSheets</caption>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={column + index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dummyData.map((data, index) => (
              <tr key={index}>
                <td data-cell="employee">{data.employee}</td>
                <td data-cell="week">{data.week}</td>
                <td data-cell="total hours">{data.totalHours}</td>
                <td
                  data-cell="status"
                  style={{
                    color: statusStyle[data.status],
                    fontWeight: "bold",
                  }}
                >
                  {data.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    );
}
