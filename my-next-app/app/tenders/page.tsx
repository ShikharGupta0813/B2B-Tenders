'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function TendersPage() {
  const router = useRouter();
  const [tenders, setTenders] = useState<any[]>([]);
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else {
      fetchTenders();
      fetchCompany();
    }
  }, []);

  async function fetchTenders() {
    try {
      const res = await axios.get('http://localhost:5000/tenders');
      setTenders(res.data);
    } catch (err) {
      console.error('Failed to load tenders:', err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCompany() {
    try {
      const res = await axios.get('http://localhost:5000/company', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompanyId(res.data.id);
    } catch {
      setCompanyId(null);
    }
  }

  async function handleApply(tenderId: number) {
    try {
      const proposal = prompt('Enter your proposal:');
      if (!proposal) return;

      await axios.post(
        'http://localhost:5000/apply',
        {
          tender_id: tenderId,
          proposal_text: proposal,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert('Applied successfully!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Application failed');
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Tenders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : tenders.length === 0 ? (
        <p>No tenders available.</p>
      ) : (
        tenders.map((tender) => (
          <div key={tender.id} className="p-4 mb-4 border rounded shadow">
            <h2 className="text-lg font-semibold">{tender.title}</h2>
            <p>{tender.description}</p>
            <p>
              <strong>Budget:</strong> ₹{tender.budget}
            </p>
            <p>
              <strong>Deadline:</strong>{' '}
              {new Date(tender.deadline).toLocaleDateString()}
            </p>

            {/* Don't show Apply button if it's user's own tender */}
            {companyId && companyId !== tender.company_id && (
              <button
                onClick={() => handleApply(tender.id)}
                className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
              >
                Apply
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
