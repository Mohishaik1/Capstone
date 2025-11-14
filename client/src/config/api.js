// API Configuration
// Use environment variable VITE_API_URL for production
// Falls back to localhost for development
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5500').replace(/\/$/, '');

export default API_BASE_URL;

