import { useState } from "react";
import { useRouter } from "next/router";
import { db, auth } from "../utils/firebase";
import { ref, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import Layout from "../components/Layout";

export default function Submit() {
  const [user] = useAuthState(auth);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = Date.now().toString();
      await set(ref(db, `articles/${category}/${id}`), {
        title,
        content,
        category,
        userId: user.uid,
        username: user.displayName,
        timestamp: Date.now(),
        versions: []
      });
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="wiki-content">
          <p>Please <a href="/auth/login">log in</a> to submit an article.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="wiki-content">
        <h1>Submit a new article</h1>
        {error && <div className="error-message" style={{color: 'red'}}>{error}</div>}
        <form onSubmit={handleSubmit} className="wiki-form">
          <div>
            <label htmlFor="title">Article Title:</label>
            <input
              id="title"
              type="text"
              placeholder="Enter article title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="General">General</option>
              <option value="History">History</option>
              <option value="Culture">Culture</option>
              <option value="Language">Language</option>
              <option value="People">People</option>
              <option value="Geography">Geography</option>
            </select>
          </div>
          <div>
            <label htmlFor="content">Article Content:</label>
            <textarea
              id="content"
              placeholder="Enter the article content (Markdown supported)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit Article</button>
        </form>
      </div>
    </Layout>
  );
}
