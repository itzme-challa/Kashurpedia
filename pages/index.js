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

  // Filter articles by query
  const filteredArticles = Object.keys(articles).reduce((acc, category) => {
    const filtered = Object.entries(articles[category] || {}).filter(([id, article]) =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = Object.fromEntries(filtered);
    }
    return acc;
  }, {});

  // Helper to get excerpt (first 30-40 words)
  const getExcerpt = (text, wordLimit = 35) => {
    if (!text) return "";
    const words = text.split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <Layout>
      <div className="wiki-content">
        <h1>Welcome to Kashurpedia</h1>
        <p>The free encyclopedia that anyone can edit.</p>

        <SearchBar query={query} setQuery={setQuery} />

        {Object.keys(filteredArticles).length > 0 ? (
          <div className="category-list">
            {Object.keys(filteredArticles).map((category) => {
              const articlesInCategory = Object.entries(filteredArticles[category]);
              const showArticles = articlesInCategory.slice(0, 3);

              return (
                <div key={category} style={{ breakInside: "avoid", marginBottom: "20px" }}>
                  <h2>{category}</h2>
                  <ul className="article-list">
                    {showArticles.map(([id, article]) => (
                      <li key={id} style={{ marginBottom: "10px" }}>
                        <Link href={`/article/${id}`}>
                          <a style={{ fontWeight: "bold" }}>{article.title}</a>
                        </Link>
                        <p>
                          {getExcerpt(article.content)}{" "}
                          <Link href={`/article/${id}`}>
                            <a>Read more...</a>
                          </Link>
                        </p>
                      </li>
                    ))}
                  </ul>
                  {articlesInCategory.length > 3 && (
                    <Link href={`/category/${encodeURIComponent(category)}`}>
                      <a style={{ fontWeight: "bold" }}>View more...</a>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p>No articles found. {query && "Try a different search term."}</p>
        )}
      </div>
    </Layout>
  );
}
