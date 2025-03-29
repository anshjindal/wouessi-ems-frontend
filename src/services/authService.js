const API_URL = process.env.REACT_APP_API_URL;

// Login Request (Stores sessionId, accessToken, empId)
export const login = async (empId, password) => {
    try {
        const response = await fetch(`${API_URL}/auth/authenticate`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ empId, password })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        localStorage.setItem("sessionId", data.sessionId);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("empId", empId);

        return data;
    } catch (error) {
        throw new Error(error.message || "Server error. Please try again.");
    }
};

// Logout Request (Ensure sessionId, empId and accessToken are sent)
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
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ sessionId, empId })
        });

        if (!response.ok) {
            throw new Error("Logout failed");
        }

        localStorage.clear();
        sessionStorage.clear();

        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        console.log("Logout successful. Redirecting...");

        setTimeout(() => {
            window.location.replace("/");
        }, 500);

    } catch (error) {
        console.error("Logout error:", error.message);
    }
};