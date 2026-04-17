// API Configuration new
export const API_BASE_URL = " http://135.235.195.46";

// Helper function to get auth headers
export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};
