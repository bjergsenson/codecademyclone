export const lessons = [
  {
    id: "python",
    title: "Intro to Python",
    description: "Learn basic Python syntax.",
    starterCode: 'print("Hello, Python!")',
  },
  {
    id: "js",
    title: "Intro to JavaScript",
    description: "Learn how to write JS code.",
    starterCode: 'console.log("Hello, JS!");',
  },
  {
    id: 'sql',
    title: 'SQL Basics',
    description: 'Learn to query data with SQL',
    code: `CREATE TABLE users (id INTEGER, name TEXT);\nINSERT INTO users VALUES (1, 'Alice'), (2, 'Bob');\nSELECT * FROM users;`,
  },
];