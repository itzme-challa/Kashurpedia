import React from 'react'; // Added
import { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../firebase/config';
import { Link } from 'react-router-dom';

function HomePage() {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [recentArticles, setRecentArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesRef = ref(database, 'articles');
        const snapshot = await get(articlesRef);
        
        if (snapshot.exists()) {
          const articles = Object.values(snapshot.val());
          const sorted = articles.sort((a, b) => 
            new Date(b.lastEdited) - new Date(a.lastEdited));
          setFeaturedArticles(sorted.slice(0, 3));
          setRecentArticles(sorted.slice(0, 10));
        }
      } catch (err) {
        console.error('Failed to load articles: ', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="home-page">
      <section className="featured">
        <h2>Featured Articles</h2>
        <div className="article-grid">
          {featuredArticles.map((article) => (
            <div key={article.title} className="featured-card">
              <Link to={`/article/${encodeURIComponent(article.title)}`}>
                <h3>{article.title}</h3>
                <p>{article.content.substring(0, 150)}...</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className="recent">
        <h2>Recently Edited</h2>
        <ul>
          {recentArticles.map((article) => (
            <li key={article.title}>
              <Link to={`/article/${encodeURIComponent(article.title)}`}>
                {article.title}
              </Link>
              <span> - Edited {new Date(article.lastEdited).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default HomePage;
