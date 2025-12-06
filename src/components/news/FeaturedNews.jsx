import styles from './FeaturedNews.module.css';
import { ArrowUpCircle, Clock, ExternalLink, ArrowRight, Share2 } from 'lucide-react';

const FeaturedNews = ({ news }) => {
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

  return (
    <article className={styles.hero}>
      <img src={news.imageUrl} alt={news.title} className={styles.bgImage} />
      
      <div className={styles.content}>
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
          <button className={styles.shareBtn} onClick={handleShare} title="Share story">
            <Share2 size={24} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default FeaturedNews;
