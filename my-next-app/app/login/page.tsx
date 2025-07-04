'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row w-full max-w-4xl">
        
        {/* Left Side */}
        <div className="bg-blue-600 text-white p-8 flex flex-col justify-center md:w-1/2">
          <h2 className="text-3xl font-extrabold mb-4">Welcome Back!</h2>
          <p className="text-lg mb-4">
            Access tenders, manage proposals, and grow your network.
          </p>
          <img
            src="/b2b.png"
            alt="B2B Illustration"
            className="w-32 h-32 mx-auto"
          />
        </div>

        {/* Right Side (Login Form) */}
        <form
          onSubmit={handleLogin}
          className="p-8 md:w-1/2 space-y-5"
        >
          <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-4">
            Login
          </h1>

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-600 mt-2">
            Don&apos;t have an account?{' '}
            <a href="/register" className="text-blue-600 underline hover:text-blue-800">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
