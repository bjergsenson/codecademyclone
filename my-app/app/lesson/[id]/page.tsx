"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { lessons } from "@/app/data/lessons";

export default function LessonPage() {
  const { id } = useParams();
  const lessonId = id as keyof typeof lessons;
  const lesson = lessons[lessonId];

  const [code, setCode] = useState("");

  useEffect(() => {
    if (lesson) {
      const saved = localStorage.getItem(`lesson-code-${lessonId}`);
      setCode(saved || lesson.starterCode);
    }
  }, [lessonId]);

  const handleChange = (value: string) => {
    setCode(value);
    localStorage.setItem(`lesson-code-${lessonId}`, value);
  };

  if (!lesson) {
    return <p className="p-6">❌ Lesson not found.</p>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">{lesson.title}</h1>
      <p className="text-gray-700">{lesson.description}</p>
      <textarea
        className="w-full h-64 p-2 border rounded font-mono"
        value={code}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}