'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function MyTendersPage() {
  const [tenders, setTenders] = useState<any[]>([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const router = useRouter();

  useEffect(() => {
    async function fetchMyTenders() {
      try {
        const companyRes = await axios.get('http://localhost:5000/company', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const companyId = companyRes.data.id;

        const res = await axios.get(
          `http://localhost:5000/tenders/company/${companyId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTenders(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchMyTenders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Posted Tenders</h1>
      {tenders.length > 0 ? (
        tenders.map((tender) => (
          <div
            key={tender.id}
            className="p-4 mb-3 border rounded cursor-pointer hover:bg-gray-100 transition"
            onClick={() => router.push(`/application/${tender.id}`)}
          >
            <h3 className="font-bold text-lg">{tender.title}</h3>
            <p>{tender.description}</p>
            <p><strong>Budget:</strong> ₹{tender.budget}</p>
            <p><strong>Deadline:</strong> {new Date(tender.deadline).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p>No tenders posted yet.</p>
      )}
    </div>
  );
}
