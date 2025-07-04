'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function TendersPage() {
  const router = useRouter();
  const [tenders, setTenders] = useState<any[]>([]);
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTenderId, setActiveTenderId] = useState<number | null>(null);
  const [proposalText, setProposalText] = useState('');
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else {
      fetchData(page);
    }
  }, [page]);

  async function fetchData(pageNumber: number) {
    try {
      const companyRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/company`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompanyId(companyRes.data.id);

      const tenderRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tenders?page=${pageNumber}`);
      setTenders(tenderRes.data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }

  async function applyToTender(tenderId: number) {
    if (!proposalText) {
      toast.error('Proposal text cannot be empty.');
      return;
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/apply`,
        { tender_id: tenderId, proposal_text: proposalText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Successfully Applied');
      setActiveTenderId(null);
      setProposalText('');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to apply.');
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
        Available Tenders
      </h1>

      <section className="bg-white rounded-xl shadow-md p-6">
        {loading ? (
          <p className="text-gray-600 text-center">Loading tenders...</p>
        ) : tenders.length > 0 ? (
          <div className="space-y-5">
            {tenders.map((tender) => (
              <div
                key={tender.id}
                className="border border-gray-200 rounded-lg p-5 bg-gray-50 shadow-sm"
              >
                <h3 className="text-lg font-bold text-gray-800">{tender.title}</h3>
                <p className="text-gray-700 mt-2">{tender.description}</p>
                <p className="mt-2">
                  <strong>Budget:</strong> ₹{tender.budget}
                </p>
                <p>
                  <strong>Deadline:</strong>{' '}
                  {new Date(tender.deadline).toLocaleDateString()}
                </p>

                {companyId && companyId === tender.company_id ? null : (
                  <>
                    {activeTenderId === tender.id ? (
                      <div className="mt-4 space-y-3">
                        <textarea
                          placeholder="Enter your proposal here..."
                          value={proposalText}
                          onChange={(e) => setProposalText(e.target.value)}
                          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => applyToTender(tender.id)}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                          >
                            Submit Proposal
                          </button>
                          <button
                            onClick={() => {
                              setActiveTenderId(null);
                              setProposalText('');
                            }}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setActiveTenderId(tender.id);
                          setProposalText('');
                        }}
                        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                      >
                        Apply
                      </button>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No tenders available at the moment.</p>
        )}
      </section>

      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700 font-medium">Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
