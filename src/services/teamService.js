const API_URL = process.env.REACT_APP_API_URL;

// Get all teams and their members
export const getAllTeams = async (authToken) => {
    try {
        const response = await fetch(`${API_URL}/teams`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch teams");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching teams:", error);
        throw error;
    }
};

// Get a single team by ID
export const getTeamById = async (teamId, authToken) => {
    try {
        const response = await fetch(`${API_URL}/teams/${teamId}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch team");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching team:", error);
        throw error;
    }
};

// Add a new team member
export const addTeamMember = async (teamId, memberData, authToken) => {
    try {
        const response = await fetch(`${API_URL}/teams/${teamId}/members`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify(memberData)
        });

        if (!response.ok) {
            throw new Error("Failed to add team member");
        }

        return await response.json();
    } catch (error) {
        console.error("Error adding team member:", error);
        throw error;
    }
};

// Update a team member (role/status)
export const updateTeamMember = async (teamId, empId, updatedData, authToken) => {
    try {
        const response = await fetch(`${API_URL}/teams/${teamId}/members/${empId}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            throw new Error("Failed to update team member");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating team member:", error);
        throw error;
    }
};

// Upload team members via file
export const uploadTeamMembersFile = async (formData, authToken) => {
    try {
        const response = await fetch(`${API_URL}/teams/upload`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${authToken}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error("Failed to upload file");
        }

        return await response.json();
    } catch (error) {
        console.error("File upload failed:", error);
        throw error;
    }
};