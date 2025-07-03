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
  async function applyToTender(tenderId: string) {
    try {
      const proposalText = prompt('Enter your proposal text:');
      if (!proposalText) return;
  
      await axios.post(
        `http://localhost:5000/apply`,
        { tenderId,proposalText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Application submitted successfully!');
    }catch (error: any) {
      console.error('Failed to apply:', error);
      const message = error.response?.data?.message || 'Failed to apply. Please try again.';
      alert(message);
    }
    
  }
   
  if (loading) return <p className="p-6 text-center text-gray-600">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10 relative">
      <button
        onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }}
        className="absolute top-6 right-6 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
      >
        Logout
      </button>

      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
        Company Dashboard
      </h1>

      {/* Company Profile Section */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Your Company Profile
        </h2>
        {company ? (
          <div className="space-y-3">
            <p><strong>Name:</strong> {company.name}</p>
            <p><strong>Industry:</strong> {company.industry}</p>
            <p><strong>Description:</strong> {company.description}</p>
            {company.image_url && (
              <img src={company.image_url} alt="Logo" className="h-24 rounded-lg border" />
            )}
          </div>
        ) : (
          <div className="text-red-600">
            No company profile found.{' '}
            <a href="/profile" className="underline text-blue-600 hover:text-blue-800">
              Create one
            </a>
          </div>
        )}
      </section>
       {/* Add Navigation Buttons */}
<div className="flex flex-wrap gap-4 mb-8">
  <button
    onClick={() => router.push('/profile')}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
  >
    Edit Company Profile
  </button>
  <button
    onClick={() => router.push('/application')}
    className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
  >
    Create New Tender
  </button>
  <button
    onClick={() => router.push('/tenders/my')}
    className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition"
  >
    View Applications
  </button>
</div>

      {/* Tender List Section */}
      <section className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Available Tenders
        </h2>
        
        {tenders.length > 0 ? (
          <div className="space-y-5">
            {tenders.map((tender) => (
              <div key={tender.id} className="border border-gray-200 rounded-lg p-5 bg-gray-50 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800">{tender.title}</h3>
                <p className="text-gray-700 mt-2">{tender.description}</p>
                <p className="mt-2"><strong>Budget:</strong> ₹{tender.budget}</p>
                <p><strong>Deadline:</strong> {new Date(tender.deadline).toLocaleDateString()}</p>
                <button
  onClick={() => applyToTender(tender.id)}
  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
>
  Apply
</button>

              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No tenders available at the moment.</p>
        )}
      </section>
    </div>
  );
}
