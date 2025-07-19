import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/api';
import { PencilIcon, TrashIcon, CheckIcon } from '@heroicons/react/24/solid';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PuffLoader from 'react-spinners/PuffLoader';  // NEW: Import PuffLoader from react-spinners.

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);  // NEW: Loading state - shuru mein true (loading on).

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);  // NEW: Loading start before fetch.
      try {
        const { data } = await getTodos();
        setTodos(data);
        toast.success('Todos loaded successfully!');
      } catch (error) {
        console.error(error);
        if (error.response?.status === 401) window.location.href = '/';
        toast.error('Error loading todos. Please try again.');
      } finally {
        setLoading(false);  // NEW: Loading end after fetch (success ya error).
      }
    };
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const { data } = await updateTodo(editingId, { text });
        setTodos(todos.map((todo) => (todo._id === editingId ? data : todo)));
        setEditingId(null);
        toast.success('Todo updated successfully!');
      } else {
        const { data } = await createTodo({ text });
        setTodos([...todos, data]);
        toast.success('Todo added successfully!');
      }
      setText('');
    } catch (error) {
      console.error(error);
      toast.error('Error saving todo. Please try again.');
    }
  };

  const handleEdit = (todo) => {
    setText(todo.text);
    setEditingId(todo._id);
    toast.info('Editing todo...');
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
      toast.success('Todo deleted successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Error deleting todo.');
    }
  };

  const handleToggle = async (todo) => {
    try {
      const { data } = await updateTodo(todo._id, { completed: !todo.completed });
      setTodos(todos.map((t) => (t._id === todo._id ? data : t)));
      toast.success(todo.completed ? 'Todo marked as incomplete!' : 'Todo marked as complete!');
    } catch (error) {
      console.error(error);
      toast.error('Error toggling todo.');
    }
  };

  return (
    <>
    <ToastContainer position="bottom-right" autoClose={3000} theme="light" />
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl mb-4">Todo List</h2>
      {loading ? (  // NEW: If loading true, show loader spinner.
        <div className="flex justify-center items-center">
          <PuffLoader color="#00BFFF" size={100} loading={loading} />  // NEW: PuffLoader - blue color, size 100.
        </div>
      ) : (  // Else, show form and list.
        <>
          <form onSubmit={handleSubmit} className="mb-4">
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a todo" className="w-full p-2 border mb-2" required />
            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">{editingId ? 'Update' : 'Add'}</button>
          </form>
          <ul>
            {todos.map((todo) => (
              <li key={todo._id} className={`flex justify-between items-center p-2 border-b ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                <span onClick={() => handleToggle(todo)} className="cursor-pointer flex items-center">
                  {todo.text}
                  {todo.completed && <CheckIcon className="size-5 text-green-500 ml-2" />}
                </span>
                <div>
                  <PencilIcon onClick={() => handleEdit(todo)} className="w-5 h-5 text-blue-500 cursor-pointer inline mr-2" />
                  <TrashIcon onClick={() => handleDelete(todo._id)} className="w-5 h-5 text-red-500 cursor-pointer inline" />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      <button onClick={() => { 
        localStorage.removeItem('token'); 
        window.location.href = '/'; 
        toast.info('Logged out successfully!');
      }} className="mt-4 text-red-500">Logout</button>
    </div>
    </>
  );
};

export default Todos;