import React from 'react';
import Link from 'next/link';

const courses = [
  { id: 'python', title: 'Intro to Python', description: 'Learn Python basics step by step.' },
  { id: 'js', title: 'JavaScript Essentials', description: 'Grasp the fundamentals of JS.' },
  { id: 'sql', title: 'SQL for Beginners', description: 'Query databases using SQL.' },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold mb-6">Your Courses</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map(course => (
          <Link key={course.id} href={`/lesson/${course.id}`}>
            <div className="p-4 bg-blue-100 rounded-2xl shadow hover:shadow-lg cursor-pointer">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p>{course.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}