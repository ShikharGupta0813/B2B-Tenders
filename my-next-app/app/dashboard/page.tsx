'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function DashboardPage() {
  const router = useRouter();
  const [company, setCompany] = useState<any>(null);
  const [tenders, setTenders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else {
      fetchData();
    }
  }, []);

  async function fetchData() {
    try {
      const companyRes = await axios.get('http://localhost:5000/company', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompany(companyRes.data);

      const tenderRes = await axios.get('http://localhost:5000/tenders');
      setTenders(tenderRes.data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }


  if (loading) return <p className="p-6">Loading...</p>;

  return (

    <div className="p-6">
        <button
  onClick={() => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }}
  className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
>
  Logout
</button>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Company Profile Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Company</h2>
        {company ? (
          <div className="p-4 border rounded">
            <p><strong>Name:</strong> {company.name}</p>
            <p><strong>Industry:</strong> {company.industry}</p>
            <p><strong>Description:</strong> {company.description}</p>
            {company.image_url && (
              <img src={company.image_url} alt="Logo" className="h-20 mt-2 rounded" />
            )}
          </div>
        ) : (
          <div className="text-red-600">
            No company profile found.{' '}
            <a href="/profile" className="underline text-blue-600">Create one</a>
          </div>
        )}
      </div>

      {/* Tender List Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">All Tenders</h2>
        {tenders.length > 0 ? (
          tenders.map((tender) => (
            <div key={tender.id} className="p-4 mb-3 border rounded">
              <h3 className="font-bold text-lg">{tender.title}</h3>
              <p>{tender.description}</p>
              <p><strong>Budget:</strong> ₹{tender.budget}</p>
              <p><strong>Deadline:</strong> {new Date(tender.deadline).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No tenders available.</p>
        )}
      </div>
    </div>
  );
}
