import React from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import SubmittedTimesheetsTable from "../../components/tables/SubmittedTimesheetsTable";
import "../../styles/components/SubmittedTimesheetsTable.css";
export default function SubmittedTimesheets() {
  return (
    <main className="main-wrapper">
      <Header />
      <SubmittedTimesheetsTable />
      <Footer />
    </main>
  );
}
