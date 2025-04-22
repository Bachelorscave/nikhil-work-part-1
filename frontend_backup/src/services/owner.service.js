import api from './api';

export const ownerService = {
  async register(ownerData) {
    const response = await api.post('/owner/register', ownerData);
    return response.data;
  },

  async login(email, password) {
    const response = await api.post('/owner/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async verifyEmail(token) {
    const response = await api.get(`/owner/verify-email/${token}`);
    return response.data;
  },

  async forgotPassword(email) {
    const response = await api.post('/owner/forgot-password', { email });
    return response.data;
  },

  async resetPassword(token, password) {
    const response = await api.post(`/owner/reset-password/${token}`, { password });
    return response.data;
  },

  async changePassword(currentPassword, newPassword) {
    const response = await api.post('/owner/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  async getCurrentOwner() {
    const response = await api.get('/owner/me');
    return response.data;
  },

  async updateProfile(profileData) {
    const response = await api.put('/owner/profile', profileData);
    return response.data;
  },

  async getOwnerProperties() {
    const response = await api.get('/owner/properties');
    return response.data;
  },

  async getOwnerBookings() {
    const response = await api.get('/owner/bookings');
    return response.data;
  },

  async updateBookingStatus(bookingId, status) {
    const response = await api.put(`/owner/bookings/${bookingId}/status`, { status });
    return response.data;
  },
}; 