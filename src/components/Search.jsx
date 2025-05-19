import { useState } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/article/${encodeURIComponent(searchTerm)}`);
    }
  };

  const fetchSuggestions = async (term) => {
    if (term.length > 2) {
      const articlesRef = ref(database, 'articles');
      const snapshot = await get(articlesRef);
      if (snapshot.exists()) {
        const articles = Object.values(snapshot.val());
        const filtered = articles.filter(article => 
          article.title.toLowerCase().includes(term.toLowerCase())
        ).slice(0, 5);
        setSuggestions(filtered);
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            fetchSuggestions(e.target.value);
          }}
          placeholder="Search Kashurpedia"
        />
        <button type="submit">Search</button>
      </form>
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((article, index) => (
            <li key={index} onClick={() => {
              setSearchTerm(article.title);
              setSuggestions([]);
              navigate(`/article/${encodeURIComponent(article.title)}`);
            }}>
              {article.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
