const API_URL = process.env.REACT_APP_API_URL;
console.log("API_URL:", API_URL);

//Fetch all leaves
export const getAllLeaves = async (empID) =>{
    console.log("empID from useParams:", empID);
    try{
        const response = await fetch(`${API_URL}/leaves/${empID}`,{
        method:"GET",
        credentials: "include",
        headers: {"Content-Type":"application/json"}
    });
    
    if(!response.ok){
        throw new Error("No leaves found");
    }
    console.log(response);
    return await response.json();
    } catch (error) {
        console.error("Error fetching leaves:", error);
        return null;
    }
};

//Add leaves
export const createLeave = async (formData, empID) => {
    try{
        const response = await fetch(`${API_URL}/leaves/${empID}`,{
            method:"POST",
            credentials:"include",
            body: formData
        });

        const data = await response.json();
        if (!response.ok) {
            console.error("Error response:", data);
            throw new Error(data.error || "Failed to create leave");
        }
        return data;

    } catch (error) {
        console.error("Error creating leave:", error);
        return null;
    }
};

//Update leaves
export const updateLeave = async (updatedData, empId) => {
    try{
        const isFormData = updatedData instanceof FormData; 
        const response = await fetch(`${API_URL}/leaves/${empId}`,{
            method:"PUT",
            credentials:"include",
            body: isFormData ? updatedData : JSON.stringify(updatedData),
            headers: isFormData ? {} : { "Content-Type": "application/json" }
        });

        const result = await response.json();
        if (!response.ok) {
            console.error("Update failed:", result);
            throw new Error(result.error || "Failed to update leave");
        }
        return result;

    } catch (error) {
        console.error("Error updating leave:", error);
        return null;
    }
};