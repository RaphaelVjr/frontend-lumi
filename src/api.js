import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-lumi.vercel.app/',
});

export default api;