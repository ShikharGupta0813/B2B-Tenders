'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchCompanies();
  }, []);

  async function fetchCompanies() {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/search`);
      setCompanies(res.data);
    } catch (err) {
      console.error('Failed to load companies:', err);
      alert('Failed to load companies');
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/search`, {
        params: { name, industry },
      });
      setCompanies(res.data);
    } catch (err) {
      console.error('Search failed:', err);
      alert('Search failed.');
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
        All Company Profiles
      </h1>

      {/* Search Section */}
      <form
        onSubmit={handleSearch}
        className="flex gap-2 items-center justify-center mb-8"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm shadow hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      <section className="bg-white rounded-xl shadow-md p-6">
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : companies.length > 0 ? (
          <div className="space-y-5">
            {companies.map((company) => (
              <div
                key={company.id}
                className="border border-gray-200 rounded-lg p-5 bg-gray-50 shadow-sm cursor-pointer hover:bg-gray-100 transition"
                onClick={() => router.push(`/companies/${company.id}`)}
              >
                <h3 className="font-bold text-lg text-gray-800">{company.name}</h3>
                <p className="text-gray-700 mt-2">
                  <strong>Industry:</strong> {company.industry}
                </p>
                <p className="text-gray-700 mt-2">{company.description}</p>
                {company.image_url && (
                  <img
                    src={company.image_url}
                    alt="Logo"
                    className="h-24 mt-2 rounded border"
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No companies found.</p>
        )}
      </section>

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
