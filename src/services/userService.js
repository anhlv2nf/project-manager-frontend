import apiClient from './apiClient';

const userService = {
    getAllUsers: () => {
        return apiClient.get('/api/users');
    },

    getUserById: (id) => {
        return apiClient.get(`/api/users/${id}`);
    },

    createUser: (data) => {
        return apiClient.post('/api/users', data);
    },

    updateUser: (id, data) => {
        return apiClient.put(`/api/users/${id}`, data);
    },

    deleteUser: (id) => {
        return apiClient.delete(`/api/users/${id}`);
    }
};

export default userService;
