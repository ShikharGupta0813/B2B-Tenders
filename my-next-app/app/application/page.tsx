'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function CreateTenderPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState('');
  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await axios.post(
        'http://localhost:5000/tenders',
        { title, description, budget, deadline },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Tender Created Successfully!');
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Fist create a company to create tenders');
      router.push('/dashboard');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md space-y-4 w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold mb-4">Create New Tender</h1>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full border p-2 rounded"
        ></textarea>
        <input
          type="number"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Submit Tender
        </button>
      </form>
    </div>
  );
}
