import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { database } from '../firebase/config';
import Article from '../components/Article';

function ArticlePage({ user }) {
  const { title } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        console.log('ArticlePage: Fetching article', title);
        const articleRef = ref(database, `articles/${encodeURIComponent(title)}`);
        const snapshot = await get(articleRef);
        if (snapshot.exists()) {
          setArticle(snapshot.val());
        } else {
          setError('Article not found');
        }
      } catch (err) {
        console.error('ArticlePage: Fetch error', err);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [title]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return <Article {...article} user={user} title={title} />;
}

export default ArticlePage;
