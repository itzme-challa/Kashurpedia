import { Link } from 'react-router-dom';
import { marked } from 'marked';

function Article({ title, content, lastEdited, author, user }) {
  const canEdit = user && user.uid === author.id;
  const htmlContent = marked(content || '');

  return (
    <div className="article">
      <h1>{title}</h1>
      <div className="article-meta">
        <span>Last edited: {new Date(lastEdited).toLocaleDateString()}</span>
        <span> by {author.email}</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      {canEdit && <Link to={`/edit/${encodeURIComponent(title)}`}>Edit</Link>}
    </div>
  );
}

export default Article;
