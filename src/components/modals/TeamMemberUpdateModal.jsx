// src/components/modals/TeamMemberUpdateModal.jsx
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TeamMemberForm from "../../components/forms/TeamMemberForm";
import { getTeamById, updateTeamMember } from "../../services/teamService";
import "../../styles/components/TeamMemberUpdateModal.css";

const TeamMemberUpdateModal = ({ show, onClose, teamId, empId, authToken, onUpdate }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!teamId || !empId) {
      setFormData({});
      setLoading(false);
      return;
    }

    setLoading(true);
    // Retrieve the doc for "TEAM00001"
    getTeamById(teamId, authToken)
      .then((response) => {
        const teamDoc = response.data; // {teamId, members: [...], etc.}
        if (!teamDoc || !teamDoc.members) {
          setFormData({});
        } else {
          const foundMember = teamDoc.members.find((m) => m.empId === empId);
          if (foundMember) {
            setFormData({
              empId: foundMember.empId,
              teamId: teamDoc.teamId,
              role: foundMember.role,
              status: foundMember.status,
            });
          } else {
            setFormData({});
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching team member details:", error);
        setFormData({});
      })
      .finally(() => setLoading(false));
  }, [teamId, empId, authToken]);

  const handleUpdate = async (updatedMember) => {
    // updatedMember => { empId, teamId, role, status }
    try {
      await updateTeamMember(
        updatedMember.teamId,
        updatedMember.empId,
        {
          role: updatedMember.role,
          status: updatedMember.status,
        },
        authToken
      );

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
  /** The team we want to fetch or update. */
  teamId: PropTypes.string,
  /** The employee we want to fetch or update inside that team. */
  empId: PropTypes.string,
  authToken: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TeamMemberUpdateModal;
