import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
console.log('Base URL set to:', baseURL);  // NEW: Debug log - console mein dekh lo kia URL use ho raha hai.

const API = axios.create({ baseURL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  console.log('Request URL:', req.url);  // NEW: Har request ka full URL log - yeh bataayega kya ban raha hai.
  return req;
});

export const signup = (data) => API.post('/api/auth/signup', data);  // /api add kia path mein taaki full sahi bane.
export const login = (data) => API.post('/api/auth/login', data);
export const getTodos = () => API.get('/api/todos');
export const createTodo = (data) => API.post('/api/todos', data);
export const updateTodo = (id, data) => API.put(`/api/todos/${id}`, data);
export const deleteTodo = (id) => API.delete(`/api/todos/${id}`);