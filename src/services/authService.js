import apiClient from './apiClient';

const authService = {
    login: async (credentials) => {
        const response = await apiClient.post('/api/login', credentials);
        if (response.data?.data?.access_token) {
            localStorage.setItem('access_token', response.data.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
        return response.data;
    },

    logout: async () => {
        await apiClient.post('/api/logout');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
    },

    changePassword: (data) => {
        return apiClient.post('/api/change-password', data);
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
};

export default authService;
