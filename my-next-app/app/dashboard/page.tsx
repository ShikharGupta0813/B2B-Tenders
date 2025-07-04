"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const router = useRouter();
  const [company, setCompany] = useState<any>(null);
  const [tenders, setTenders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      fetchData();
    }
  }, []);

  async function fetchData() {
    try {
      const companyRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/company`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompany(companyRes.data);

      const companyId = companyRes.data.id;

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tenders/company/${companyId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTenders(res.data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }

  // ✅ Delete tender function
  async function handleDelete(tenderId: number) {
    if (!confirm("Are you sure you want to delete this tender?")) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tenders/${tenderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Tender deleted successfully");
      setTenders(tenders.filter((tender) => tender.id !== tenderId));
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete tender");
    }
  }

  if (loading) return <p className="p-6 text-center text-gray-600">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10 relative">
      {/* Logout Button */}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
        className="absolute top-6 right-6 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
      >
        Logout
      </button>

      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
        Company Dashboard
      </h1>

      {/* Company Profile Section */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-10">
      <div className="flex flex-col md:flex-row md:gap-10 justify-between items-start md:items-start">
      <div className="flex-1 md:max-w-6xl space-y-4">

            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Your Company Profile
            </h2>
            {company ? (
              <div className="space-y-3">
                <p><strong>Name:</strong> {company.name}</p>
                <p><strong>Industry:</strong> {company.industry}</p>
                <p><strong>Description:</strong> {company.description}</p>
                {company.website_url && (
                  <p>
                    <strong>Website:</strong>{" "}
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
                      {company.services.split(",").map((s: string, i: number) => (
                        <li key={i}>{s.trim()}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-red-600">
                No company profile found.{" "}
                <a href="/profile" className="underline text-blue-600 hover:text-blue-800">Create one</a>
              </div>
            )}
          </div>

          {company?.image_url && (
  <div className="ml-4 md:ml-0 md:mt-5 md:mr-14 flex-shrink-0 ">
    <img
      src={company.image_url}
      alt="Logo"
      className="h-full max-h-40 w-auto object-contain rounded-lg border shadow-md"
    />
  </div>
)}
        </div>
      </section>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap md:flex-nowrap  mb-8 gap-4">
        <button onClick={() => router.push("/profile")} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
          Edit Company Profile
        </button>
        <button onClick={() => router.push("/application")} className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition">
          Create New Tender
        </button>
        <button onClick={() => router.push("/companies")} className="bg-yellow-600 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-700 transition">
          View All Companies
        </button>
        <button onClick={() => router.push("/tenders")} className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition">
          Browse All Tenders
        </button>
      </div>

      {/* My Posted Tenders Section */}
      <section className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          My Posted Tenders
        </h2>

        {tenders.length > 0 ? (
          <div className="space-y-5">
            {tenders.map((tender) => (
              <div key={tender.id} className="border border-gray-200 rounded-lg p-5 bg-gray-50 shadow-sm">
                <h3 className="font-bold text-lg text-gray-800 cursor-pointer hover:underline"
                  onClick={() => router.push(`/application/${tender.id}`)}>
                  {tender.title}
                </h3>
                <p className="text-gray-700 mt-2">{tender.description}</p>
                <p className="mt-2 text-gray-800">
                  <strong>Budget:</strong> ₹{tender.budget}
                </p>
                <p className="text-gray-800">
                  <strong>Deadline:</strong> {new Date(tender.deadline).toLocaleDateString()}
                </p>
                <div className="mt-4 flex gap-3">
                  <button onClick={() => handleDelete(tender.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
                    Delete
                  </button>
                  <button onClick={() => router.push(`/application/${tender.id}`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    View Applications
                  </button>
                </div>
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
