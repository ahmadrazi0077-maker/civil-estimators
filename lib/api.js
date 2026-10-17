import { services as fallbackServices } from './data';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://civil-backend-ir36.onrender.com/api';

// Helper function to get auth token
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('adminToken');
  }
  return null;
};

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);

    // Token expired/invalid -> drop local session and send admin back to login
    if (response.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      if (
        window.location.pathname.startsWith('/admin') &&
        window.location.pathname !== '/admin/login'
      ) {
        window.location.href = '/admin/login';
      }
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// Auth APIs
export const authAPI = {
  login: (credentials) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  getProfile: () =>
    apiCall('/auth/profile'),

  updateProfile: (data) =>
    apiCall('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// Services APIs
// Services API
export const servicesAPI = {
  getAll: async () => {
    try {
      return await apiCall('/services');
    } catch (error) {
      console.warn('Failed to fetch services, using fallback');
      return fallbackServices;
    }
  },

  getAllAdmin: async () => {
    try {
      return await apiCall('/services/all');
    } catch (error) {
      console.warn('Failed to fetch all services');
      return { services: fallbackServices, total: fallbackServices.length };
    }
  },

  getBySlug: async (slug) => {
    try {
      return await apiCall(`/services/slug/${slug}`);
    } catch (error) {
      const service = fallbackServices.find(s => s.slug === slug);
      if (service) return service;
      throw error;
    }
  },

  getById: async (id) => {
    try {
      return await apiCall(`/services/id/${id}`);
    } catch (error) {
      console.error(`Failed to fetch service: ${id}`);
      throw error;
    }
  },

  create: async (data) => {
    try {
      return await apiCall('/services', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Failed to create service:', error);
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      console.log('Updating service:', id, data);
      return await apiCall(`/services/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Failed to update service:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      return await apiCall(`/services/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Failed to delete service:', error);
      throw error;
    }
  },
};

// Blog APIs
// Blog API with fallback
export const blogAPI = {
  getAll: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      return await apiCall(`/blog${queryString ? `?${queryString}` : ''}`);
    } catch (error) {
      console.warn('Failed to fetch blog posts, returning empty');
      return { posts: [], total: 0 };
    }
  },

  getAllAdmin: async () => {
    try {
      return await apiCall('/blog/all');
    } catch (error) {
      console.warn('Failed to fetch all blog posts');
      return { posts: [], total: 0 };
    }
  },

  getBySlug: async (slug) => {
    try {
      return await apiCall(`/blog/${slug}`);
    } catch (error) {
      console.warn(`Failed to fetch blog post: ${slug}`);
      return null;
    }
  },

  create: async (data) => {
    try {
      return await apiCall('/blog', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Failed to create blog post:', error);
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      return await apiCall(`/blog/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Failed to update blog post:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      return await apiCall(`/blog/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Failed to delete blog post:', error);
      throw error;
    }
  },
};

// Inquiry APIs
// Inquiry API
export const inquiryAPI = {
  create: async (data) => {
    try {
      return await apiCall('/inquiries', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Failed to create inquiry:', error);
      throw error;
    }
  },

  getAll: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      return await apiCall(`/inquiries${queryString ? `?${queryString}` : ''}`);
    } catch (error) {
      console.warn('Failed to fetch inquiries, returning empty');
      return { inquiries: [], total: 0 };
    }
  },

  getById: async (id) => {
    try {
      return await apiCall(`/inquiries/${id}`);
    } catch (error) {
      console.error(`Failed to fetch inquiry: ${id}`);
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      return await apiCall(`/inquiries/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Failed to update inquiry:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      return await apiCall(`/inquiries/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Failed to delete inquiry:', error);
      throw error;
    }
  },

  markAsRead: async (id) => {
    try {
      return await apiCall(`/inquiries/${id}/read`, {
        method: 'PATCH',
      });
    } catch (error) {
      console.error('Failed to mark inquiry as read:', error);
      throw error;
    }
  },

  getStats: async () => {
    try {
      return await apiCall('/inquiries/stats');
    } catch (error) {
      console.warn('Failed to fetch inquiry stats');
      return { total: 0, new: 0, read: 0, replied: 0, archived: 0 };
    }
  },
};

// Upload API - public quote drawing uploads (no login required)
export const uploadAPI = {
  uploadImage: (image, folder, filename) =>
    apiCall('/upload/quote', {
      method: 'POST',
      body: JSON.stringify({ image, folder, filename }),
    }),
};

export default {
  auth: authAPI,
  services: servicesAPI,
  blog: blogAPI,
  inquiries: inquiryAPI,
  upload: uploadAPI,
};

// Project APIs with better error handling
export const projectsAPI = {
  getAll: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const data = await apiCall(`/projects${queryString ? `?${queryString}` : ''}`);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.warn('Failed to fetch projects, returning empty array');
      return [];
    }
  },

  getBySlug: async (slug) => {
    try {
      return await apiCall(`/projects/${slug}`);
    } catch (error) {
      console.warn(`Failed to fetch project: ${slug}`);
      return null;
    }
  },

  create: (data) =>
    apiCall('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiCall(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiCall(`/projects/${id}`, {
      method: 'DELETE',
    }),

  toggleFeatured: (id) =>
    apiCall(`/projects/${id}/featured`, {
      method: 'PATCH',
    }),
};

// Subscriber API
export const subscriberAPI = {
  subscribe: async (email, name = '') => {
    try {
      return await apiCall('/subscribers', {
        method: 'POST',
        body: JSON.stringify({ email, name }),
      });
    } catch (error) {
      console.error('Failed to subscribe:', error);
      throw error;
    }
  },

  getAll: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      return await apiCall(`/subscribers${queryString ? `?${queryString}` : ''}`);
    } catch (error) {
      console.warn('Failed to fetch subscribers');
      return { subscribers: [], total: 0, activeCount: 0, unsubscribedCount: 0 };
    }
  },

  delete: async (id) => {
    try {
      return await apiCall(`/subscribers/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Failed to delete subscriber:', error);
      throw error;
    }
  },

  getStats: async () => {
    try {
      return await apiCall('/subscribers/stats');
    } catch (error) {
      console.warn('Failed to fetch subscriber stats');
      return { total: 0, active: 0, unsubscribed: 0, today: 0 };
    }
  },
};

// Review API
export const reviewAPI = {
  getAll: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      return await apiCall(`/reviews${queryString ? `?${queryString}` : ''}`);
    } catch (error) {
      return { reviews: [], total: 0, averageRating: 0 };
    }
  },

  getAllAdmin: async () => {
    try {
      return await apiCall('/reviews/all');
    } catch (error) {
      return { reviews: [], total: 0 };
    }
  },

  getStats: async () => {
    try {
      return await apiCall('/reviews/stats');
    } catch (error) {
      return { total: 0, averageRating: 0, ratingDistribution: [] };
    }
  },

  create: async (data) => {
    try {
      return await apiCall('/reviews', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      throw error;
    }
  },

  approve: async (id) => {
    try {
      return await apiCall(`/reviews/${id}/approve`, { method: 'PATCH' });
    } catch (error) {
      throw error;
    }
  },

  feature: async (id) => {
    try {
      return await apiCall(`/reviews/${id}/feature`, { method: 'PATCH' });
    } catch (error) {
      throw error;
    }
  },

  respond: async (id, text) => {
    try {
      return await apiCall(`/reviews/${id}/respond`, {
        method: 'POST',
        body: JSON.stringify({ text }),
      });
    } catch (error) {
      throw error;
    }
  },

  markHelpful: async (id) => {
    try {
      return await apiCall(`/reviews/${id}/helpful`, { method: 'PATCH' });
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      return await apiCall(`/reviews/${id}`, { method: 'DELETE' });
    } catch (error) {
      throw error;
    }
  },
};