"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-8 py-6 border-b">
        <h1 className="text-xl font-semibold">TenderFlow</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/login")}
            className="text-sm px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Log In
          </button>
          <button
            onClick={() => router.push("/register")}
            className="bg-indigo-700 text-white text-sm px-4 py-2 rounded-md hover:bg-indigo-800 transition"
          >
            Register
          </button>
        </div>
      </header>

      {/* Main Section */}
      <section className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white px-8 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Win More Projects with High-Converting Tender Submissions
            </h2>
            <p className="text-lg mb-8">
              Discover, apply, and win tenders faster. Build better proposals
              and grow your business seamlessly with TenderFlow.
            </p>
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-white text-indigo-900 font-medium px-6 py-3 rounded-md shadow hover:bg-gray-100 transition"
            >
              Start Now — It’s Free
            </button>
          </div>
          <div>
            <img
              src="/tender.jpg" 
              alt="Platform preview"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-16">Key Features</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Efficient Tender Discovery",
              description:
                "Quickly find relevant tenders with advanced search and smart filters.",
            },
            {
              title: "Simple Company Profile Setup",
              description:
                "Set up your business profile in minutes and start applying right away.",
            },
            {
              title: "Fast Proposal Submission",
              description:
                "Easily submit proposals and track your tender applications seamlessly.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="relative p-8 border rounded-xl shadow-md bg-gradient-to-br from-white to-gray-50 hover:shadow-lg hover:-translate-y-1 transition transform"
            >
              <h3 className="text-xl font-semibold mb-4 text-indigo-800">
                {feature.title}
              </h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-8 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-16">
          Our Simple 4-Step Process
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            "Create Company Profile",
            "Browse Available Tenders",
            "Submit Proposals",
            "Win New Projects",
          ].map((step, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-center text-center p-8 border rounded-xl shadow-md bg-gradient-to-br from-white to-gray-50 hover:shadow-lg hover:-translate-y-1 transition transform"
            >
              <div className="text-3xl font-bold text-indigo-700 mb-4">
                {idx + 1}
              </div>
              <p className="text-gray-800 font-medium">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-16">
          Trusted by Growing Businesses
        </h2>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 justify-center">
          {[
            {
              quote:
                "TenderFlow helped us secure multiple projects within weeks. Their tendering process is a game-changer.",
              name: "— Stellar Enterprises",
            },
            {
              quote:
                "The platform is incredibly intuitive. We reduced bidding time by 50% and improved results.",
              name: "— Nova Solutions",
            },
          ].map((testimonial, idx) => (
            <div
              key={idx}
              className="relative bg-gray-50 border rounded-xl p-8 shadow-md bg-gradient-to-br from-white to-gray-50 hover:shadow-lg hover:-translate-y-1 transition transform max-w-sm"
            >
              <p className="text-gray-700 italic">{testimonial.quote}</p>
              <p className="mt-6 font-semibold text-indigo-700">
                {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t py-8 text-center text-gray-500 text-sm">
        &copy; 2025 TenderFlow. All rights reserved.
      </footer>
    </div>
  );
}
