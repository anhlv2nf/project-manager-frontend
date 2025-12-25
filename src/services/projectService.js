import apiClient from './apiClient';

const projectService = {
    getAllProjects: () => {
        return apiClient.get('/api/projects');
    },

    getProjectById: (id) => {
        return apiClient.get(`/api/projects/${id}`);
    },

    createProject: (data) => {
        return apiClient.post('/api/projects', data);
    },

    updateProject: (id, data) => {
        return apiClient.put(`/api/projects/${id}`, data);
    },

    deleteProject: (id) => {
        return apiClient.delete(`/api/projects/${id}`);
    }
};

export default projectService;
