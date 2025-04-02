// src/services/emailService.js

const API_URL = process.env.REACT_APP_API_URL;

export const sendBulkCertificates = async (recipients) => {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API_URL}/email/send-certificates`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ recipients })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Email sending failed.");
    }

    return response.json();
};
