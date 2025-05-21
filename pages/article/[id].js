import { useRouter } from "next/router";
import { db, get, child, ref } from "../../utils/firebase";
import { useEffect, useState } from "react";

export default function ArticlePage() {
  const { id } = useRouter().query;
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (!id) return;
    get(child(ref(db), "articles")).then(snapshot => {
      if (snapshot.exists()) {
        for (let cat in snapshot.val()) {
          if (snapshot.val()[cat][id]) {
            setArticle(snapshot.val()[cat][id]);
            break;
          }
        }
      }
    });
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    <div>
      <h1>{article.title}</h1>
      <p><i>Category: {article.category}</i></p>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  );
}
