// src/pages/EditPage.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, get, set } from 'firebase/database';
import { database } from '../firebase/config';
import ArticleEditor from '../components/ArticleEditor';

function EditPage() {
  const { title } = useParams(); // expects route like /edit/:title
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleRef = ref(database, `articles/${encodeURIComponent(title)}`);
        const snapshot = await get(articleRef);

        if (snapshot.exists()) {
          setInitialData(snapshot.val());
        } else {
          setLoadError('Article not found');
        }
      } catch (err) {
        setLoadError('Failed to load article: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [title]);

  const handleSave = async (updatedArticle) => {
    const articleRef = ref(database, `articles/${encodeURIComponent(title)}`);
    await set(articleRef, updatedArticle);
    navigate(`/article/${encodeURIComponent(title)}`);
  };

  if (loading) return <p>Loading article...</p>;
  if (loadError) return <p className="error">{loadError}</p>;

  return (
    <div className="edit-page">
      <h2>Edit Article</h2>
      <ArticleEditor
        initialTitle={title}
        initialContent={initialData?.content || ''}
        onSave={handleSave}
      />
    </div>
  );
}

export default EditPage;
