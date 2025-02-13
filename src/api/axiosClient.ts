import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://zythologue-api-jn.onrender.com', // Update with your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosClient;
