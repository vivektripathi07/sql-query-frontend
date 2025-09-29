import React, { useState } from 'react';
import { Search, Loader2, Sparkles, Github, Twitter, Mail, ArrowRight } from 'lucide-react';

// Header Component
const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              QueryFlow
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Docs</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Support</a>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium">
              Get Started
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <div className="text-center mb-12 mt-16">
      <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
        Intelligent Query
        <span className="block">Processing</span>
      </h2>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
        Transform your queries into actionable insights with our advanced processing engine. 
        Fast, accurate, and beautifully simple.
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
    <div className={`transition-all duration-500 ${hasSearched ? 'mb-8' : 'mb-16'}`}>
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-20"></div>
        <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200/50 p-2">
          <div className="flex items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your query..."
                className="w-full pl-12 pr-4 py-4 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-lg"
              />
            </div>
            <button
              onClick={onSearch}
              disabled={isLoading || !query.trim()}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center space-x-2 group"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading Component
const LoadingSpinner = () => {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center space-x-3 text-gray-600">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        <span className="text-lg">Processing your query...</span>
      </div>
    </div>
  );
};

// Result Card Component
interface ResultCardProps {
  result: {
    id: number;
    title: string;
    description: string;
    score: number;
    category: string;
  };
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300 group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <h4 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {result.title}
          </h4>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            result.category === 'Primary' ? 'bg-green-100 text-green-700' :
            result.category === 'Secondary' ? 'bg-blue-100 text-blue-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {result.category}
          </span>
        </div>
        <div className="text-sm font-medium text-gray-500">
          {(result.score * 100).toFixed(0)}% match
        </div>
      </div>
      <p className="text-gray-600 leading-relaxed">
        {result.description}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${result.score * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// Results Section Component
interface ResultsSectionProps {
  results: {
    query: string;
    timestamp: string;
    results: Array<{
      id: number;
      title: string;
      description: string;
      score: number;
      category: string;
    }>;
  };
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Results</h3>
        <div className="text-sm text-gray-500">
          Query: "{results.query}" • {results.results.length} results found
        </div>
      </div>
      
      <div className="grid gap-6">
        {results.results.map((result) => (
          <ResultCard key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">QueryFlow</h3>
            </div>
            <p className="text-gray-400">
              Intelligent query processing for the modern web. Fast, reliable, and beautifully designed.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 QueryFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setHasSearched(true);
    
    // Simulate API call
    setTimeout(() => {
      setResults({
        query: query,
        timestamp: new Date().toISOString(),
        results: [
          {
            id: 1,
            title: "Advanced Query Processing",
            description: "Your query has been processed using state-of-the-art algorithms to provide the most relevant results.",
            score: 0.95,
            category: "Primary"
          },
          {
            id: 2,
            title: "Related Information",
            description: "Additional context and related information that might be useful for your search query.",
            score: 0.87,
            category: "Secondary"
          },
          {
            id: 3,
            title: "Supplementary Data",
            description: "Extended data points and supplementary information derived from your query parameters.",
            score: 0.73,
            category: "Tertiary"
          }
        ]
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {!hasSearched && <HeroSection />}
        
        <SearchBox 
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
          isLoading={isLoading}
          hasSearched={hasSearched}
        />

        {hasSearched && (
          <div className="space-y-6">
            {isLoading ? (
              <LoadingSpinner />
            ) : results ? (
              <ResultsSection results={results} />
            ) : null}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;