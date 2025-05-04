// app/lesson/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { lessons } from "@/app/data/lessons";
import Editor from "@monaco-editor/react";

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const lesson = lessons.find((l) => l.id === id);

  const [code, setCode] = useState("");

  // Load saved code
  useEffect(() => {
    const saved = localStorage.getItem(`lesson-code-${id}`);
    if (saved) {
      setCode(saved);
    } else {
      setCode(lesson?.starterCode || "");
    }
  }, [id, lesson]);

  // Save on change
  const handleCodeChange = (value: string | undefined) => {
    setCode(value || "");
    localStorage.setItem(`lesson-code-${id}`, value || "");
  };

  // Choose editor language
  const languageMap: Record<string, string> = {
    js: "javascript",
    python: "python",
    sql: "sql",
  };

  const language = languageMap[id as string] || "javascript";

  if (!lesson) return <p>Lesson not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
      <p className="mb-4">{lesson.description}</p>
      <div className="h-[400px] border rounded">
        <Editor
          height="100%"
          defaultLanguage={language}
          value={code}
          theme="vs-dark"
          onChange={handleCodeChange}
        />
      </div>
    </div>
  );
}