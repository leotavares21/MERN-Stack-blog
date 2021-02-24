import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-type': 'application/json',
    Authorization: `${
      localStorage.token ? JSON.parse(localStorage.getItem('token')).jwt : ''
    }`,
  },
});

export default api;
