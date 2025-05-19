import { useState, useEffect } from 'react'; // Added missing imports
import { useParams, useNavigate } from 'react-router-dom';
import { ref, get, set } from 'firebase/database';
import { database, auth } from '../firebase/config';
import ArticleEditor from '../components/ArticleEditor';

function EditPage() {
  const { title } = useParams();
  const navigate = useNavigate();
  const [initialArticle, setInitialArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleRef = ref(database, `articles/${encodeURIComponent(title)}`);
        const snapshot = await get(articleRef);
        
        if (snapshot.exists()) {
          setInitialArticle(snapshot.val());
        } else {
          setError('Article not found');
        }
      } catch (err) {
        setError('Failed to load article: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [title]);

  const handleSave = async (articleData) => {
    try {
      const articleRef = ref(database, `articles/${encodeURIComponent(articleData.title)}`);
      await set(articleRef, articleData);
      navigate(`/article/${encodeURIComponent(articleData.title)}`);
    } catch (err) {
      setError('Failed to save article: ' + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!initialArticle) return <div>Article not found</div>;

  return (
    <div className="edit-page">
      <h1>Edit Article</h1>
      <ArticleEditor
        initialTitle={initialArticle.title}
        initialContent={initialArticle.content}
        onSave={handleSave}
      />
    </div>
  );
}

export default EditPage;
