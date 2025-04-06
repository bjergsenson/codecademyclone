"use client";
import { useParams } from "next/navigation";
import React from "react";


export default function LessonPage() {
  const params = useParams();
  const lessonId = params?.id;

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Lesson: {lessonId}</h1>
      <div className="mb-4">
        <p>This is where your lesson content and code editor will go.</p>
      </div>
      <textarea
        placeholder="Write your code here..."
        className="w-full h-60 p-4 font-mono border rounded-lg shadow-inner"
      ></textarea>
    </div>
  );
}