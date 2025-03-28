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
    <main aria-label="Table Wrapper" className="submittedtimesheets-wrapper">
      <table role="table" aria-label="Submitted Timesheets">
        <caption aria-label="Table Caption">Submitted TimeSheets</caption>
        <tbody>
          <tr role="row">
            {columns.map((column, index) => {
              return (
                <th role="columnheader" key={column + index}>
                  {column}
                </th>
              );
            })}
          </tr>
          {dummyData.map((data, index) => {
            return (
              <tr role="row" key={data + index}>
                <td role="cell" data-cell="employee">
                  {data.employee}
                </td>
                <td role="cell" data-cell="week">
                  {data.week}
                </td>
                <td role="cell" data-cell="total hours">
                  {data.totalHours}
                </td>
                <td
                  role="cell"
                  data-cell="status"
                  style={{
                    color: `${statusStyle[data.status]}`,
                    fontWeight: "bold",
                  }}
                >
                  {data.status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
