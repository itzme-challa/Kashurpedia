import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "../utils/firebase";
import { ref, onValue } from "firebase/database";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import ReactMarkdown from "react-markdown";

const SNIPPET_LENGTH = 150; // number of chars to show in snippet

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

  // Filter articles by query in title only
  const filteredArticles = Object.keys(articles).reduce((acc, category) => {
    const filtered = Object.entries(articles[category]).filter(([id, article]) =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = Object.fromEntries(filtered);
    }
    return acc;
  }, {});

  // Helper to get snippet from Markdown content (remove markdown, get first N chars)
  function getSnippet(markdown) {
    if (!markdown) return "";
    // A quick way: strip markdown syntax (roughly)
    const plainText = markdown
      .replace(/[#_*>-`]/g, "")
      .replace(/\n/g, " ")
      .slice(0, SNIPPET_LENGTH);
    return plainText + (plainText.length >= SNIPPET_LENGTH ? "..." : "");
  }

  return (
    <Layout>
      <div className="wiki-content">
        <h1>Welcome to Kashurpedia</h1>
        <p>The free encyclopedia that anyone can edit.</p>

        <SearchBar query={query} setQuery={setQuery} />

        {Object.keys(filteredArticles).length > 0 ? (
          <div className="category-list">
            {Object.keys(filteredArticles).map((category, index) => {
              const articlesArr = Object.entries(filteredArticles[category]);
              const previewArticles = articlesArr.slice(0, 3);

              return (
                <div
                  key={category}
                  style={{
                    breakInside: "avoid",
                    marginBottom: "40px",
                    paddingBottom: "20px",
                    borderBottom:
                      index < Object.keys(filteredArticles).length - 1
                        ? "1px solid #ccc"
                        : "none", // Add border except for the last category
                  }}
                >
                  <h2>{category}</h2>
                  <ul className="article-list" style={{ listStyle: "none", paddingLeft: 0 }}>
                    {previewArticles.map(([id, article]) => (
                      <li key={id} style={{ marginBottom: "20px" }}>
                        <h3>
                          <Link href={`/article/${id}`}>
                            <a>{article.title}</a>
                          </Link>
                        </h3>
                        <p>
                          {getSnippet(article.content)}{" "}
                          <Link href={`/article/${id}`}>
                            <a style={{ fontWeight: "bold" }}>Read more...</a>
                          </Link>
                        </p>
                      </li>
                    ))}
                  </ul>
                  {articlesArr.length > 3 && (
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
