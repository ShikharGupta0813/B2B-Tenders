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
    } catch(err:any) {
      console.error('Failed to fetch company:', err);
    if (err.response && err.response.status === 404) {
      setCompany(null);  // No profile yet
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
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Company Profile</h1>
       
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Company Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Industry"
          className="w-full p-2 border rounded"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
          className="w-full"
        />
        {imageUrl && (
          <img src={imageUrl} alt="Logo" className="h-20 mt-2 rounded" />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {company ? 'Update Profile' : 'Create Profile'}
        </button>
      </form>
    </div>
  );
}
