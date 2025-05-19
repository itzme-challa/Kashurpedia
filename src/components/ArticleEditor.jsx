import React from 'react'; // Added
import { useState } from 'react';
import { ref, get } from 'firebase/database';
import { database, auth } from '../firebase/config';

function ArticleEditor({ initialTitle = '', initialContent = '', onSave }) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      setIsLoading(false);
      return;
    }

    if (!content.trim()) {
      setError('Content is required');
      setIsLoading(false);
      return;
    }

    try {
      const articleRef = ref(database, `articles/${encodeURIComponent(title)}`);
      const snapshot = await get(articleRef);

      if (snapshot.exists() && initialTitle !== title) {
        setError('An article with this title already exists');
        setIsLoading(false);
        return;
      }

      await onSave({
        title,
        content,
        lastEdited: new Date().toISOString(),
        author: {
          id: auth.currentUser.uid,
          name: auth.currentUser.displayName || auth.currentUser.email
        }
      });
    } catch (err) {
      setError('Failed to save article: ' + err.message);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="article-editor">
      {error && <div className="error">{error}</div>}
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={!!initialTitle}
        />
      </div>
      <div className="form-group">
        <label>Content (Markdown supported)</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={20}
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}

export default ArticleEditor;
