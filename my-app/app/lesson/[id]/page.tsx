'use client';

import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { useParams } from 'next/navigation';

const LessonPage = () => {
  const { id } = useParams();
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [SQL, setSQL] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem(`lesson-code-${id}`);
    if (saved) setCode(saved);
  }, [id]);

  useEffect(() => {
    localStorage.setItem(`lesson-code-${id}`, code);
  }, [code, id]);

  // Dynamically load sql.js only if lesson is SQL
  useEffect(() => {
    const loadSqlJs = async () => {
      if (id === 'sql' && (window as any).initSqlJs) {
        const initSqlJs = (window as any).initSqlJs;
        const SQLModule = await initSqlJs({
          locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
        });
        setSQL(SQLModule);
      }
    };
    loadSqlJs();
  }, [id]);

  const runCode = async () => {
    try {
      if (id === 'js') {
        const result = eval(code);
        setOutput(String(result));
      } else if (id === 'python') {
        try {
          // ✅ Wait for Pyodide to be loaded
          async function ensurePyodide() {
            if (!(window as any).loadPyodide) {
              await new Promise<void>((resolve, reject) => {
                const check = () => {
                  if ((window as any).loadPyodide) resolve();
                  else setTimeout(check, 50); // Retry every 50ms until available
                };
                check();
              });
            }

            if (!(window as any).pyodide) {
              const pyodide = await (window as any).loadPyodide({
                indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/',
              });
              (window as any).pyodide = pyodide;
            }

            return (window as any).pyodide;
          }

          const pyodide = await ensurePyodide();
          const result = await pyodide.runPythonAsync(code);
          setOutput(String(result));
        } catch (err) {
          setOutput('Python Error: ' + err);
        }
      } else if (id === 'sql') {
        if (!SQL) {
          setOutput('SQL.js not yet loaded...');
          return;
        }
        const db = new SQL.Database();
        const results = db.exec(code);
        if (results.length === 0) {
          setOutput('✅ Query executed (no results)');
        } else {
          const table = results[0];
          const outputText = table.values
            .map((row: any[]) => row.join(' | '))
            .join('\n');
          setOutput(outputText);
        }
      }
    } catch (err: any) {
      setOutput(`❌ Error:\n${err.message}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 capitalize">{id} Lesson</h1>
      <Editor
        height="300px"
        defaultLanguage={id === 'sql' ? 'sql' : id === 'python' ? 'python' : 'javascript'}
        value={code}
        onChange={(value) => setCode(value || '')}
        theme="vs-dark"
      />
      <button
        onClick={runCode}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        ▶️ Run Code
      </button>
      <pre className="mt-6 bg-gray-100 p-4 rounded whitespace-pre-wrap">{output}</pre>
    </div>
  );
};

export default LessonPage;