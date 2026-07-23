import axios from 'axios'

const api = axios.create({
  baseURL: "https://real-estate-project-production-da1c.up.railway.app/api" || 'http://localhost:5000/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('admin_token')
      window.location.href = '/admin/login'
    }
    return Promise.reject(err)
  }
)

export default api

// ─── Projects ────────────────────────────────────────────────────────
export const projectsApi = {
  getAll:       (params)       => api.get('/projects', { params }),
  getBySlug:    (slug)         => api.get(`/projects/${slug}`),
  getById:      (id)           => api.get(`/projects/admin/${id}`),
  getFeatured:  (limit = 6)    => api.get('/projects', { params: { featured: 'true', limit } }),
  create:       (data)         => api.post('/projects', data),
  update:       (id, data)     => api.put(`/projects/${id}`, data),
  delete:       (id)           => api.delete(`/projects/${id}`),
  addImage:     (id, data)     => api.post(`/projects/${id}/images`, data),
  deleteImage:  (id, imgId)    => api.delete(`/projects/${id}/images/${imgId}`),
  addPlan:      (id, data)     => api.post(`/projects/${id}/plans`, data),
  deletePlan:   (id, planId)   => api.delete(`/projects/${id}/plans/${planId}`),
}

// ─── Locations ───────────────────────────────────────────────────────
export const locationsApi = {
  getAll:    ()            => api.get('/locations'),
  getBySlug: (slug)        => api.get(`/locations/${slug}`),
  create:    (data)        => api.post('/locations', data),
  update:    (id, data)    => api.put(`/locations/${id}`, data),
  delete:    (id)          => api.delete(`/locations/${id}`),
}

// ─── News ─────────────────────────────────────────────────────────────
export const newsApi = {
  getAll:    (params) => api.get('/news', { params }),
  getBySlug: (slug)   => api.get(`/news/${slug}`),
  getById:   (id)     => api.get(`/news/admin/${id}`),
  create:    (data)   => api.post('/news', data),
  update:    (id, data) => api.put(`/news/${id}`, data),
  delete:    (id)     => api.delete(`/news/${id}`),
}

// ─── Events ──────────────────────────────────────────────────────────
export const eventsApi = {
  getAll:    (params) => api.get('/events', { params }),
  getBySlug: (slug)   => api.get(`/events/${slug}`),
  getById:   (id)     => api.get(`/events/admin/${id}`),
  create:    (data)   => api.post('/events', data),
  update:    (id, data) => api.put(`/events/${id}`, data),
  delete:    (id)     => api.delete(`/events/${id}`),
}

// ─── Careers ─────────────────────────────────────────────────────────
export const careersApi = {
  getAll:    ()            => api.get('/careers'),
  getById:   (id)          => api.get(`/careers/${id}`),
  create:    (data)        => api.post('/careers', data),
  update:    (id, data)    => api.put(`/careers/${id}`, data),
  delete:    (id)          => api.delete(`/careers/${id}`),
}

// ─── Enquiries ────────────────────────────────────────────────────────
export const enquiriesApi = {
  submit:       (data)          => api.post('/enquiries', data),
  getAll:       (params)        => api.get('/enquiries', { params }),
  updateStatus: (id, status)    => api.patch(`/enquiries/${id}/status`, { status }),
}

// ─── Auth ─────────────────────────────────────────────────────────────
export const authApi = {
  login:  (credentials) => api.post('/auth/login', credentials),
  logout: ()            => api.post('/auth/logout'),
  me:     ()            => api.get('/auth/me'),
}

// ─── Upload ──────────────────────────────────────────────────────────
export const uploadApi = {
  single: (formData, folder) =>
    api.post(`/upload${folder ? `?folder=${folder}` : ''}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  multiple: (formData, folder) =>
    api.post(`/upload/multiple${folder ? `?folder=${folder}` : ''}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
}

// ─── Dashboard ────────────────────────────────────────────────────────
export const dashboardApi = {
  getStats: () => api.get('/dashboard/stats'),
}
