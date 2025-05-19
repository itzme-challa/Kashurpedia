import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, get, set } from 'firebase/database';
import { database, auth } from '../firebase/config';

function EditorPage({ user, mode }) {
  const { title } = useParams();
  const navigate = useNavigate();
  const [formTitle, setFormTitle] = useState(mode === 'edit' ? decodeURIComponent(title) : '');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(mode === 'edit');

  useEffect(() => {
    if (mode === 'edit' && title) {
      const fetchArticle = async () => {
        try {
          console.log('EditorPage: Fetching article', title);
          const articleRef = ref(database, `articles/${encodeURIComponent(title)}`);
          const snapshot = await get(articleRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            setFormTitle(data.title);
            setContent(data.content);
          } else {
            setError('Article not found');
          }
        } catch (err) {
          console.error('EditorPage: Fetch error', err);
          setError('Failed to load article');
        } finally {
          setLoading(false);
        }
      };
      fetchArticle();
    }
  }, [title, mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in');
      return;
    }
    if (!formTitle.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      console.log('EditorPage: Saving article', formTitle);
      const articleRef = ref(database, `articles/${encodeURIComponent(formTitle)}`);
      await set(articleRef, {
        title: formTitle,
        content,
        lastEdited: new Date().toISOString(),
        author: { id: user.uid, email: user.email }
      });
      navigate(`/article/${encodeURIComponent(formTitle)}`);
    } catch (err) {
      console.error('EditorPage: Save error', err);
      setError('Failed to save article');
    }
  };

  if (!user) return <div className="error">Please log in to {mode} articles</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="editor">
      <h1>{mode === 'create' ? 'Create Article' : 'Edit Article'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            disabled={mode === 'edit'}
          />
        </div>
        <div className="form-group">
          <label>Content (Markdown supported)</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditorPage;
