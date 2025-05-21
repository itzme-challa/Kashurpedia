export default function SearchBar({ query, setQuery }) {
  return (
    <input
      type="text"
      placeholder="Search articles..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
