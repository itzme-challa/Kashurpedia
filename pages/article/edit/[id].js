import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db, auth } from "../../../utils/firebase";
import { ref, get, update } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import NavBar from "../../../components/NavBar";
import Head from "next/head";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

export default function EditArticle() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [updated, setUpdated] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!id) return;
    const articlesRef = ref(db, "articles");
    get(articlesRef).then(snapshot => {
      const data = snapshot.val();
      for (let category in data) {
        if (data[category][id]) {
          const art = data[category][id];
          setArticle({ ...art, category });
          setTitle(art.title);
          setContent(art.content);
          break;
        }
      }
    });
  }, [id]);

  const handleUpdate = async () => {
    const updatedData = {
      title,
      content,
      timestamp: Date.now(),
      versions: [
        ...(article.versions || []),
        {
          title: article.title,
          content: article.content,
          timestamp: article.timestamp
        }
      ]
    };
    await update(ref(db, `articles/${article.category}/${id}`), updatedData);
    setUpdated(true);
  };

  if (!article) return <p>Loading...</p>;
  if (user?.uid !== article.userId) return <p>Unauthorized</p>;

  return (
    <>
      <Head>
        <title>Editing: {title} - Kashurpedia</title>
      </Head>
      <NavBar />
      <div className="wiki-content">
        <h1>Edit Article</h1>

        {updated ? (
          <p className="text-green-600">Article updated successfully.</p>
        ) : (
          <div className="wiki-form">
            <div className="form-group">
              <label>Title:</label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Article title"
              />
            </div>

            <div className="form-group">
              <label>Content:</label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Article content in Markdown format"
                rows={15}
              />
              <small>You can use Markdown formatting</small>
            </div>

            <div className="form-actions">
              <button onClick={handleUpdate} className="save-btn">
                <FontAwesomeIcon icon={faSave} /> Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
