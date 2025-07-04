'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SearchPage() {
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/search`, {
        params: {
          name,
          industry,
        },
      });
      setResults(res.data);
    } catch (err) {
      console.error('Search failed', err);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Search Companies</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6 flex flex-col gap-3">
        <input
          type="text"
          placeholder="Search by name"
          className="p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by industry"
          className="p-2 border rounded"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Results */}
      {loading && <p>Searching...</p>}
      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((company) => (
            <div key={company.id} className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{company.name}</h2>
              <p className="text-sm text-gray-600">{company.industry}</p>
              <p className="mt-1">{company.description}</p>
              {company.image_url && (
                <img
                  src={company.image_url}
                  alt="logo"
                  className="h-16 mt-2 rounded"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {!loading && results.length === 0 && (
        <p className="text-gray-600">No results found.</p>
      )}
    </div>
  );
}
