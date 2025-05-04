"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { lessons } from "@/app/data/lessons";
import Editor from "@monaco-editor/react";

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const lesson = lessons.find((l) => l.id === id);

  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(`lesson-code-${id}`);
    if (saved) {
      setCode(saved);
    } else {
      setCode(lesson?.starterCode || "");
    }
  }, [id, lesson]);

  const handleCodeChange = (value: string | undefined) => {
    setCode(value || "");
    localStorage.setItem(`lesson-code-${id}`, value || "");
  };

  const languageMap: Record<string, string> = {
    js: "javascript",
    python: "python",
    sql: "sql",
  };

  const language = languageMap[id as string] || "javascript";

  const runCode = () => {
    if (language !== "javascript") {
      setOutput("⚠️ Code execution is only supported for JavaScript at this time.");
      return;
    }

    try {
      const consoleLog: string[] = [];
      const customConsole = {
        log: (...args: any[]) => {
          consoleLog.push(args.join(" "));
        },
      };

      // Create a function with custom console
      const func = new Function("console", code);
      func(customConsole);

      setOutput(consoleLog.join("\n") || "(no output)");
    } catch (err: any) {
      setOutput("❌ Error: " + err.message);
    }
  };

  if (!lesson) return <p>Lesson not found</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{lesson.title}</h1>
      <p>{lesson.description}</p>

      <div className="h-[400px] border rounded">
        <Editor
          height="100%"
          defaultLanguage={language}
          value={code}
          theme="vs-dark"
          onChange={handleCodeChange}
        />
      </div>

      <button
        onClick={runCode}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        ▶️ Run Code
      </button>

      <div className="mt-4 p-4 bg-black text-white rounded">
        <h2 className="font-semibold mb-2">Console Output:</h2>
        <pre>{output}</pre>
      </div>
    </div>
  );
}