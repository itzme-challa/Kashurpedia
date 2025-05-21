import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db, auth } from "../../utils/firebase";
import { ref, get, child, remove } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import Head from "next/head";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactMarkdown from 'react-markdown';

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

  if (!article) return <div className="loading">Loading...</div>;

  return (
    <div className="article-view-container">
      <Head>
        <title>{article.title} - Kashurpedia</title>
        <meta name="description" content={article.summary || article.content.slice(0, 150)} />
      </Head>
      <NavBar />
      
      <div className="wiki-content">
        <div className="article-header">
          <h1>{article.title}</h1>
          <div className="article-meta">
            <span>By {article.username}</span>
            <span>•</span>
            <span>Last edited: {new Date(article.timestamp).toLocaleDateString()}</span>
          </div>
        </div>
        
        {article.imageUrl && (
          <div className="article-image">
            <img src={article.imageUrl} alt={article.title} />
            {article.imageCaption && <div className="image-caption">{article.imageCaption}</div>}
          </div>
        )}
        
        {article.summary && (
          <div className="article-summary">
            <ReactMarkdown>{article.summary}</ReactMarkdown>
          </div>
        )}
        
        <div className="article-content">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
        
        {user?.uid === article.userId && (
          <div className="article-actions">
            <Link href={`/article/edit/${id}`} className="edit-btn">
              <FontAwesomeIcon icon={faEdit} /> Edit
            </Link>
            <button onClick={handleDelete} className="delete-btn">
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
