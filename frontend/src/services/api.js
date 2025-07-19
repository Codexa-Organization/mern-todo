import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export const signup = (data) => API.post('/api/auth/signup', data);  // /api add kia path mein.
export const login = (data) => API.post('/api/auth/login', data);  // Yeh full path sahi banayega.
export const getTodos = () => API.get('/api/todos');
export const createTodo = (data) => API.post('/api/todos', data);
export const updateTodo = (id, data) => API.put(`/api/todos/${id}`, data);
export const deleteTodo = (id) => API.delete(`/api/todos/${id}`);