"use client";

import { useParams } from "next/navigation";
import Editor from "@monaco-editor/react";

import { useEffect, useState } from "react";

const [code, setCode] = useState("");

useEffect(() => {
  const saved = localStorage.getItem(`lesson-code-${id}`);
  if (saved) setCode(saved);
}, [id]);

const handleChange = (value: string | undefined) => {
  setCode(value || "");
  localStorage.setItem(`lesson-code-${id}`, value || "");
};

export default function LessonPage() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lesson: {id}</h1>
      <Editor
        height="400px"
        defaultLanguage={id === "python" ? "python" : id}
        defaultValue="// Start coding..."
        theme="vs-dark"
      />
    </div>
  );
}