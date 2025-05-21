export default function SearchBar({ query, setQuery }) {
  return (
    <div style={{ margin: '20px 0' }}>
      <input
        type="search"
        placeholder="Search Kashurpedia..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: '10px',
          fontSize: '16px',
          border: '1px solid #a2a9b1',
          borderRadius: '2px'
        }}
      />
    </div>
  );
}
