import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Learn to Code Platform',
  description: 'Interactive coding lessons for beginners and intermediates.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Add SQL.js CDN script */}
        <script
          src="https://sql.js.org/dist/sql-wasm.js"
          type="text/javascript"
          async
        ></script>
        {/* ✅ Add Pyodide CDN */}
        <script
          src="https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js"
          type="text/javascript"
          defer
        ></script>
      </head>
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
