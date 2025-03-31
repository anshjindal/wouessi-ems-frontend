// src/pages/team/TeamMemberManagement.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState, useCallback } from "react";
import * as XLSX from "xlsx";
import Button from "../../components/common/Button";
import TeamMemberForm from "../../components/forms/TeamMemberForm";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import TeamMemberUpdateModal from "../../components/modals/TeamMemberUpdateModal";
import { getAllTeams, addTeamMember } from "../../services/teamService";
import "../../styles/pages/TeamMemberManagement.css";

const TeamMemberManagement = () => {
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);
  const [activeTab, setActiveTab] = useState("VIEW TEAM MEMBERS");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [authToken, setAuthToken] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTeamData = useCallback(async () => {
    try {
      const res = await getAllTeams(authToken);
      // res should have shape: { success: true, teams: [...] }
      const allTeams = res.teams || [];
      setTeams(allTeams);

      // Flatten out the members array
      const flattened = allTeams.flatMap((team) =>
        team.members.map((member) => {
          // each aggregator entry has .fullName from the pipeline
          return {
            empId: member.empId,
            fullName: member.fullName, 
            role: member.role,
            status: member.status,
            teamName: team.teamName,
            teamId: team.teamId,
            documents: member.documents || [] 
          };
        })
      );

      setMembers(flattened);
    } catch (err) {
      console.error("Error fetching team members:", err);
    }
  }, [authToken]);

  // Single useEffect that runs fetchTeamData on mount + whenever fetchTeamData changes
useEffect(() => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    setAuthToken(token);
  }
}, []);

// Fetch team data only once the token is ready
useEffect(() => {
  if (authToken) {
    fetchTeamData();
  }
}, [authToken, fetchTeamData]);

  //For adding a new team member
  const handleAddTeamMember = async (memberData) => {
    try {
      await addTeamMember(memberData.teamId, memberData, authToken);
      alert("Team member successfully added!");
      fetchTeamData();
      setActiveTab("VIEW TEAM MEMBERS");
    } catch (error) {
      console.error("Failed to add team member:", error);
      alert("Failed to add team member.");
    }
  };

  // pass BOTH teamId and empId to the modal
  const handleEditClick = (teamId, empId) => {
    setSelectedTeamId(teamId);
    setSelectedMemberId(empId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTeamId(null);
    setSelectedMemberId(null);
  };

  // Filter logic for searching
  const filteredMembers = members.filter((m) =>
    `${m.fullName} ${m.role} ${m.status} ${m.teamName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  
  //Export to Excel
  const exportToExcel = () => {
    if (members.length === 0) {
      alert("No members to export.");
      return;
    }
    const data = members.map((m) => ({
      "Employee Name": m.fullName,
      "Team": m.teamName,
      "Role": m.role,
      "Status": m.status,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TeamMembers");
    XLSX.writeFile(workbook, "TeamMembers.xlsx");
  };

  return (
    <>
      <Header />
      <div className="container team-member-management">
        <ul className="nav nav-tabs mb-3">
          {["VIEW TEAM MEMBERS", "ADD TEAM MEMBER", "UPDATE TEAM MEMBER"].map((tab) => (
            <li className="nav-item" key={tab}>
              <button className={`nav-link ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
              {tab}
              </button>
            </li>
          ))}
        </ul>

        {activeTab === "VIEW TEAM MEMBERS" && (
          <>
            <div className="search-container d-flex justify-content-between mb-3">
              <input
                type="text"
                placeholder="Search team members..."
                className="form-control w-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button text="Export to Excel" className="btn-export" onClick={exportToExcel} />
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Team</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Document</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((m, idx) => (
                    <tr key={`${m.empId}-${idx}`}>
                      <td data-label="Name">{m.fullName || m.empId}</td>
                      <td data-label="Team">{m.teamName}</td>
                      <td data-label="Role">{m.role}</td>
                      <td data-label="Status">{m.status}</td>
                      <td>
                        {m.documents?.[0]?.fileName
                        ? m.documents[0].fileName
                        : "No document uploaded"}
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === "ADD TEAM MEMBER" && (
          <div className="form-container">
            <TeamMemberForm onSubmit={handleAddTeamMember} />
          </div>
        )}

        {activeTab === "UPDATE TEAM MEMBER" && (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Team</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((m, idx) => (
                  <tr key={`${m.empId}-${idx}`}>
                    <td>{m.fullName}</td>
                    <td>{m.teamName}</td>
                    <td>{m.role}</td>
                    <td>{m.status}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEditClick(m.teamId, m.empId)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <TeamMemberUpdateModal
          show={isModalOpen}
          onClose={handleCloseModal}
          teamId={selectedTeamId}
          empId={selectedMemberId}
          authToken={authToken}
          onUpdate={fetchTeamData}
        />
      </div>
      <Footer />
    </>
  );
};

export default TeamMemberManagement;