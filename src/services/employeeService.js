import { fetchWithAuth } from "./authService";
const API_URL = process.env.REACT_APP_API_URL;

// Fetch Employee Details
export const getEmployeeById = async (empId, authToken) => {
  try {
    const response = await fetch(`${API_URL}/employee/${empId}`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to get employee details");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching employee details:", error);
    return null;
  }
};

// Fetch all employees
export const getAllEmployees = async () => {
  try {
    const response = await fetchWithAuth("/employee/employees", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Failed to fetch employees");
    return await response.json();
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

// Add Employee
export const createEmployee = async (formData) => {
  try {
    const response = await fetchWithAuth("/employee/empAdd", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!response.ok)
      throw new Error(data.error || "Failed to create employee");

    return data;
  } catch (error) {
    console.error("Error adding employee:", error.message);
    throw error;
  }
};

// Update Employee
export const updateEmployee = async (empId, updatedData) => {
  try {
    const isFormData = updatedData instanceof FormData;
    const response = await fetchWithAuth(`/employee/${empId}`, {
      method: "PUT",
      headers: isFormData ? {} : { "Content-Type": "application/json" },
      body: isFormData ? updatedData : JSON.stringify(updatedData),
    });

    const result = await response.json();
    if (!response.ok)
      throw new Error(result.error || "Failed to update employee");

    return result;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

//Deactivate Employee
export const updateEmployeeStatus = async (empId, authToken) => {
  try {
    const response = await fetch(
      `${API_URL}/employee/${empId}/updateEmployeeStatus`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update employee status");
    }

    return await response.json();
  } catch (error) {
    console.error("Error toggling employee status:", error);
    throw error;
  }
};

// Get Departments
export const getDepartments = async () => {
  try {
    const response = await fetchWithAuth("/department/getDepartments", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Failed to fetch departments");
    return await response.json();
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

// Get Designations
export const getDesignations = async () => {
  try {
    const response = await fetchWithAuth("/designation/getDesignations", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Failed to fetch designations");
    return await response.json();
  } catch (error) {
    console.error("Error fetching designations:", error);
    throw error;
  }
};

// Get Roles
export const getRoles = async () => {
  try {
    const response = await fetchWithAuth("/role/getRoles", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Failed to fetch roles");
    return await response.json();
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
};
