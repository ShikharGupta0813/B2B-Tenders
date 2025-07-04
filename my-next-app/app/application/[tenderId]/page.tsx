'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const params = useParams();

  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await axios.get(
          `http://localhost:5000/apply/${params.tenderId}`,
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Applications for Tender</h1>
      {applications.length > 0 ? (
        applications.map((app) => (
          <div key={app.id} className="p-4 mb-3 border rounded">
            <p><strong>Company:</strong> {app.applicant_company}</p>
            <p><strong>Industry:</strong> {app.industry}</p>
            <p><strong>Proposal:</strong> {app.proposal_text}</p>
            <p><strong>Submitted At:</strong> {new Date(app.created_at).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No applications submitted yet.</p>
      )}
    </div>
  );
}
