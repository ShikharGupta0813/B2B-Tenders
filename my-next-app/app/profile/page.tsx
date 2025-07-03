'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ProfilePage() {
  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const [company, setCompany] = useState<any>(null);
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [description, setDescription] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else {
      fetchCompany();
    }
  }, []);

  async function fetchCompany() {
    try {
      const res = await axios.get('http://localhost:5000/company', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data;
      setCompany(data);
      setName(data.name);
      setIndustry(data.industry);
      setDescription(data.description);
      setImageUrl(data.image_url);
    } catch (err: any) {
      console.error('Failed to fetch company:', err);
      if (err.response && err.response.status === 404) {
        setCompany(null);
      } else {
        alert('Error fetching company profile.');
      }
    }
  }

  async function handleLogoUpload() {
    if (!logoFile) return null;
    const formData = new FormData();
    formData.append('logo', logoFile);
    const res = await axios.post('http://localhost:5000/upload/logo', formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.url;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    let finalImageUrl = imageUrl;
    if (logoFile) {
      finalImageUrl = await handleLogoUpload();
    }

    const payload = {
      name,
      industry,
      description,
      image_url: finalImageUrl,
    };

    try {
      if (company) {
        await axios.put('http://localhost:5000/company', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Company updated!');
      } else {
        await axios.post('http://localhost:5000/company', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Company created!');
      }
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to save profile');
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-xl">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Company Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Company Name</label>
            <input
              type="text"
              placeholder="Enter Company Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Industry</label>
            <input
              type="text"
              placeholder="Enter Industry"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              placeholder="Enter Description"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Upload Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
              className="w-full"
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Logo"
                className="h-24 mt-4 rounded border border-gray-300"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
          >
            {company ? 'Update Profile' : 'Create Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}
