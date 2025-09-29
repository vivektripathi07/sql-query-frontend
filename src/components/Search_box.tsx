import { Search, Loader2, ArrowRight } from 'lucide-react';

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

export default SearchBox;
