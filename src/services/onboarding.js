import { fetchWithAuth } from "./authService";
const API_URL = process.env.REACT_APP_API_URL;

export const submitOnboardingDocuments = async (empId, uploadedDocs) => {
  try {
    if (!uploadedDocs || typeof uploadedDocs !== "object") {
      throw new Error("Uploaded documents are missing or invalid");
    }

    const formData = new FormData();
    formData.append("logId", empId); // Using empId as logId for now

    Object.entries(uploadedDocs).forEach(([key, doc]) => {
      if (doc?.file) {
        formData.append(key, doc.file);
      }
    });

    const response = await fetchWithAuth(`${API_URL}/onboarding/submit/${empId}`, {
      method: "POST",
      body: formData,
    });

    const contentType = response.headers.get("content-type") || "";
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to submit onboarding documents");
    }

    if (!contentType.includes("application/json")) {
      const errorHtml = await response.text();
      throw new Error("Expected JSON, received HTML: " + errorHtml);
    }

    return await response.json();
  } catch (error) {
    console.error("Onboarding submission error:", error);
    throw error;
  }
};