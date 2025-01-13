import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000', // Update with your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosClient;
