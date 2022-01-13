import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_IMAGE_URL}/`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 1000 * 2, // Wait for request to complete in 2 seconds
});

export default instance;
