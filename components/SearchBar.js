export default function SearchBar({ query, setQuery }) {
  return (
    <div className="container my-4">
      <input
        type="text"
        placeholder="Search Kashurpedia..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-lg border border-gray-300 p-2 rounded"
        aria-label="Search articles"
      />
    </div>
  );
}
