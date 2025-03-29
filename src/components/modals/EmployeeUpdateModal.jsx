import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import EmployeeForm from "../../components/forms/EmployeeForm";
import { getEmployeeById, updateEmployee } from "../../services/employeeService";
import "../../styles/components/EmployeeUpdateModel.css";

const EmployeeUpdateModal = ({ show, onClose, empId, authToken, onUpdate }) => {
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (empId) {
            setLoading(true);
            getEmployeeById(empId, authToken)
                .then((response) => {
                    setFormData(response.employee);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching employee details:", error);
                    setLoading(false);
                });
        }
    }, [empId, authToken]);

    const handleUpdate = async (updatedEmployee) => {
        try {
            const response = await updateEmployee(empId, updatedEmployee, authToken);          
            alert(empId + "Employee Details Successfully Updated");
            onUpdate();
            onClose();
        } catch (error) {
            console.error("Error updating employee:", error);
            alert("Failed to update employee. Please try again.");
        }
    };
    
    return (
        <Modal show={show} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>UPDATE EMPLOYEE</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <p>Loading employee details...</p>
                ) : (
                    <EmployeeForm onSubmit={handleUpdate} initialData={formData} />
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

EmployeeUpdateModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    empId: PropTypes.string,
    authToken: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default EmployeeUpdateModal;