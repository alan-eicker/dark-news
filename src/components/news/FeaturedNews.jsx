import styles from './FeaturedNews.module.css';
import { ArrowUpCircle, Clock, ExternalLink, ArrowRight, Share2, Bookmark } from 'lucide-react';
import { useBookmarks } from '../../hooks/useBookmarks.jsx';

const FeaturedNews = ({ news }) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(news?.id);
  
  if (!news) return null;

  const timeAgo = (unixTime) => {
    const date = new Date(unixTime * 1000);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleShare = async () => {
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
      navigator.clipboard.writeText(news.url);
      alert('Link copied to clipboard!');
    }
  };

  const handleBookmark = () => {
    toggleBookmark(news);
  };

  return (
    <article className={styles.hero}>
      <img src={news.imageUrl} alt={news.title} className={styles.bgImage} />
      
      <div className={styles.content}>
        <div className={styles.contentInner}>
          <span className={styles.tag}>Featured Story</span>
        
          <h2 className={styles.title}>{news.title}</h2>
          
          <div className={styles.meta}>
            <div className={styles.author}>
              <span>by {news.author}</span>
            </div>
            <div className={styles.time}>
              <Clock size={16} />
              {timeAgo(news.time)}
            </div>
            <div className={styles.score}>
              <ArrowUpCircle size={16} color="var(--color-accent)" />
              {news.score} points
            </div>
          </div>

          <div className={styles.actions}>
            <a href={news.url} target="_blank" rel="noopener noreferrer" className={styles.cta}>
              Read Full Story <ArrowRight size={18} />
            </a>
            <button 
              className={`${styles.actionBtn} ${bookmarked ? styles.bookmarked : ''}`} 
              onClick={handleBookmark} 
              title={bookmarked ? "Remove bookmark" : "Bookmark story"}
            >
              <Bookmark size={24} fill={bookmarked ? "currentColor" : "none"} />
            </button>
            <button className={styles.actionBtn} onClick={handleShare} title="Share story">
              <Share2 size={24} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeaturedNews;
