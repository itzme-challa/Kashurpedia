import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "../utils/firebase";
import { ref, onValue } from "firebase/database";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [articles, setArticles] = useState({});
  const [query, setQuery] = useState("");

  useEffect(() => {
    const articlesRef = ref(db, "articles");
    onValue(articlesRef, (snapshot) => {
      const data = snapshot.val();
      setArticles(data || {});
    });
  }, []);

  const filteredArticles = Object.keys(articles).reduce((acc, category) => {
    const filtered = Object.entries(articles[category]).filter(([id, article]) =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = Object.fromEntries(filtered);
    }
    return acc;
  }, {});

  return (
    <Layout>
      <div className="wiki-content">
        <h1>Welcome to Kashurpedia</h1>
        <p>The free encyclopedia that anyone can edit.</p>
        
        <SearchBar query={query} setQuery={setQuery} />
        
        {Object.keys(filteredArticles).length > 0 ? (
          <div className="category-list">
            {Object.keys(filteredArticles).map((category) => (
              <div key={category} style={{ breakInside: 'avoid', marginBottom: '20px' }}>
                <h2>{category}</h2>
                <ul className="article-list">
                  {Object.entries(filteredArticles[category]).map(([id, article]) => (
                    <li key={id}>
                      <Link href={`/article/${id}`}>{article.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p>No articles found. {query && 'Try a different search term.'}</p>
        )}
      </div>
    </Layout>
  );
}
