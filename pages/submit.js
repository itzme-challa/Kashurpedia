import { useState } from "react";
import { db, ref, set } from "../utils/firebase";
import { useRouter } from "next/router";

export default function Submit() {
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
      timestamp: Date.now()
    });
    router.push("/");
  };

  return (
    <div>
      <h1>Submit Article</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Content (use HTML)"
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={10}
        cols={50}
      />
      <br />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
