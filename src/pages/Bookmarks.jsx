import { useBookmarks } from '../hooks/useBookmarks.jsx';
import NewsGrid from '../components/news/NewsGrid';
import styles from './Bookmarks.module.css';

const Bookmarks = () => {
  const { bookmarks } = useBookmarks();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Bookmarked Articles</h1>
        <span className={styles.count}>{bookmarks.length} {bookmarks.length === 1 ? 'article' : 'articles'}</span>
      </div>

      {bookmarks.length > 0 ? (
        <ul className={styles.bookmarksList}>
          {bookmarks.map((bookmark) => (
            <li key={bookmark.id}>
              <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                {bookmark.title}
              </a>
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
