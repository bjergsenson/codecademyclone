import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-purple-300 p-4">
      <h1 className="text-4xl md:text-6xl font-bold text-center text-gray-800 mb-6">
        Learn to Code the Fun Way 🎉
      </h1>
      <p className="text-lg md:text-xl text-center text-gray-700 max-w-xl mb-8">
        Start your coding journey with interactive lessons, real coding challenges, and progress tracking in Python, JavaScript, SQL, HTML/CSS, and Django.
      </p>
      <Link href="/dashboard">
        <button className="px-6 py-3 bg-blue-600 text-white text-lg rounded-2xl shadow-lg hover:bg-blue-700 transition">
          Get Started
        </button>
      </Link>
    </main>
  );
}