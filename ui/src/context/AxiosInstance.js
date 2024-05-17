import axios from 'axios';

// const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`
  },
});

export default axiosInstance;