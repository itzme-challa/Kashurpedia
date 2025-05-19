// ArticlePage.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { database } from '../firebase/config';
import Article from '../components/Article';

function ArticlePage() {
  const { title } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleRef = ref(database, `articles/${encodeURIComponent(title)}`);
        const snapshot = await get(articleRef);
        
        if (snapshot.exists()) {
          setArticle(snapshot.val());
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!article) return <div>Article not found</div>;

  return <Article {...article} />;
}

export default ArticlePage;
