import api from './api';

export const authService = {
  // Authentication
  async login(email, password) {
    const res = await api.post('/auth/login', { email, password });
    return res.data;
  },

  async getMe() {
    const res = await api.get('/auth/me');
    return res.data;
  },

  async logout() {
    const res = await api.post('/auth/logout');
    return res.data;
  },

  // Dashboard Stats
  async getDashboardStats() {
    const res = await api.get('/dashboard/stats');
    return res.data;
  },

  // Stories CRUD
  async getStories(params = {}) {
    const res = await api.get('/stories', { params });
    return res.data;
  },
  async getStoryById(id) {
    const res = await api.get(`/stories/${id}`);
    return res.data;
  },
  async createStory(data) {
    const res = await api.post('/stories', data);
    return res.data;
  },
  async updateStory(id, data) {
    const res = await api.put(`/stories/${id}`, data);
    return res.data;
  },
  async deleteStory(id) {
    const res = await api.delete(`/stories/${id}`);
    return res.data;
  },

  // Blogs CRUD
  async getBlogs(params = {}) {
    const res = await api.get('/blogs', { params });
    return res.data;
  },
  async getBlogById(id) {
    const res = await api.get(`/blogs/${id}`);
    return res.data;
  },
  async createBlog(data) {
    const res = await api.post('/blogs', data);
    return res.data;
  },
  async updateBlog(id, data) {
    const res = await api.put(`/blogs/${id}`, data);
    return res.data;
  },
  async deleteBlog(id) {
    const res = await api.delete(`/blogs/${id}`);
    return res.data;
  },

  // Newspaper CRUD
  async getNewspaper(params = {}) {
    const res = await api.get('/newspaper', { params });
    return res.data;
  },
  async getNewspaperById(id) {
    const res = await api.get(`/newspaper/${id}`);
    return res.data;
  },
  async createNewspaper(data) {
    const res = await api.post('/newspaper', data);
    return res.data;
  },
  async updateNewspaper(id, data) {
    const res = await api.put(`/newspaper/${id}`, data);
    return res.data;
  },
  async deleteNewspaper(id) {
    const res = await api.delete(`/newspaper/${id}`);
    return res.data;
  },

  // Gallery CRUD
  async getGallery(params = {}) {
    const res = await api.get('/gallery', { params });
    return res.data;
  },
  async getGalleryById(id) {
    const res = await api.get(`/gallery/${id}`);
    return res.data;
  },
  async createGallery(data) {
    const res = await api.post('/gallery', data);
    return res.data;
  },
  async updateGallery(id, data) {
    const res = await api.put(`/gallery/${id}`, data);
    return res.data;
  },
  async deleteGallery(id) {
    const res = await api.delete(`/gallery/${id}`);
    return res.data;
  },
};

export default authService;
