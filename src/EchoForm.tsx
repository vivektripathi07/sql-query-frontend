import { useState } from "react";

interface QueryResponse {
  query: string;
  rows: Record<string, any>[]; // array of objects representing DB rows
}

export default function EchoForm() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<QueryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${API_URL}/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ natural_text: input }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.detail || "Something went wrong");
        return;
      }

      const data: QueryResponse = await res.json();
      setResponse(data);
    } catch (err) {
      setError("Network error");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your query"
          style={{ width: "300px", marginRight: "1rem" }}
        />
        <button type="submit">Send</button>
      </form>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {response && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Query:</h3>
          <pre>{response.query}</pre>

          <h3>Rows:</h3>
          {response.rows.length === 0 ? (
            <p>No results</p>
          ) : (
            <table border={1} cellPadding={5}>
              <thead>
                <tr>
                  {Object.keys(response.rows[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {response.rows.map((row, idx) => (
                  <tr key={idx}>
                    {Object.values(row).map((val, i) => (
                      <td key={i}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
