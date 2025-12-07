import styles from './NewsCard.module.css';
import { ExternalLink, ArrowUpCircle, Share2, Bookmark } from 'lucide-react';
import { useBookmarks } from '../../hooks/useBookmarks.jsx';

const NewsCard = ({ news }) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(news.id);
  
  // Mock category for visual flair
  const category = "Technology"; 

  // Format date relative (simple version)
  const timeAgo = (unixTime) => {
    const date = new Date(unixTime * 1000);
    return date.toLocaleDateString();
  };

  const handleShare = async (e) => {
    e.preventDefault(); // Prevent clicking parent link if any
    if (navigator.share) {
      try {
        await navigator.share({
          title: news.title,
          text: `Check out this story: ${news.title}`,
          url: news.url
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback
      navigator.clipboard.writeText(news.url);
      alert('Link copied to clipboard!');
    }
  };

  const handleBookmark = (e) => {
    e.preventDefault();
    toggleBookmark(news);
  };

  return (
    <article className={styles.card}>
      <a href={news.url} target="_blank" rel="noopener noreferrer" className={styles.imageContainer}>
        <img src={news.imageUrl} alt={news.title} className={styles.image} loading="lazy" />
      </a>
      
      <div className={styles.content}>
        <span className={styles.tag}>{category}</span>
        
        <a href={news.url} target="_blank" rel="noopener noreferrer" className={styles.title}>
          {news.title}
        </a>
        
        <div className={styles.footer}>
          <span className={styles.author}>by {news.author}</span>
          <div className={styles.meta}>
            <div className={styles.score}>
              <ArrowUpCircle size={14} color="var(--color-accent)" />
              {news.score}
            </div>
            <button 
              className={`${styles.iconButton} ${bookmarked ? styles.bookmarked : ''}`} 
              onClick={handleBookmark} 
              title={bookmarked ? "Remove bookmark" : "Bookmark story"}
            >
              <Bookmark size={16} fill={bookmarked ? "currentColor" : "none"} />
            </button>
            <button className={styles.iconButton} onClick={handleShare} title="Share story">
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
