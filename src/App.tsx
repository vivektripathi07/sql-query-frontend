import { useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { Search, Sparkles } from 'lucide-react';
import './App.css';

interface QueryResponse {
  query: string;
  sql?: string;
  rows: Record<string, any>[];
}

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<QueryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || "https://sql-query-backend.onrender.com";

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch(`${API_URL}/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ natural_text: query }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        setError(errData.detail || "Failed to fetch results");
        return;
      }

      const data: QueryResponse = await res.json();
      setResults(data);
    } catch (err) {
      console.error("API Error:", err);
      setError("Network error - please check your connection");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSearch();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 relative overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300/30 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/30 rounded-full blur-2xl"></div>


      {/* Header */}
      <header className="relative z-10 pt-8 pb-4">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-2xl font-semibold">Text2SQL</span>
            </div>
            
            <div className="flex items-center gap-8">
              <button className="px-5 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition-colors">
                Visit Github
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-20 pb-16">
        <div className="max-w-3xl w-full text-center">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-12">
            Generate SQL from text
          </h1>

          <h2 className="text-5xl md:text-2xl font-light text-gray-400 mb-12">Using context of a database for generate quries.</h2>


          <a href="https://sql-query-backend.onrender.com/tables" className="no-underline">
            <button className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors mb-16">
                View Database
            </button>
          </a>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type here..."
                className="flex-1 text-gray-700 placeholder-gray-500 bg-transparent outline-none"
              />
            </div>
            <button
            onClick={handleSearch}
            className="ml-auto px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center"
            aria-label="Run Query"
            >
            {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            )}
            </button>
          </div>

        </div>

        {/* Results Section (Hidden by default) */}
        {hasSearched && (
        <div className="max-w-4xl w-full mt-12 animate-fadeIn">
            {error && <div className="text-red-500 mb-4">{error}</div>}

            {/* Query Display from API response */}
            {results?.query && (
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-gray-700">Your Query</h3>
                <button 
                onClick={async () => {
                    try {
                    await navigator.clipboard.writeText(results.query);
                    const popup = document.createElement('div');
                    popup.innerText = 'Copied!';
                    popup.className = 'fixed bottom-4 right-4 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg z-50 animate-fadeIn';
                    document.body.appendChild(popup);
                    
                    // Remove after 2 seconds
                    setTimeout(() => {
                        popup.classList.add('animate-fadeOut');
                        setTimeout(() => document.body.removeChild(popup), 300);
                    }, 2000);
                    } catch (err) {
                    console.error('Failed to copy: ', err);
                    // Optional: Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = results.query;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    }
                }}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
                </button>
                </div>
                <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{results.query}</code>
                </pre>
            </div>
            )}

            {results && results.rows.length > 0 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-light text-gray-900 mb-6">Query Results</h3>
                <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                    <tr className="border-b border-gray-200">
                        {Object.keys(results.rows[0]).map((col) => (
                        <th key={col} className="text-left py-3 px-4 font-medium text-gray-700">{col}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {results.rows.map((row, i) => (
                        <tr key={i} className="border-b border-gray-100">
                        {Object.values(row).map((val, j) => (
                            <td key={j} className="py-3 px-4 text-gray-600">{val}</td>
                        ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                {results.sql && (
                <div className="mt-4 text-sm text-gray-500">
                    <strong>Generated SQL:</strong> {results.sql}
                </div>
                )}
            </div>
            )}

            {results && results.rows.length === 0 && !error && (
            <div className="text-gray-500">No results found for "{results.query}"</div>
            )}
        </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-auto py-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-500">© 2025</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/in/vivek-tripathi-p07/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
