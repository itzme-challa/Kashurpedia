import Link from "next/link";
import { db, get, child, ref } from "../utils/firebase";
import { useEffect, useState } from "react";

export default function Home() {
  const [articles, setArticles] = useState({});

  useEffect(() => {
    get(child(ref(db), "articles")).then(snapshot => {
      if (snapshot.exists()) {
        setArticles(snapshot.val());
      }
    });
  }, []);

  return (
    <div>
      <h1>Kashurpedia</h1>
      <Link href="/submit">Submit New Article</Link>
      <hr />
      {Object.keys(articles).map(category => (
        <div key={category}>
          <h2>{category}</h2>
          <ul>
            {Object.entries(articles[category]).map(([id, data]) => (
              <li key={id}>
                <Link href={`/article/${id}`}>{data.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
