import React, { useState } from "react";
import { generateSQL } from "./nlpService";

const QueryInput: React.FC = () => {
  const [text, setText] = useState("");
  const [sql, setSql] = useState("");

  const handleSubmit = async () => {
    const result = await generateSQL(text);
    setSql(result);
  };

  return (
    <div className="max-w-3xl w-full p-8 rounded-3xl bg-white/20 backdrop-blur-lg shadow-2xl border border-white/30 flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-gray-900">Natural Language → SQL</h2>

      <textarea
        className="w-full h-32 p-4 rounded-xl bg-white/70 border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-inner resize-none placeholder-gray-500 text-gray-900 font-medium transition-all duration-300"
        placeholder="Type your query in plain English..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
        onClick={handleSubmit}
      >
        Generate SQL
      </button>

      {sql && (
        <div className="p-4 bg-white/50 border border-white/30 rounded-xl shadow-inner backdrop-blur-md">
          <h3 className="text-gray-700 font-medium mb-2">Generated SQL:</h3>
          <pre className="text-gray-900 font-mono text-sm overflow-x-auto">{sql}</pre>
        </div>
      )}
    </div>
  );
};

export default QueryInput;
