export async function generateSQL(query: string): Promise<string> {
  // Plug in OpenAI / custom NLP model here
  // For demo, return mocked SQL
  if (query.toLowerCase().includes("customers")) {
    return "SELECT * FROM customers WHERE join_date > '2020-01-01';";
  }
  return "SELECT * FROM table LIMIT 10;";
}