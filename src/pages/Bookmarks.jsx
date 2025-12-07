import { useBookmarks } from '../hooks/useBookmarks.jsx';
import { X } from 'lucide-react';
import styles from './Bookmarks.module.css';

const Bookmarks = () => {
  const { bookmarks, toggleBookmark } = useBookmarks();

  const handleRemove = (e, bookmark) => {
    e.preventDefault();
    toggleBookmark(bookmark);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Bookmarked Articles</h1>
        <span className={styles.count}>{bookmarks.length} {bookmarks.length === 1 ? 'article' : 'articles'}</span>
      </div>

      {bookmarks.length > 0 ? (
        <ul className={styles.bookmarksList}>
          {bookmarks.map((bookmark) => (
            <li key={bookmark.id} className={styles.bookmarkItem}>
              <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className={styles.bookmarkLink}>
                {bookmark.title}
              </a>
              <button 
                onClick={(e) => handleRemove(e, bookmark)}
                className={styles.removeButton}
                aria-label="Remove bookmark"
                title="Remove bookmark"
              >
                <X size={22} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📚</div>
          <h2>No bookmarks yet</h2>
          <p>Start bookmarking articles to read them later!</p>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
