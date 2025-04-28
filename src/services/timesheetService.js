const API_URL = process.env.REACT_APP_API_URL;

export const saveTimeSheet = async (timeSheetData, authToken) => {
  try {
    const response = await fetch(`${API_URL}/timesheet/createTimesheet`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(timeSheetData),
    });

    if (!response.ok) {
      console.log("there was an error with saving the time sheet", response);
      throw new Error(
        response.error || "There was an error creating the timesheet"
      );
    }
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log("Error saving timesheet " + error.message);
    throw error;
  }
};
