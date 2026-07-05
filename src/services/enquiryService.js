const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const enquiryService = {
  async getAll({ type, status, search, dateFrom, dateTo, page = 1, limit = 50 } = {}) {
    try {
      const params = new URLSearchParams();
      if (type) params.append('type', type);
      if (status) params.append('status', status);
      if (search) params.append('search', search);
      if (dateFrom) params.append('dateFrom', dateFrom);
      if (dateTo) params.append('dateTo', dateTo);
      params.append('page', page);
      params.append('limit', limit);

      const res = await fetch(`${API_URL}/enquiries?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch enquiries');
      return await res.json(); // { data, count }
    } catch (error) {
      console.error(error);
      return { data: [], count: 0, error };
    }
  },

  async create(data) {
    try {
      const res = await fetch(`${API_URL}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create enquiry');
      return await res.json(); // { data }
    } catch (error) {
      console.error(error);
      return { data: null, error };
    }
  },

  async updateStatus(id, status) {
    try {
      const res = await fetch(`${API_URL}/enquiries/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update enquiry status');
      return await res.json(); // { data }
    } catch (error) {
      console.error(error);
      return { data: null, error };
    }
  },

  async delete(id) {
    try {
      const res = await fetch(`${API_URL}/enquiries/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete enquiry');
      return { data: null, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error };
    }
  },

  async getStats() {
    try {
      const res = await fetch(`${API_URL}/enquiries/stats`);
      if (!res.ok) throw new Error('Failed to fetch stats');
      const { data } = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      return {
        enquiries: 0,
        today: 0,
        unread: 0,
      };
    }
  },
};
