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
  const [category, setCategory] = useState("Anantnag");
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
 <option value="Anantnag">Anantnag</option>
<option value="Bandipora">Bandipora</option>
<option value="Baramulla">Baramulla</option>
<option value="Budgam">Budgam</option>
<option value="Doda">Doda</option>
<option value="Ganderbal">Ganderbal</option>
<option value="Jammu">Jammu</option>
<option value="Kathua">Kathua</option>
<option value="Kishtwar">Kishtwar</option>
<option value="Kulgam">Kulgam</option>
<option value="Kupwara">Kupwara</option>
<option value="Poonch">Poonch</option>
<option value="Pulwama">Pulwama</option>
<option value="Rajouri">Rajouri</option>
<option value="Ramban">Ramban</option>
<option value="Reasi">Reasi</option>
<option value="Samba">Samba</option>
<option value="Shopian">Shopian</option>
<option value="Srinagar">Srinagar</option>
<option value="Udhampur">Udhampur</option>
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
