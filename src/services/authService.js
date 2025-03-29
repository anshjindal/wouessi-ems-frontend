const API_URL = process.env.REACT_APP_API_URL;

// Helper function to handle API responses
const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "An error occurred while processing your request.");
    }
    return data;
};

// Login Request (Stores sessionId, accessToken, empId)
export const login = async (empId, password) => {
    try {
        const response = await fetch(`${API_URL}/auth/authenticate`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ empId, password }),
        });

        const data = await handleResponse(response);

        localStorage.setItem("sessionId", data.sessionId);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("empId", empId);

        return { success: true, data };
    } catch (error) {
        console.error("Login error:", error.message);
        return { success: false, error: error.message || "Server error. Please try again." };
    }
};

// Logout Request (Ensure sessionId, empId, and accessToken are sent)
export const logout = async () => {
    try {
        const sessionId = localStorage.getItem("sessionId");
        const empId = localStorage.getItem("empId");
        const accessToken = localStorage.getItem("accessToken");

        if (!sessionId || !empId || !accessToken) {
            console.warn("Missing session data. Skipping logout request.");
        }

        const response = await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ sessionId, empId }),
        });

        await handleResponse(response);

        localStorage.clear();
        sessionStorage.clear();

        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        console.log("Logout successful. Redirecting...");

        setTimeout(() => {
            window.location.replace("/");
        }, 500);

        return { success: true };
    } catch (error) {
        console.error("Logout error:", error.message);
        return { success: false, error: error.message || "Logout failed. Please try again." };
    }
};
