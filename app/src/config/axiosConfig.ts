/**
 * axiosConfig.ts
 * 
 * This file configures an Axios instance with interceptors to automatically handle authentication tokens
 * and error responses. It simplifies making authenticated HTTP requests in your application.
 * 
 * How to use:
 * 1. Import the configured Axios instance (`api`) from this file wherever you need to make HTTP requests.
 * 2. Use `api.get`, `api.post`, `api.put`, `api.delete`, etc., instead of the default `axios` methods.
 * 3. The interceptor will automatically add the authentication token (if available) to the request headers.
 * 4. If a request returns a 401 Unauthorized error, the interceptor will redirect the user to the login page.
 * 
 * Example usage:
 * 
 * import api from './axiosConfig';
 * 
 * // Fetch data from an authenticated endpoint
 * api.get('/dashboard')
 *   .then((response) => {
 *     console.log('Data:', response.data);
 *   })
 *   .catch((error) => {
 *     console.error('Error fetching data:', error);
 *   });
 * 
 * // Send a POST request with data
 * api.post('/submit', { name: 'John Doe' })
 *   .then((response) => {
 *     console.log('Submission successful:', response.data);
 *   })
 *   .catch((error) => {
 *     console.error('Error submitting data:', error);
 *   });
 * 
 * Notes:
 * - The token is retrieved from `localStorage` under the key 'token'.
 * - If the token is invalid or expired, the user will be redirected to the login page.
 * - Ensure the `AuthProvider` or equivalent logic sets the token in `localStorage` during login.
 */

import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;