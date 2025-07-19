import axios from 'axios';

// Dynamic baseURL: import.meta.env.VITE_API_URL se lo - dev mein localhost, prod mein Render URL.
// Fallback local ke liye. Prod mein VITE_API_URL set karo backend base (e.g., https://mern-todo-5u7n.onrender.com).
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000' });  // Note: /api remove kia, kyuki exports mein add kar diya.

// Interceptor: Har request mein token add (agar hai) - auth ke liye.
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

// Export functions: Path mein /api add kia taaki full URL sahi bane (backend ke hisaab se).
// Kuo? Path mismatch avoid - ab baseURL bina /api ke bhi work karega.
export const signup = (data) => API.post('/api/auth/signup', data);
export const login = (data) => API.post('/api/auth/login', data);
export const getTodos = () => API.get('/api/todos');
export const createTodo = (data) => API.post('/api/todos', data);
export const updateTodo = (id, data) => API.put(`/api/todos/${id}`, data);
export const deleteTodo = (id) => API.delete(`/api/todos/${id}`);