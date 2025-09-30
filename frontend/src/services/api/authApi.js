import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const authApi = {
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response;
  },
  
  logout: async () => {
    const response = await axios.post(`${API_URL}/auth/logout`);
    return response;
  },
  
  forgotPassword: async (email) => {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
    return response;
  },
  
  resetPassword: async (token, password) => {
    const response = await axios.post(`${API_URL}/auth/reset-password`, { token, password });
    return response;
  }
};

export default authApi;