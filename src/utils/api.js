import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Relative path pointing to Vercel Serverless Functions
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
