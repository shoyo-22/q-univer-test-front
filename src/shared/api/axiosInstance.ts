import axios from 'axios';

const api = axios.create({
  baseURL: 'https://q-univer-test-back.onrender.com',
  withCredentials: true,
});

export default api;
