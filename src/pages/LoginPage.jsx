import React, { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [username, setUsername] = useState('mor_2314'); // Pre-filled for FakeStoreAPI
  const [password, setPassword] = useState('83r5^_');   // Pre-filled
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      toast.success('Login Successful!');
      navigate('/');
    } catch (err) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login to QuickMart</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username (mor_2314)"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (83r5^_)"
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
