// API Configuration new
export const API_BASE_URL = "http://127.0.0.1:5000";

// Helper function to get auth headers
export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};
