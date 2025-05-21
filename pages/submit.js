import { useState } from "react";
import { useRouter } from "next/router";
import { db, auth } from "../utils/firebase";
import { ref, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import NavBar from "../components/NavBar";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function Submit() {
  const [user] = useAuthState(auth);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    if (!title || title.length < 3) {
      setError("Title must be at least 3 characters.");
      return false;
    }
    if (!content || content === "<p><br></p>") {
      setError("Content cannot be empty.");
      return false;
    }
    if (!category) {
      setError("Category is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setError("");
    if (!validateForm()) return;
    setLoading(true);
    try {
      const id = Date.now().toString();
      await set(ref(db, `articles/${category}/${id}`), {
        title,
        content,
        category,
        userId: user.uid,
        username: user.displayName,
        timestamp: Date.now(),
        versions: [],
      });
      router.push("/");
    } catch (err) {
      setError("Failed to submit article. Please try again.");
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container min-h-screen">
        <NavBar />
        <p className="text-gray-600 mt-8">
          Please{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            log in
          </Link>{" "}
          to submit an article.
        </p>
      </div>
    );
  }

  return (
    <div className="container min-h-screen">
      <NavBar />
      <div className="max-w-3xl mx-auto mt-8">
        <h1>Submit a New Article</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Article Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1"
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium">
              Content
            </label>
            <ReactQuill
              id="content"
              value={content}
              onChange={setContent}
              className="mt-1 bg-white"
              theme="snow"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium">
              Category
            </label>
            <input
              id="category"
              type="text"
              placeholder="Category (e.g., History, Culture)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1"
              aria-required="true"
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Submitting..." : "Submit Article"}
          </button>
        </form>
      </div>
    </div>
  );
}
