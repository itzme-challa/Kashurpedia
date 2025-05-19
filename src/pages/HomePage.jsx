import { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../firebase/config';
import { Link } from 'react-router-dom';

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        console.log('HomePage: Fetching articles');
        const articlesRef = ref(database, 'articles');
        const snapshot = await get(articlesRef);
        if (snapshot.exists()) {
          setArticles(Object.entries(snapshot.val()).map(([title, data]) => ({
            title,
            ...data
          })));
        }
        console.log('HomePage: Articles fetched');
      } catch (err) {
        console.error('HomePage: Fetch error', err);
        setError('Failed to load articles');
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="article-list">
      <h1>Village Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.title}>
            <Link to={`/article/${encodeURIComponent(article.title)}`}>
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
