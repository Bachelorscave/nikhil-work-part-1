import api from './api';

export const propertyService = {
  async getAllProperties(filters = {}) {
    const response = await api.get('/properties', { params: filters });
    return response.data;
  },

  async getPropertyById(id) {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },

  async createProperty(propertyData) {
    const response = await api.post('/properties', propertyData);
    return response.data;
  },

  async updateProperty(id, propertyData) {
    const response = await api.put(`/properties/${id}`, propertyData);
    return response.data;
  },

  async deleteProperty(id) {
    const response = await api.delete(`/properties/${id}`);
    return response.data;
  },

  async getOwnerProperties() {
    const response = await api.get('/owner/properties');
    return response.data;
  },

  async addPropertyImage(id, imageData) {
    const formData = new FormData();
    formData.append('image', imageData);
    const response = await api.post(`/properties/${id}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async removePropertyImage(id, imageId) {
    const response = await api.delete(`/properties/${id}/images/${imageId}`);
    return response.data;
  },
}; 