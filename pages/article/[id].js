import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db, auth } from "../../utils/firebase";
import { ref, get, child, remove } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import Head from "next/head";

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

  if (!article) return <p>Loading...</p>;

  return (
    <div>
      <NavBar />
      <Head>
        <title>{article.title} - Kashurpedia</title>
       <meta name="description" content={article.content.slice(0, 150)} />
      </Head>
      <h1>{article.title}</h1>
      <p><i>By {article.username}</i></p>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
      {user?.uid === article.userId && (
        <div>
          <Link href={`/article/edit/${id}`}>Edit</Link>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}
