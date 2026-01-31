// API Configuration and Services
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Helper function to get auth token
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  return user?.token || localStorage.getItem('access_token');
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
    throw new Error(error.detail || error.message || 'Request failed');
  }
  return response.json();
};

// ==================== AUTHENTICATION API ====================

export const authAPI = {
  // Login
  login: async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/api/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    return handleResponse(response);
  },

  // Refresh Token
  refreshToken: async (refreshToken) => {
    const response = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });
    return handleResponse(response);
  },

  // Register/Signup
  signup: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/accounts/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  // Get User Profile
  getProfile: async () => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/v1/accounts/profile/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },
};

// ==================== MENU API ====================

export const menuAPI = {
  // Get all menu items
  getMenuItems: async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/menu/items/`);
    return handleResponse(response);
  },

  // Get single menu item
  getMenuItem: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/menu/items/${id}/`);
    return handleResponse(response);
  },

  // Create menu item (Vendor only)
  createMenuItem: async (itemData) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/v1/menu/items/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    });
    return handleResponse(response);
  },

  // Upload menu item with image (Vendor only)
  uploadMenuItem: async (formData) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/v1/menu/items/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        // Don't set Content-Type for FormData - browser will set it with boundary
      },
      body: formData,
    });
    return handleResponse(response);
  },

  // Update menu item
  updateMenuItem: async (id, itemData) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/v1/menu/items/${id}/`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    });
    return handleResponse(response);
  },

  // Delete menu item
  deleteMenuItem: async (id) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/v1/menu/items/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (response.status === 204) return { success: true };
    return handleResponse(response);
  },
};

// ==================== ORDER API ====================

export const orderAPI = {
  // Get all orders (for current user)
  getOrders: async () => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/v1/orders/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  // Get single order
  getOrder: async (id) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/v1/orders/${id}/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  // Create new order
  createOrder: async (orderData) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/v1/orders/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    return handleResponse(response);
  },

  // Update order status
  updateOrderStatus: async (id, status) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/v1/orders/${id}/status/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    return handleResponse(response);
  },

  // Cancel order
  cancelOrder: async (id) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/v1/orders/${id}/cancel/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },
};

// ==================== VENDOR API ====================

export const vendorAPI = {
  // Get vendor dashboard data
  getDashboard: async () => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/v1/accounts/vendor/dashboard/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  // Get vendor's menu items
  getMyMenuItems: async () => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/v1/menu/my-items/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  // Get vendor's orders
  getMyOrders: async () => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/v1/orders/vendor/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },
};

export default {
  authAPI,
  menuAPI,
  orderAPI,
  vendorAPI,
};
