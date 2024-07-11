import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; 

export default {
  getCategories() {
    return axios.get(`${API_BASE_URL}/category`);
  },
  getModules() {
    return axios.get(`${API_BASE_URL}/module`);
  },
  getModulesById(id) {
    return axios.get(`${API_BASE_URL}/module/${id}`);
  },
  addModule(module) {
    return axios.post(`${API_BASE_URL}/module`, module);
  },
  updateModule(id, module) {
    return axios.put(`${API_BASE_URL}/module/${id}`, module);
  },
  deleteModule(id) {
    return axios.delete(`${API_BASE_URL}/module/${id}`);
  },
  addTopic(moduleId, topic) {
    return axios.post(`${API_BASE_URL}/module/${moduleId}/topic`, topic);
  },
  deleteTopic(moduleId, topicId) {
    return axios.delete(`${API_BASE_URL}/module/${moduleId}/topic/${topicId}`);
  }
};