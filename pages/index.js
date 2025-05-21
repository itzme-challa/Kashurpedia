import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "../utils/firebase";
import { ref, onValue } from "firebase/database";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [articles, setArticles] = useState({});
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const articlesRef = ref(db, "articles");
    onValue(articlesRef, (snapshot) => {
      const data = snapshot.val();
      setArticles(data || {});
      setLoading(false);
    });
  }, []);

  // Debounced search
  const filteredArticles = Object.keys(articles).reduce((acc, category) => {
    const filtered = Object.entries(articles[category] || {}).filter(([id, article]) =>
      article?.title?.toLowerCase().includes(query.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = Object.fromEntries(filtered);
    }
    return acc;
  }, {});

  return (
    <div className="container min-h-screen">
      <NavBar />
      <div className="my-8">
        <h1 className="text-3xl font-bold">Welcome to Kashurpedia</h1>
        <p className="text-gray-600 mt-2">
          The free encyclopedia celebrating Kashmiri culture, history, and knowledge.
        </p>
      </div>
      <SearchBar query={query} setQuery={setQuery} />
      {loading ? (
        <p className="text-gray-600">Loading articles...</p>
      ) : Object.keys(filteredArticles).length === 0 ? (
        <p className="text-gray-600">No articles found.</p>
      ) : (
        Object.keys(filteredArticles).map((category) => (
          <div key={category} className="mb-6">
            <h2 className="text-xl font-semibold">{category}</h2>
            <ul className="list-disc pl-6 mt-2">
              {Object.entries(filteredArticles[category]).map(([id, article]) => (
                <li key={id} className="my-1">
                  <Link href={`/article/${id}`} className="text-blue-600 hover:underline">
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
