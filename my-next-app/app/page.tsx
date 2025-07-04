"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <div className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h1 className="text-2xl font-bold"></h1>
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/login")}
            className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/register")}
            className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Register
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          B2B TENDER PLATFORM
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
          Find, Apply & Win Verified Tenders Quickly and Grow Your Business.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          Explore Dashboard
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">🔍 Easy Tender Discovery</h3>
            <p className="text-gray-700">
              Find relevant tenders quickly using smart filters and categories.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">💼 Simple Company Setup</h3>
            <p className="text-gray-700">
              Create your company profile in minutes to start applying.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">📝 Quick Proposal Submission</h3>
            <p className="text-gray-700">
              Submit proposals with ease and track your application status.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {[
            "Create Company Profile",
            "Browse Available Tenders",
            "Submit Proposals",
            "Win New Projects",
          ].map((step, index) => (
            <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-4">{index + 1}</div>
              <p className="text-gray-700">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-8 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Testimonials
        </h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <div className="bg-white rounded-xl shadow-md p-6 max-w-sm mx-auto">
            <p className="text-gray-700 italic">
              “This platform helped us secure 3 major tenders in just 2 months!”
            </p>
            <p className="mt-4 font-semibold text-blue-600">— ABC Enterprises</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 max-w-sm mx-auto">
            <p className="text-gray-700 italic">
              “Very easy to use and saved us a lot of time during bidding.”
            </p>
            <p className="mt-4 font-semibold text-blue-600">— XYZ Solutions</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; 2025 B2B Tender Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
