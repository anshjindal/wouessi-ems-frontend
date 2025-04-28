import React, { useState, useEffect } from "react";

const Timesheets = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        // ❗ Fake API call to simulate a real fetch
        const response = await fetch("https://example.com/api/timesheets");

        if (!response.ok) {
          throw new Error("Server error");
        }

        const data = await response.json();
        setTimesheets(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("⚠️ Failed to load timesheets.");

        // Optional fallback for development
        setTimesheets([
          { employee: "John Doe", date: "2025-03-28", hours: 8, status: "Pending" },
          { employee: "Jane Smith", date: "2025-03-29", hours: 7.5, status: "Approved" },
          { employee: "Alex Kim", date: "2025-03-30", hours: 6, status: "Rejected" },
        ]);
      }
    };

    fetchTimesheets();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Timesheets</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <table className="w-full border border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Employee</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Hours</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {timesheets.map((t, index) => (
            <tr key={index} className="text-center">
              <td className="p-2 border">{t.employee}</td>
              <td className="p-2 border">{t.date}</td>
              <td className="p-2 border">{t.hours}</td>
              <td className="p-2 border">
                <span
                  className={`px-2 py-1 rounded text-black text-sm font-medium ${
                    t.status === "Approved"
                      ? "bg-green-300"
                      : t.status === "Rejected"
                      ? "bg-red-300"
                      : "bg-yellow-300"
                  }`}
                >
                  {t.status || "No status"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timesheets;
