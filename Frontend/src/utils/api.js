import axios from 'axios';

// Axios instance using proxy (http://localhost:5000 is handled by React proxy)
const api = axios.create({
  baseURL: '', // Leave blank so it uses React proxy set in package.json
});

// Optional: Attach auth token from localStorage if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
