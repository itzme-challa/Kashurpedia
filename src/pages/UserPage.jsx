// UserPage.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { database } from '../firebase/config';

function UserPage() {
  const { userId } = useParams();
  const [userArticles, setUserArticles] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user's articles
        const articlesRef = ref(database, 'articles');
        const snapshot = await get(articlesRef);
        
        if (snapshot.exists()) {
          const articles = Object.values(snapshot.val());
          const userArticles = articles.filter(article => article.author.id === userId);
          setUserArticles(userArticles);
          
          // Get user info from first article (if exists)
          if (userArticles.length > 0) {
            setUserInfo({
              name: userArticles[0].author.name,
              articleCount: userArticles.length
            });
          }
        }
      } catch (err) {
        setError('Failed to load user data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-page">
      {userInfo ? (
        <>
          <h1>{userInfo.name}</h1>
          <p>Has contributed to {userInfo.articleCount} articles</p>
          
          <h2>Contributions</h2>
          <ul>
            {userArticles.map((article) => (
              <li key={article.title}>
                <a href={`/article/${encodeURIComponent(article.title)}`}>
                  {article.title}
                </a>
                <span> - Last edited {new Date(article.lastEdited).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No user data found</p>
      )}
    </div>
  );
}

export default UserPage;
