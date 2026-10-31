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

  // Case Studies Management (Two Creation Modes: Manual Fill & Quick Create)
  async getCaseStudies(params = {}) {
    const res = await api.get('/case-studies', { params });
    return res.data;
  },
  async getCaseStudyById(id) {
    const res = await api.get(`/case-studies/${id}`);
    return res.data;
  },
  async createCaseStudy(data) {
    const res = await api.post('/case-studies', data);
    return res.data;
  },
  async updateCaseStudy(id, data) {
    const res = await api.put(`/case-studies/${id}`, data);
    return res.data;
  },
  async publishCaseStudy(id) {
    const res = await api.patch(`/case-studies/${id}/publish`);
    return res.data;
  },
  async unpublishCaseStudy(id) {
    const res = await api.patch(`/case-studies/${id}/unpublish`);
    return res.data;
  },
  async duplicateCaseStudy(id) {
    const res = await api.post(`/case-studies/${id}/duplicate`);
    return res.data;
  },
  async deleteCaseStudy(id) {
    const res = await api.delete(`/case-studies/${id}`);
    return res.data;
  },
  async uploadCaseStudyImage(file, onProgress) {
    const formData = new FormData();
    formData.append('image', file);
    const res = await api.post('/case-studies/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percent);
        }
      },
    });
    return res.data;
  },

  // Public Case Studies
  async getPublicCaseStudies() {
    const res = await api.get('/case-studies/public');
    return res.data;
  },
  async getPublicCaseStudy(slug) {
    const res = await api.get(`/case-studies/public/${slug}`);
    return res.data;
  },
};

export default authService;

