import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { database } from '../firebase/config';
import Article from '../components/Article';
import { Helmet } from 'react-helmet-async'; // Add react-helmet-async for SEO

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

  return (
    <>
      <Helmet>
        <title>{article.title} - Kashurpedia</title>
        <meta name="description" content={article.content.substring(0, 160)} />
        <meta name="keywords" content={`${article.title}, Kashurpedia, wiki, knowledge`} />
        <meta property="og:title" content={`${article.title} - Kashurpedia`} />
        <meta property="og:description" content={article.content.substring(0, 160)} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://kashurpedia.com/article/${encodeURIComponent(title)}`} />
      </Helmet>
      <Article {...article} />
    </>
  );
}

export default ArticlePage;
