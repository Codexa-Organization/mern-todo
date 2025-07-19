import axios from 'axios';

// Dynamic baseURL: process.env.VITE_API_URL se lo - dev mein localhost, prod mein Render URL.
// Kuo? Environment ke hisaab se change - hardcode avoid. Kisliye? Deployment easy. Best practice: Fallback do (||) agar var nahi set.
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });

// Interceptor: Har request mein token add (agar hai) - auth ke liye.
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

// Export functions: Yeh API calls karte hain.
export const signup = (data) => API.post('/auth/signup', data);
export const login = (data) => API.post('/auth/login', data);
export const getTodos = () => API.get('/todos');
export const createTodo = (data) => API.post('/todos', data);
export const updateTodo = (id, data) => API.put(`/todos/${id}`, data);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);