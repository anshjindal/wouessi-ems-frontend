const API_URL = process.env.REACT_APP_API_URL;

// Fetch Employee Details
export const getEmployeeById = async (empId, authToken) => {
    try {
        const response = await fetch(`${API_URL}/employee/${empId}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to get employee details");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching employee details:", error);
        throw error;
    }
};

// Fetch all employees
export const getAllEmployees = async (authToken) => {
    try {
        const response = await fetch(`${API_URL}/employee/employees`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch employees");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching employees:", error);
        throw error;
    }
};

// Add Employee
export const createEmployee = async (formData, authToken) => {
    try {
        const response = await fetch(`${API_URL}/employee/empAdd`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${authToken}`
            },
            body: formData
        });

        const data = await response.json();
        if (!response.ok) {
          console.error("Error response:", data);
          throw new Error(data.error || "Failed to create employee");
        }

        return data;
    } catch (error) {
        console.error("Error adding employee:", error.message);
        throw error;
    }
};

// Update Employee
export const updateEmployee = async (empId, updatedData, authToken) => {
    try {
        const isFormData = updatedData instanceof FormData;
        const response = await fetch(`${API_URL}/employee/${empId}`, {
            method: "PUT",
            credentials: "include",
            headers: isFormData
                ? { "Authorization": `Bearer ${authToken}` }
                : { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`
                  },
            body: isFormData ? updatedData : JSON.stringify(updatedData)
        });

        const result = await response.json();
        if (!response.ok) {
            console.error("Update failed:", result);
            throw new Error(result.error || "Failed to update employee");
        }
        return result;
    } catch (error) {
        console.error("Error in updateEmployee API:", error);
        throw error;
    }
};

//Deactivate Employee
export const updateEmployeeStatus = async (empId, authToken) => {
    try {
        const response = await fetch(`${API_URL}/employee/${empId}/updateEmployeeStatus`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to update employee status");
        }

        return await response.json();
    } catch (error) {
        console.error("Error toggling employee status:", error);
        throw error;
    }
};