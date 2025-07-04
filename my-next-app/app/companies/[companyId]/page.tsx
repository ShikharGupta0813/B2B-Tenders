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
          <div className="flex flex-col md:flex-row md:gap-10 justify-between items-start md:items-start">
      <div className="flex-1 md:max-w-6xl space-y-4">
              <p><strong>Name:</strong> {company.name}</p>
              <p><strong>Industry:</strong> {company.industry}</p>
              <p><strong>Description:</strong> {company.description}</p>
              {company.website_url && (
                <p><strong>Website:</strong>{' '}
                  <a href={company.website_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    {company.website_url}
                  </a>
                </p>
              )}
              <p><strong>Email:</strong> {company.contact_email}</p>
              <p><strong>Phone:</strong> {company.phone_number}</p>
              {company.services && (
                <div>
                  <strong>Services:</strong>
                  <ul className="list-disc list-inside text-gray-700">
                    {company.services.split(',').map((s: string, idx: number) => (
                      <li key={idx}>{s.trim()}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {company.image_url && (
              <div className="ml-4 md:ml-0 md:mt-6 md:mr-14 flex-shrink-0">
                <img
                  src={company.image_url}
                  alt="Logo"
                  className="h-full max-h-40 w-auto object-contain rounded-lg border shadow-md"
                />
              </div>
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
                <p className="mt-2"><strong>Budget:</strong> ₹{tender.budget}</p>
                <p><strong>Deadline:</strong> {new Date(tender.deadline).toLocaleDateString()}</p>

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
