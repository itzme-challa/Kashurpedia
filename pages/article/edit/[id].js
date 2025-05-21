import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db, auth } from "../../../utils/firebase";
import { ref, get, update } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import NavBar from "../../../components/NavBar";

export default function EditArticle() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
        { title: article.title, content: article.content, timestamp: article.timestamp }
      ]
    };
    await update(ref(db, `articles/${article.category}/${id}`), updatedData);
    router.push(`/article/${id}`);
  };

  if (!article) return <p>Loading...</p>;
  if (user?.uid !== article.userId) return <p>Unauthorized</p>;

  return (
    <div>
      <NavBar />
      <h1>Edit Article</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <br />
      <textarea value={content} onChange={e => setContent(e.target.value)} rows={10} cols={50} />
      <br />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}
