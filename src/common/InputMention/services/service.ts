import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3100/',
  headers: { 'Content-Type': 'application/json' },
  timeout: 1000 * 2, // Wait for request to complete in 2 seconds
});

export default instance;
