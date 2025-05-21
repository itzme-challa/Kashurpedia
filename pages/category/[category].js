import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { db } from "../../utils/firebase";
import { ref, onValue } from "firebase/database";
import Layout from "../../components/Layout";

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;

  const [articles, setArticles] = useState({});

  useEffect(() => {
    if (!category) return;

    const articlesRef = ref(db, `articles/${category}`);
    onValue(articlesRef, (snapshot) => {
      const data = snapshot.val();
      setArticles(data || {});
    });
  }, [category]);

  const getExcerpt = (text, wordLimit = 40) => {
    if (!text) return "";
    const words = text.split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <Layout>
      <div className="wiki-content">
        <h1>Category: {category}</h1>
        <Link href="/">
          <a style={{ marginBottom: "20px", display: "inline-block" }}>← Back to Home</a>
        </Link>

        {Object.keys(articles).length > 0 ? (
          <ul className="article-list">
            {Object.entries(articles).map(([id, article]) => (
              <li key={id} style={{ marginBottom: "20px" }}>
                <Link href={`/article/${id}`}>
                  <a style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{article.title}</a>
                </Link>
                <p>{getExcerpt(article.content)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No articles found in this category.</p>
        )}
      </div>
    </Layout>
  );
}
