// API Configuration new
export const API_BASE_URL = "https://confrence.bhook.food";

// Helper function to get auth headers
export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};
