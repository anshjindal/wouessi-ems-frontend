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

  /**
   * 1) We define `fetchTeamData` *before* the effect that calls it.
   *    Wrap it in `useCallback` so the function identity is stable 
   *    and doesn't cause extra re-renders.
   */
  const fetchTeamData = useCallback(async () => {
    try {
      const res = await getAllTeams(authToken);
      const allTeams = res.teams || [];
      setTeams(allTeams);

      const flattened = allTeams.flatMap((team) =>
        team.members.map((member) => {
          const emp = member.empId;
          // If it's an object, use firstName + lastName; otherwise just show string
          const fullName =
            typeof emp === "object" && emp !== null
              ? `${emp.firstName || ""} ${emp.lastName || ""}`.trim()
              : emp;
          return {
            empId: typeof emp === "object" ? emp.empId : emp,
            fullName,
            role: member.role,
            status: member.status,
            teamName: team.teamName,
            teamId: team.teamId,
          };
        })
      );

      setMembers(flattened);
    } catch (err) {
      console.error("Error fetching team members:", err);
    }
  }, [authToken]);

  /**
   * 2) Single useEffect that runs `fetchTeamData` on mount 
   *    and whenever `fetchTeamData` changes (i.e., if authToken changes).
   */
  useEffect(() => {
    // Grab token from localStorage if not already set
    const token = localStorage.getItem("accessToken");
    if (token) setAuthToken(token);

    // Now call fetchTeamData
    fetchTeamData();
  }, [fetchTeamData]);

  /**
   * 3) For adding a Team Member
   */
  const handleAddTeamMember = async (memberData) => {
    try {
      // e.g. { empId, teamId, role, status }
      await addTeamMember(memberData.teamId, memberData, authToken);
      alert("Team member successfully added!");
      // Refresh data
      fetchTeamData();
      setActiveTab("VIEW TEAM MEMBERS");
    } catch (error) {
      console.error("Failed to add team member:", error);
      alert("Failed to add team member.");
    }
  };

  /**
   * 4) For editing a Team Member, store in state which team + member we want
   */
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

  /**
   * 5) Filter logic for searching
   */
  const filteredMembers = members.filter((m) =>
    `${m.fullName} ${m.role} ${m.status} ${m.teamName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  /**
   * 6) Export to Excel
   */
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
        {/* Navigation Tabs */}
        <ul className="nav nav-tabs mb-3">
          {["VIEW TEAM MEMBERS", "ADD TEAM MEMBER", "UPDATE TEAM MEMBER"].map((tab) => (
            <li className="nav-item" key={tab}>
              <button
                className={`nav-link ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>

        {/* VIEW TEAM MEMBERS */}
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
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((m, idx) => (
                    <tr key={`${m.empId}-${idx}`}>
                      <td data-label="Name">{m.fullName || m.empId}</td>
                      <td data-label="Team">{m.teamName}</td>
                      <td data-label="Role">{m.role}</td>
                      <td data-label="Status">{m.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ADD TEAM MEMBER */}
        {activeTab === "ADD TEAM MEMBER" && (
          <div className="form-container">
            <TeamMemberForm onSubmit={handleAddTeamMember} />
          </div>
        )}

        {/* UPDATE TEAM MEMBER */}
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
