import Loader2 from 'lucide-react';


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