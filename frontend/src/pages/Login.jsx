import React, { useState } from 'react';
import { signup as signupApi, login as loginApi } from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);


  

  const handleSubmit = async (e) => {
    e.preventDefault();
     console.log('Login attempt with URL:', import.meta.env.VITE_API_URL + '/api/auth/login');  // Debug: Print URL.
    try {
      const { data } = isSignup ? await signupApi({ email, password }) : await loginApi({ email, password });
      localStorage.setItem('token', data.token);
      window.location.href = '/todos';
    } catch (error) {
      console.error(error);
      alert('Error: ' + (error.response?.data?.message || 'Something went wrong'));
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl mb-4">{isSignup ? 'Signup' : 'Login'}</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="block w-full mb-2 p-2 border" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="block w-full mb-2 p-2 border" required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">{isSignup ? 'Signup' : 'Login'}</button>
        <p className="mt-2 text-center">
          {isSignup ? 'Already have an account?' : 'No account?'} <span onClick={() => setIsSignup(!isSignup)} className="text-blue-500 cursor-pointer">Switch</span>
        </p>
      </form>
    </div>
  );
};

export default Login;