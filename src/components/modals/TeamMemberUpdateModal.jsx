import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TeamMemberForm from "../../components/forms/TeamMemberForm";
import {
  getTeamById,
  updateTeamMember,
  removeTeamMember,
  addTeamMember,
} from "../../services/teamService";
import "../../styles/components/TeamMemberUpdateModal.css";

const API_URL = process.env.REACT_APP_API_URL;

const TeamMemberUpdateModal = ({
  show,
  onClose,
  teamId,
  empId,
  authToken,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [originalTeamId, setOriginalTeamId] = useState(null); // track old team

  useEffect(() => {
    if (!teamId || !empId) {
      setFormData({});
      setOriginalTeamId(null);
      setLoading(false);
      return;
    }
  
    setLoading(true);
  
    // Fetch team data AND member documents
    const fetchData = async () => {
      try {
        const response = await getTeamById(teamId, authToken);
        const teamDoc = response?.data;
  
        if (!teamDoc || !teamDoc.members) {
          setFormData({});
          return;
        }
  
        const foundMember = teamDoc.members.find((m) => m.empId === empId);
  
        if (foundMember) {
          setOriginalTeamId(teamDoc.teamId);
  
          // Fetch the document metadata
          const docRes = await fetch(`${API_URL}/teams/${teamId}/members/${empId}/documents`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
  
          let documents = [];
          if (docRes.ok) {
            const docData = await docRes.json();
            documents = docData.documents || [];
          }
  
          setFormData({
            empId: foundMember.empId,
            teamId: teamDoc.teamId,
            role: foundMember.role,
            status: foundMember.status,
            documents, 
          });
        } else {
          setFormData({});
        }
      } catch (error) {
        console.error("Error fetching team member details or documents:", error);
        setFormData({});
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [teamId, empId, authToken]);

  const handleFileUpload = async (teamId, empId, formData) => {
    const response = await fetch(`${API_URL}/teams/${teamId}/members/${empId}/documents`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      body: formData
    });
  
    if (!response.ok) {
      const text = await response.text();
      console.error("Upload error response:", text);
      throw new Error("File upload failed");
    }
  
    return await response.json();
  };
  

  const handleUpdate = async (updatedMember) => {
    try {
      // If user changed team
      if (originalTeamId && updatedMember.teamId !== originalTeamId) {
        await removeTeamMember(originalTeamId, updatedMember.empId, authToken);
        await addTeamMember(updatedMember.teamId, updatedMember, authToken);
        alert(`Team member moved and updated`);
      } else {
        await updateTeamMember(
          updatedMember.teamId,
          updatedMember.empId,
          {
            role: updatedMember.role,
            status: updatedMember.status,
          },
          authToken
        );
      }
  
      // If a file is present, upload after update
      if (updatedMember.file instanceof File) {
        const fileFormData = new FormData();
        fileFormData.append("file", updatedMember.file);
        await handleFileUpload(updatedMember.teamId, updatedMember.empId, fileFormData);
      }
  
      alert(`Team member successfully updated: ${updatedMember.empId}`);
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating team member:", error);
      alert("Failed to update team member. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>UPDATE TEAM MEMBER</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {loading ? (
          <p>Loading team member details...</p>
        ) : (
          <TeamMemberForm onSubmit={handleUpdate} initialData={formData} />
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

TeamMemberUpdateModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  /** The current team we want to fetch or update. */
  teamId: PropTypes.string,
  /** The employee we want to fetch or update inside that team. */
  empId: PropTypes.string,
  authToken: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TeamMemberUpdateModal;