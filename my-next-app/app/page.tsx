"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");  // Replace with cookie if needed
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center">
        Welcome to B2B Tender Platform
      </h1>
      <p className="text-lg md:text-xl mb-8 text-center max-w-xl">
        Discover tenders, grow your business, and connect with top companies easily.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/login")}
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/register")}
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          Register
        </button>
      </div>
    </div>
  );
}
