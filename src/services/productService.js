const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const productService = {
  async getAll({ category, featured, search, gender, fabric_type, customization, max_price, page = 1, limit = 12, showHidden = false } = {}) {
    try {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (featured) params.append('featured', 'true');
      if (search) params.append('search', search);
      if (gender) params.append('gender', gender);
      if (fabric_type) params.append('fabric_type', fabric_type);
      if (customization !== undefined && customization !== null && customization !== '') {
        params.append('customization', String(customization));
      }
      if (max_price) params.append('max_price', max_price);
      params.append('page', page);
      params.append('limit', limit);
      if (showHidden) params.append('showHidden', 'true');

      const res = await fetch(`${API_URL}/products?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      return await res.json(); // { data, count }
    } catch (error) {
      console.error(error);
      return { data: [], count: 0, error };
    }
  },

  async getById(id) {
    try {
      const res = await fetch(`${API_URL}/products/${id}`);
      if (!res.ok) throw new Error('Failed to fetch product');
      return await res.json(); // { data }
    } catch (error) {
      console.error(error);
      return { data: null, error };
    }
  },

  async create(data) {
    try {
      const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create product');
      return await res.json();
    } catch (error) {
      console.error(error);
      return { data: null, error };
    }
  },

  async update(id, data) {
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update product');
      return await res.json();
    } catch (error) {
      console.error(error);
      return { data: null, error };
    }
  },

  async delete(id) {
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete product');
      return { data: null, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error };
    }
  },

  async uploadImage(file, productId) {
    // This needs a multipart form data implementation in backend, 
    // For now returning mock url or we would implement upload endpoint.
    // If supabase storage is used directly from frontend, we could keep it.
    console.warn("uploadImage not fully implemented via Express backend yet.");
    return URL.createObjectURL(file);
  },

  async deleteImage(url) {
    console.warn("deleteImage not fully implemented via Express backend yet.");
    return { data: null, error: null };
  },
};
