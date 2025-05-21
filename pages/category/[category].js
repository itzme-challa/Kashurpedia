import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { ref, onValue } from "firebase/database";
import Layout from "../../components/Layout";
import Link from "next/link";

const SNIPPET_LENGTH = 150;

function getSnippet(markdown) {
  if (!markdown) return "";
  const plainText = markdown
    .replace(/[#_*>\-`]/g, "")
    .replace(/\n/g, " ")
    .slice(0, SNIPPET_LENGTH);
  return plainText + (plainText.length >= SNIPPET_LENGTH ? "..." : "");
}

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;

  const [articles, setArticles] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;
    const articlesRef = ref(db, `articles/${category}`);
    onValue(articlesRef, (snapshot) => {
      const data = snapshot.val();
      setArticles(data || {});
      setLoading(false);
    });
  }, [category]);

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <div className="wiki-content">
        <h1>All Articles in "{category}"</h1>
        {Object.keys(articles).length > 0 ? (
          <ul className="article-list" style={{ listStyle: "none", paddingLeft: 0 }}>
            {Object.entries(articles).map(([id, article]) => (
              <li key={id} style={{ marginBottom: "20px" }}>
                <h3>
                  <Link href={`/article/${id}`}>
                    <a>{article.title}</a>
                  </Link>
                </h3>
                <p style={{ color: "#666" }}>
                  {article.description && article.description.trim()
                    ? article.description
                    : getSnippet(article.content)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No articles found in this category.</p>
        )}
        <p>
          <Link href="/">
            <a>← Back to Home</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}
