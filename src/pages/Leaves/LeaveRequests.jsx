import React, { useState, useEffect } from "react";
import "../../styles/pages/Leaves.css";
import Dropdown from "../../components/common/DropDown.jsx";  
import Tag from "../../components/common/Tag";  
import { getAllLeaves } from "../../services/leavesService.js";  

const LeaveRequests = ({empId}) => {
  const [requests, setRequests] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    console.log("Fetching leaves for empId:", empId);
    const fetchLeaves = async () => {
      if (!empId) return;
      setLoading(true);
      try {
        const data = await getAllLeaves(empId);
        setRequests(data || []);
      } catch (err) {
        setError("Failed to fetch leave requests.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchLeaves();
  }, [empId]);

  const handleStatusChange = (value) => {
    setSelectedStatus(value === "Status" ? "" : value);
  };

  const filteredRequests = selectedStatus
    ? requests.filter((req) => req.status === selectedStatus)
    : requests;


  return (
    <div className="requests-container">
      <div className="table-header">
        <h5>Time off requests summary</h5>
        <Dropdown 
          label="" 
          alt="Status" 
          options={["Status", "Pending", "Accepted", "Rejected"]} 
          onSelect={handleStatusChange} 
        />
      </div>
      <div className="table-wrap">
        {loading ? (
          <p>Loading leave requests...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : filteredRequests.length === 0 ? (
          <p className="no-data">No leave requests found</p>
        ) : (
          <table className="leaves-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Duration</th>
                <th>Applied Date</th>
                <th>Approved Date</th>
                <th>Approving Manager</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req, index) => (
                <tr key={index}>
                  <td>{req.leaveType}</td>
                  <td>{new Date(req.startDate).toISOString().split("T")[0]}</td>
                  <td>{new Date(req.endDate).toISOString().split("T")[0]}</td>
                  <td>{req.duration}</td>
                  <td>{new Date(req.dateRequested).toISOString().split("T")[0]}</td>
                  <td>{req.dateApproved ? new Date(req.dateApproved).toISOString().split("T")[0] : "-"}</td>
                  <td>{req.repManagerId}</td>
                  <td>
                    <Tag text={req.status} className={req.status.toLowerCase()} />
                  </td>
                  <td className="actions">
                    <button className="action-btn">
                      <span className="dots">⋮</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>    
    </div>
  );
};

export default LeaveRequests;
