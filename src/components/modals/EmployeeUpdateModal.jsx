import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeForm from "../../components/forms/EmployeeForm";
import {
    getDepartments,
    getDesignations,
    getEmployeeById,
    getRoles,
    updateEmployee
} from "../../services/employeeService";
import "../../styles/components/EmployeeUpdateModel.css";

const EmployeeUpdateModal = ({ show, onClose, empId, onUpdate }) => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [empRes, deptRes, desigRes, roleRes] = await Promise.all([
          getEmployeeById(empId),
          getDepartments(),
          getDesignations(),
          getRoles(),
        ]);

        const employee = empRes.employee;

        const formatDate = (isoDate) => {
            if (!isoDate) return "";
            return new Date(isoDate).toISOString().split("T")[0];
        };

        const normalizedData = {
          ...employee,
          roleRef: employee?.roleRef?._id || employee.roleRef || "",
          departmentId: employee?.departmentId?._id || employee.departmentId || "",
          designations: typeof employee.designations === "object" ? employee.designations._id || "" : employee.designations || "",
          dateOfBirth: formatDate(employee.dateOfBirth),
          dateOfJoin: formatDate(employee.dateOfJoin),
          dateOfExit: formatDate(employee.dateOfExit),
        };

        setFormData(normalizedData);
        setDepartments(deptRes.departments);
        setDesignations(desigRes.designations);
        setRoles(roleRes.roles);
      } catch (error) {
        console.error("Error fetching update modal data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (empId) {
      setLoading(true);
      fetchAll();
    }
  }, [empId]);

  const handleUpdate = async (updatedEmployee) => {
    try {
      await updateEmployee(empId, updatedEmployee);
      toast.success("Employee updated successfully!");
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Failed to update employee. Please try again.");
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
          <EmployeeForm
            onSubmit={handleUpdate}
            initialData={formData}
            departments={departments}
            designations={designations}
            roles={roles}
          />
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
  onUpdate: PropTypes.func.isRequired,
};

export default EmployeeUpdateModal;