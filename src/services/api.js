import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = token => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default instance;
