"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { lessons } from "@/app/data/lessons";
import Editor from "@monaco-editor/react";

export default function LessonPage() {
  let initSqlJs: any;
  const { id } = useParams<{ id: string }>();
  const lesson = lessons.find((l) => l.id === id);

  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [pyodide, setPyodide] = useState<any>(null);
  const [SQL, setSQL] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem(`lesson-code-${id}`);
    if (saved) {
      setCode(saved);
    } else {
      setCode(lesson?.starterCode || "");
    }

    const loadPyodide = async () => {
      if (!pyodide && id === "python") {
        const pyodidePkg = await import("https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js");
        const loaded = await pyodidePkg.loadPyodide();
        setPyodide(loaded);
      }
    };

    const loadSqlJs = async () => {
      if (!SQL && id === "sql") {
        const module = await import("https://sql.js.org/dist/sql-wasm.js");
        initSqlJs = module.default;
        const SQLModule = await initSqlJs({ locateFile: (file: string) => `https://sql.js.org/dist/${file}` });
        setSQL(SQLModule);
      }
    };

    loadPyodide();
    loadSqlJs();
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

  const runCode = async () => {
    if (language === "javascript") {
      try {
        const consoleLog: string[] = [];
        const customConsole = {
          log: (...args: any[]) => {
            consoleLog.push(args.join(" "));
          },
        };
        const func = new Function("console", code);
        func(customConsole);
        setOutput(consoleLog.join("\n") || "(no output)");
      } catch (err: any) {
        setOutput("❌ Error: " + err.message);
      }
    } else if (language === "python") {
      if (!pyodide) {
        setOutput("⏳ Loading Python runtime...");
        return;
      }
      try {
        const result = await pyodide.runPythonAsync(code);
        setOutput(result?.toString() || "(no output)");
      } catch (err: any) {
        setOutput("🐍 Python Error: " + err.message);
      }
    } else if (language === "sql") {
      if (!SQL) {
        setOutput("⏳ Loading SQL engine...");
        return;
      }
      try {
        const db = new SQL.Database();
        const results = db.exec(code);
        if (results.length === 0) {
          setOutput("✅ SQL executed (no result set)");
        } else {
          const table = results
            .map(({ columns, values }) => {
              const header = columns.join(" | ");
              const rows = values.map((row: any[]) => row.join(" | ")).join("\n");
              return `${header}\n${"-".repeat(header.length)}\n${rows}`;
            })
            .join("\n\n");
          setOutput(table);
        }
      } catch (err: any) {
        setOutput("🛑 SQL Error: " + err.message);
      }
    } else {
      setOutput("⚠️ Code execution for this language is not supported yet.");
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
