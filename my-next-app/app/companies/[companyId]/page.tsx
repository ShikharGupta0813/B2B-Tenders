'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CompanyDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { companyId } = params;

  const [company, setCompany] = useState<any>(null);
  const [tenders, setTenders] = useState<any[]>([]);
  const [myCompanyId, setMyCompanyId] = useState<number | null>(null);
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
      const companyRes = await axios.get(`http://localhost:5000/company/${companyId}`);
      setCompany(companyRes.data);

      const tenderRes = await axios.get(`http://localhost:5000/tenders/company/${companyId}`);
      setTenders(tenderRes.data);

      const myCompanyRes = await axios.get('http://localhost:5000/company', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyCompanyId(myCompanyRes.data.id);
    } catch (err) {
      console.error('Error fetching company details:', err);
      toast.error('Failed to load company');
    }
  }

  async function applyToTender(tenderId: number) {
    const proposal = prompt('Enter your proposal:');
    if (!proposal) return;

    try {
      await axios.post(
        'http://localhost:5000/apply',
        { tender_id: tenderId, proposal_text: proposal },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Applied successfully!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Application failed');
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
        Company Profile
      </h1>

      {/* Company Profile */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-10">
        {company ? (
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-1 space-y-3">
              <p><strong>Name:</strong> {company.name}</p>
              <p><strong>Industry:</strong> {company.industry}</p>
              <p><strong>Description:</strong> {company.description}</p>
            </div>
            {company.image_url && (
              <img
                src={company.image_url}
                alt="Logo"
                className="h-32 rounded-lg border shadow-md"
              />
            )}
          </div>
        ) : (
          <p>Company not found.</p>
        )}
      </section>

      {/* Tenders Section */}
      <section className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Tenders by this Company
        </h2>
        {tenders.length > 0 ? (
          <div className="space-y-5">
            {tenders.map((tender) => (
              <div key={tender.id} className="border rounded-lg p-5 bg-gray-50 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800">{tender.title}</h3>
                <p className="text-gray-700 mt-2">{tender.description}</p>
                <p className="mt-2">
                  <strong>Budget:</strong> ₹{tender.budget}
                </p>
                <p>
                  <strong>Deadline:</strong> {new Date(tender.deadline).toLocaleDateString()}
                </p>

                {/* Show Apply button if it's not my company */}
                {myCompanyId && myCompanyId !== tender.company_id && (
                  <button
                    onClick={() => applyToTender(tender.id)}
                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Apply
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No tenders available.</p>
        )}
      </section>

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => router.push('/companies')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Back to Companies
        </button>
      </div>
    </div>
  );
}
