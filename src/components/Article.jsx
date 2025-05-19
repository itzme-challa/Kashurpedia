import { Link } from 'react-router-dom';
import { auth } from '../firebase/config';
import { marked } from 'marked'; // Add marked for Markdown rendering

function Article({ title, content, lastEdited, author }) {
  const canEdit = auth.currentUser && 
    (auth.currentUser.uid === author.id || auth.currentUser.isAdmin);

  // Configure marked for safe rendering
  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  const renderedContent = marked(content);

  return (
    <div className="article">
      <h1>{title}</h1>
      <div className="article-meta">
        <span>Last edited on {new Date(lastEdited).toLocaleDateString()}</span>
        <Link to={`/user/${author.id}`}>{author.name}</Link>
      </div>
      <div className="article-content" dangerouslySetInnerHTML={{ __html: renderedContent }} />
      {canEdit && (
        <Link to={`/edit/${encodeURIComponent(title)}`} className="edit-button">
          Edit
        </Link>
      )}
    </div>
  );
}

export default Article;
