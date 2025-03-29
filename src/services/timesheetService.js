const API_URL = process.env.REACT_APP_API_URL;
console.log("API_URL:", API_URL);

// Fetch the timesheet for a given employee
export const getTimesheet = async (empID) => {
  console.log("empID from useParams:", empID);
  try {
    const response = await fetch(`${API_URL}/timesheet?${empID}`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" }
    });
    
    if (!response.ok) {
      throw new Error("No timesheet found");
    }
    console.log(response);
    return await response.json();
  } catch (error) {
    console.error("Error fetching timesheet:", error);
    return null;
  }
};

// Create a new timesheet for the employee
export const createTimesheet = async (formData, empID) => {
  try {
    const response = await fetch(`${API_URL}/timesheet?${empID}`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Error response:", data);
      throw new Error(data.error || "Failed to create timesheet");
    }
    return data;
  } catch (error) {
    console.error("Error creating timesheet:", error);
    return null;
  }
};

// Update an existing timesheet
export const updateTimesheet = async (updatedData, timesheetId) => {
  try {
    const response = await fetch(`${API_URL}/timesheet/${timesheetId}`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(updatedData),
      headers: { "Content-Type": "application/json" }
    });

    const result = await response.json();
    if (!response.ok) {
      console.error("Update failed:", result);
      throw new Error(result.error || "Failed to update timesheet");
    }
    return result;
  } catch (error) {
    console.error("Error updating timesheet:", error);
    return null;
  }
};
