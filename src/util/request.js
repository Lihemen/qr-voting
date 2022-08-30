import axios from 'axios';
import { apiUrl } from '../config.json';

const request = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production' ? apiUrl.production : apiUrl.dev,
});

export { request };
