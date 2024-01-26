import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
});

axiosInstance.interceptors.request.use((request) => {
    return request
});

axiosInstance.interceptors.response.use((response) => {
    return response
})

export default axiosInstance