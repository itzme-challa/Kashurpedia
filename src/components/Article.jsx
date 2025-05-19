import { Link } from 'react-router-dom';
import { auth } from '../firebase/config';

function Article({ title, content, lastEdited, author }) {
  const canEdit = auth.currentUser && 
    (auth.currentUser.uid === author.id || auth.currentUser.isAdmin);

  return (
    <div className="article">
      <h1>{title}</h1>
      <div className="article-meta">
        <span>Last edited on {new Date(lastEdited).toLocaleDateString()}</span>
        <Link to={`/user/${author.id}`}>{author.name}</Link>
      </div>
      <div className="article-content" dangerouslySetInnerHTML={{ __html: content }} />
      {canEdit && (
        <Link to={`/edit/${encodeURIComponent(title)}`} className="edit-button">
          Edit
        </Link>
      )}
    </div>
  );
}

export default Article;
