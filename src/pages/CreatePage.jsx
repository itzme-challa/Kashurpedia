import React from 'react'; // Added
import { useNavigate } from 'react-router-dom';
import { ref, set } from 'firebase/database';
import { database } from '../firebase/config';
import ArticleEditor from '../components/ArticleEditor';

function CreatePage() {
  const navigate = useNavigate();

  const handleSave = async (articleData) => {
    const articleRef = ref(database, `articles/${encodeURIComponent(articleData.title)}`);
    await set(articleRef, articleData);
    navigate(`/article/${encodeURIComponent(articleData.title)}`);
  };

  return (
    <div className="create-page">
      <h1>Create New Article</h1>
      <ArticleEditor onSave={handleSave} />
    </div>
  );
}

export default CreatePage;
