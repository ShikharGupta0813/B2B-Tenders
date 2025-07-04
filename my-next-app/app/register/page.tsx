'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row w-full max-w-4xl">
        
        {/* Left Side Box */}
        <div className="bg-blue-600 text-white p-8 flex flex-col justify-center md:w-1/2">
          <h2 className="text-3xl font-extrabold mb-4">Join Our Platform</h2>
          <p className="text-lg mb-4">
            Explore tenders, connect with companies, and grow your business.
          </p>
          <img
            src="/b2b.png"
            alt="B2B Illustration"
            className="w-32 h-32 mx-auto"
          />
        </div>

        {/* Right Side Box (Register Form) */}
        <form
          onSubmit={handleRegister}
          className="p-8 md:w-1/2 space-y-5"
        >
          <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-4">
            Register
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
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-green-700 transition"
          >
            Register
          </button>

          <p className="text-sm text-center text-gray-600 mt-2">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 underline hover:text-blue-800">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
