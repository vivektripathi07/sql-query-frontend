import React, { useState, useEffect } from 'react';
import { Search, Loader2, Database, Eye, AlertCircle, Copy, Check } from 'lucide-react';

// Header Component
const Header = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-center">
          <div 
            className={`flex items-center space-x-3 transition-all duration-1000 ease-out ${
              isAnimated ? 'scale-100 opacity-100' : 'scale-150 opacity-80'
            }`}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <Database className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Query Generator
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <div className="text-center mb-16 mt-20">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 blur-3xl"></div>
        <h2 className="relative text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
          Intelligent Query
          <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Processing
          </span>
        </h2>
      </div>
      <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
        Transform natural language into powerful database queries with our 
        <span className="text-cyan-400 font-medium"> AI-powered </span>
        processing engine.
      </p>
    </div>
  );
};

// Search Box Component
interface SearchBoxProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
  isLoading: boolean;
  hasSearched: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({ 
  query, 
  setQuery, 
  onSearch, 
  isLoading, 
  hasSearched 
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className={`transition-all duration-700 ${hasSearched ? 'mb-16' : 'mb-24'} max-w-5xl mx-auto px-4`}>
    <div className="relative">
      {/* Enhanced glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-blue-400/30 to-purple-400/30 rounded-3xl blur-2xl opacity-70 scale-110"></div>
      
      <div className="relative bg-gray-800/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-700/40 p-8 hover:border-cyan-400/40 transition-all duration-300">
        {/* Search Input - Larger */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-cyan-300 w-7 h-7" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your data..."
              className="w-full pl-18 pr-7 py-6 bg-gray-700/40 backdrop-blur-xl rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-3 focus:ring-cyan-400/60 text-xl font-medium border border-gray-600/40 focus:border-cyan-400/60 transition-all duration-300"
            />
          </div>
        </div>
        
        {/* Generate Button - Much Bigger */}
        <div className="flex justify-center">
          <button
            onClick={onSearch}
            disabled={isLoading || !query.trim()}
            className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white px-16 py-5 rounded-2xl hover:from-cyan-300 hover:to-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-bold flex items-center space-x-4 group shadow-xl shadow-cyan-400/30 hover:shadow-cyan-400/50 disabled:shadow-none text-xl min-w-[280px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-7 h-7 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Database className="w-7 h-7" />
                <span>Generate Query</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

// Code Block Component with Copy Button
interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'sql' }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-cyan-400 flex items-center space-x-2">
          <Database className="w-5 h-5" />
          <span>Generated SQL Query</span>
        </h3>
        <button
          onClick={copyToClipboard}
          className="flex items-center space-x-2 px-3 py-1.5 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-200 text-sm text-gray-300 hover:text-white border border-gray-600/30 hover:border-gray-500/50"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 blur-xl rounded-2xl"></div>
        <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
          <div className="bg-gray-800/50 px-4 py-2 border-b border-gray-700/50">
            <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">{language}</span>
          </div>
          <pre className="p-6 overflow-x-auto">
            <code className="text-sm text-gray-200 font-mono leading-relaxed">
              {code}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

// Loading Component
const LoadingSpinner = () => {
  return (
    <div className="text-center py-16">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-2xl rounded-full"></div>
        <div className="relative inline-flex items-center space-x-4 bg-gray-800/50 backdrop-blur-xl rounded-2xl px-8 py-6 border border-gray-700/50">
          <div className="relative">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
            <div className="absolute inset-0 w-8 h-8 border-2 border-cyan-400/20 rounded-full animate-pulse"></div>
          </div>
          <span className="text-xl text-gray-200 font-medium">Processing your query...</span>
        </div>
      </div>
    </div>
  );
};

// Error Component
interface ErrorMessageProps {
  error: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <div className="mt-8 mx-auto max-w-2xl px-4">
      <div className="bg-red-900/20 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6">
        <div className="flex items-center space-x-3">
          <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
          <div>
            <h3 className="text-red-400 font-semibold mb-1">Query Failed</h3>
            <p className="text-gray-300">{error}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Results Component
interface QueryResponse {
  query: string;
  sql?: string;
  rows: Record<string, any>[];
}

interface ResultsDisplayProps {
  results: QueryResponse;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  if (results.rows.length === 0) {
    return (
      <div className="mt-12 mx-auto max-w-2xl px-4">
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 text-center">
          <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-300 text-lg font-medium mb-2">No Results Found</h3>
          <p className="text-gray-400">Try adjusting your query or check the data source.</p>
        </div>
      </div>
    );
  }

  const columns = Object.keys(results.rows[0]);

  return (
    <div className="mt-12 w-full max-w-7xl mx-auto px-4">
      {/* Show SQL Query if available */}
      {results.sql && (
        <CodeBlock code={results.sql} language="sql" />
      )}

      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Database className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white">Query Results</h2>
        </div>
        <div className="bg-gray-800/30 backdrop-blur-xl rounded-xl px-4 py-3 border border-gray-700/30">
          <p className="text-gray-400">
            <span className="text-cyan-400 font-medium">Query:</span> 
            <span className="font-mono text-gray-200 ml-2 bg-gray-700/50 px-2 py-1 rounded">
              {results.query}
            </span>
          </p>
          <p className="text-gray-400 mt-2">
            <span className="text-cyan-400 font-medium">Found:</span> 
            <span className="text-white ml-2 font-semibold">{results.rows.length}</span> records
          </p>
        </div>
      </div>
      
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 blur-2xl rounded-3xl"></div>
        <div className="relative bg-gray-800/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-900/50 border-b border-gray-700/50">
                  {columns.map((key) => (
                    <th 
                      key={key} 
                      className="px-6 py-4 text-left text-sm font-semibold text-cyan-400 uppercase tracking-wider"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/30">
                {results.rows.map((row, idx) => (
                  <tr 
                    key={idx} 
                    className="hover:bg-gray-700/20 transition-colors duration-200"
                  >
                    {Object.values(row).map((val, i) => (
                      <td 
                        key={i} 
                        className="px-6 py-4 text-sm text-gray-200 font-medium whitespace-nowrap"
                      >
                        <span className="bg-gray-700/30 px-2 py-1 rounded text-gray-100">
                          {String(val)}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900/50 backdrop-blur-xl border-t border-gray-800/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-500">&copy; 2025 QueryGenerator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
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

  // Get API URL from env (same as EchoForm)
  const API_URL = import.meta.env.VITE_API_URL || "https://sql-query-backend.onrender.com";

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setHasSearched(true);
    setError(null);
    setResults(null); // Clear previous results

    try {
      const res = await fetch(`${API_URL}/query`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ natural_text: query }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        setError(errData.detail || "Failed to fetch results");
        setIsLoading(false);
        return;
      }

      const data: QueryResponse = await res.json();
      setResults(data);
    } catch (err) {
      console.error("API Error:", err);
      setError("Network error – please check your connection");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Ambient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 flex flex-col items-center justify-start">
          {!hasSearched && <HeroSection />}
          
          <SearchBox
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
            isLoading={isLoading}
            hasSearched={hasSearched}
          />

          {/* Loading State */}
          {isLoading && <LoadingSpinner />}

          {/* Error Message */}
          {error && <ErrorMessage error={error} />}

          {/* Results Display */}
          {results && !isLoading && <ResultsDisplay results={results} />}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;