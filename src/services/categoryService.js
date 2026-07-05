const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const categoryService = {
  async getAll() {
    try {
      const res = await fetch(`${API_URL}/categories`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      return await res.json(); // { data }
    } catch (error) {
      console.error(error);
      return { data: [], error };
    }
  },

  async getWithProductCount() {
    try {
      const res = await fetch(`${API_URL}/categories/with-count`);
      if (!res.ok) throw new Error('Failed to fetch categories with count');
      return await res.json(); // { data }
    } catch (error) {
      console.error(error);
      return { data: [], error };
    }
  },

  async getById(id) {
    try {
      const res = await fetch(`${API_URL}/categories/${id}`);
      if (!res.ok) throw new Error('Failed to fetch category');
      return await res.json(); // { data }
    } catch (error) {
      console.error(error);
      return { data: null, error };
    }
  },

  async create(data) {
    try {
      const res = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create category');
      return await res.json();
    } catch (error) {
      console.error(error);
      return { data: null, error };
    }
  },

  async update(id, data) {
    try {
      const res = await fetch(`${API_URL}/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update category');
      return await res.json();
    } catch (error) {
      console.error(error);
      return { data: null, error };
    }
  },

  async delete(id) {
    try {
      const res = await fetch(`${API_URL}/categories/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete category');
      return { data: null, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error };
    }
  },
};
