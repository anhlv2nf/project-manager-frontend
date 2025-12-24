import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Interceptor for handling global errors or injecting tokens
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Global error handling can be added here
        return Promise.reject(error);
    }
);

export default apiClient;
