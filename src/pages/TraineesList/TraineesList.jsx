import { useState } from "react";
import styles from "./TraineesList.module.scss";


// Title Component 
// @ts-ignore
const TitleWithCohort = ({ title, cohort }) => (
  <div className={styles["trainee-title-row"]}>
    <h1 className={styles["trainee-form-title"]}>{title}</h1>
    <span className={styles["trainee-cohort-tag"]}>{cohort}</span>
  </div>
);

// Table Header with Sort
// @ts-ignore
const TableHeader = ({ label, sortable }) => (
  <div className={styles["trainee-table-header"]}>
    <span>{label}</span>
    {sortable && (
      <button className={styles["trainee-sort-button"]}>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 10l5 5 5-5" />
        </svg>
      </button>
    )}
  </div>
);

// Pagination Component
// @ts-ignore
const Pagination = ({ currentPage, totalPages, onPageChange, rowsPerPage, totalRows }) => {
  const pages = [];
  const totalPageCount = Math.ceil(totalRows / rowsPerPage);

  for (let i = 1; i <= totalPageCount; i++) {
    pages.push(i);
  }

  return (
    <div className={styles["trainee-pagination"]}>
      <button
        className={styles["trainee-pagination-btn"]}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {pages.map(page => (
        <button
          key={page}
          className={`${styles["trainee-pagination-btn"]} ${page === currentPage ? styles["active"] : ''} ${styles["trainee-pagination-btn-circle"]}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className={styles["trainee-pagination-btn"]}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPageCount}
      >
        Next
      </button>

      <div className={styles["trainee-pagination-info"]}>
        Showing {rowsPerPage * (currentPage - 1) + 1} to {Math.min(rowsPerPage * currentPage, totalRows)} of {totalRows}
      </div>
    </div>
  );
};

// Main Component
const TraineesList = () => {
  const [cohort] = useState("Cohort 4");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(12);

  // @ts-ignore
  const trainees = Array(100).fill().map((_, index) => ({
    id: index + 1,
    name: "First + middle + last",
    position: "Frontend",
    cohort: "4",
    qualified: "No",
    payrollRemote: "Inactive",
    registrationDate: "April 15, 2025"
  }));

  const totalRows = trainees.length;

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentTrainees = trainees.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className={styles["trainee-app-container"]}>
      <div className={styles["trainee-main-content"]}>
        <TitleWithCohort title="Trainees list" cohort={cohort} />

        {/* Stats Banner */}
        <div className={styles["trainee-stats-banner"]}>
          <div className={styles["trainee-stats-info"]}>
            <div className={styles["trainee-stats-indicator"]}></div>
            <p>None of the <strong>450 registered students</strong> have been vetted yet.</p>
          </div>

          <button className={styles["trainee-vetting-btn"]}>
            Run vetting process
            <span className={styles["trainee-lock-icon"]}>🔒</span>
          </button>
        </div>

        {/* Table */}
        <div className={styles["trainee-table-container"]}>
          <table className={styles["trainee-table"]}>
            <thead>
              <tr>
                <th><TableHeader label="Name" sortable={true} /></th>
                <th><TableHeader label="Position" sortable={true} /></th>
                <th><TableHeader label="Cohort" sortable={true} />
                </th>
                <th><TableHeader label="Qualified" sortable={true} /></th>
                <th><TableHeader label="Payroll remote" sortable={true} /></th>
                <th><TableHeader label="Registration Date" sortable={true} /></th>
              </tr>
            </thead>
            <tbody>
              {currentTrainees.map(trainee => (
                <tr key={trainee.id}>
                  <td>{trainee.name}</td>
                  <td>{trainee.position}</td>
                  <td>{trainee.cohort}</td>
                  <td>
                    {trainee.qualified === "No" ? (
                      <span className={styles["highlight-no"]}>No</span>
                    ) : (
                      trainee.qualified
                    )}
                  </td>
                  <td>
                    <span className={trainee.payrollRemote === "Inactive" ? styles["highlight-inactive"] : ""}>
                      {trainee.payrollRemote}
                    </span>
                  </td>
                  <td>{trainee.registrationDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalRows / rowsPerPage)}
          onPageChange={setCurrentPage}
          rowsPerPage={rowsPerPage}
          totalRows={totalRows}
        />
      </div>
    </div>
  );
};

export default TraineesList;
