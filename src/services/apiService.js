export const fetchWithErrorHandling = async (url, options = {}, errorMessage = 'Failed to load data') => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        window.alert(errorMessage);
        return null; // or throw error if you want to handle it elsewhere
    }
};