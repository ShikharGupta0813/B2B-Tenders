'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/apply/${params.tenderId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setApplications(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchApplications();
  }, [params.tenderId]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
        Applications for Tender
      </h1>

      <section className="bg-white rounded-xl shadow-md p-6">
        {applications.length > 0 ? (
          <div className="space-y-5">
            {applications.map((app) => (
              <div key={app.id} className="border border-gray-200 rounded-lg p-5 bg-gray-50 shadow-sm">
                <p className="text-gray-800 mb-2">
                  <strong>Company:</strong> {app.applicant_company}
                </p>
                <p className="text-gray-800 mb-2">
                  <strong>Industry:</strong> {app.industry}
                </p>
                <p className="text-gray-800 mb-2">
                  <strong>Proposal:</strong> {app.proposal_text}
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Submitted At:</strong>{' '}
                  {new Date(app.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No applications submitted yet.
          </p>
        )}
      </section>

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => router.back()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
}
