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
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
        My Posted Tenders
      </h1>

      <section className="bg-white rounded-xl shadow-md p-6">
        {tenders.length > 0 ? (
          <div className="space-y-5">
            {tenders.map((tender) => (
              <div
                key={tender.id}
                className="border border-gray-200 rounded-lg p-5 bg-gray-50 shadow-sm cursor-pointer hover:bg-gray-100 transition"
                onClick={() => router.push(`/application/${tender.id}`)}
              >
                <h3 className="font-bold text-lg text-gray-800">{tender.title}</h3>
                <p className="text-gray-700 mt-2">{tender.description}</p>
                <p className="mt-2 text-gray-800">
                  <strong>Budget:</strong> ₹{tender.budget}
                </p>
                <p className="text-gray-800">
                  <strong>Deadline:</strong> {new Date(tender.deadline).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No tenders posted yet.</p>
        )}
      </section>
    </div>
  );
}
