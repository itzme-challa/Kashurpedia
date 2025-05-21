import { useState } from "react";
import { useRouter } from "next/router";
import { db, auth } from "../utils/firebase";
import { ref, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import NavBar from "../components/NavBar";

export default function Submit() {
  const [user] = useAuthState(auth);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const router = useRouter();

  const handleSubmit = async () => {
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
  };

  if (!user) {
    return (
      <div>
        <NavBar />
        <p>Please log in to submit an article.</p>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <h1>Submit Article</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Content (HTML supported)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        cols={50}
      />
      <br />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
