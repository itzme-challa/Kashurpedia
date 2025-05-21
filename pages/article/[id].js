import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db, auth } from "../../utils/firebase";
import { ref, get, remove } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ReactMarkdown from "react-markdown";

export default function ArticlePage() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!id) return;
    const articlesRef = ref(db, "articles");
    get(articlesRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        for (let category in data) {
          if (data[category][id]) {
            setArticle({ ...data[category][id], category });
            break;
          }
        }
      }
    });
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this article?")) {
      await remove(ref(db, `articles/${article.category}/${id}`));
      router.push("/");
    }
  };

  if (!article) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      <Head>
        <title>{article.title} - Kashurpedia</title>
        <meta
          name="description"
          content={article.summary || article.content.slice(0, 150)}
        />
      </Head>
      <NavBar />
      <div className="wiki-content max-w-4xl mx-auto px-4 py-6">
        <div className="relative">
          {user?.uid === article.userId && (
            <div className="absolute right-0 top-0 flex space-x-3">
              <Link
                href={`/article/edit/${id}`}
                className="text-gray-600 hover:text-blue-600"
                title="Edit"
              >
                <FontAwesomeIcon icon={faEdit} size="lg" />
              </Link>
              <button
                onClick={handleDelete}
                className="text-gray-600 hover:text-red-600"
                title="Delete"
              >
                <FontAwesomeIcon icon={faTrash} size="lg" />
              </button>
            </div>
          )}
          <h1 className="text-3xl font-bold mb-2 break-words">{article.title}</h1>
          <div className="text-sm text-gray-500 mb-4">
            By {article.username} • Last edited:{" "}
            {new Date(article.timestamp).toLocaleDateString()}
          </div>
        </div>

        {article.imageUrl && (
          <div className="article-image mb-4">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full max-h-[400px] object-cover rounded-lg"
            />
            {article.imageCaption && (
              <div className="text-sm text-center text-gray-500 mt-1">
                {article.imageCaption}
              </div>
            )}
          </div>
        )}

        {article.summary && (
          <div className="prose prose-sm sm:prose-base prose-slate mb-4">
            <ReactMarkdown>{article.summary}</ReactMarkdown>
          </div>
        )}

        <div className="prose prose-sm sm:prose-base prose-slate">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </div>
    </>
  );
}
