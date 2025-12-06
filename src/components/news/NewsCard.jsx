import styles from './NewsCard.module.css';
import { ExternalLink, ArrowUpCircle } from 'lucide-react';

const NewsCard = ({ news }) => {
  // Mock category for visual flair
  const category = "Technology"; 

  // Format date relative (simple version)
  const timeAgo = (unixTime) => {
    const date = new Date(unixTime * 1000);
    return date.toLocaleDateString();
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
          <div className={styles.score}>
            <ArrowUpCircle size={14} color="var(--color-accent)" />
            {news.score}
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
