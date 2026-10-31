import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If unauthenticated on protected routes, can trigger redirect or clear state
    if (error.response && error.response.status === 401) {
      // Session expired or unauthenticated
    }
    return Promise.reject(error);
  }
);

export default api;

