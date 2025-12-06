import styles from './CompactNewsCard.module.css';
import { ArrowUpCircle } from 'lucide-react';

const CompactNewsCard = ({ news }) => {
  return (
    <article className={styles.card}>
      <a href={news.url} target="_blank" rel="noopener noreferrer" className={styles.imageContainer}>
        <img src={news.imageUrl} alt={news.title} className={styles.image} loading="lazy" />
      </a>
      
      <div className={styles.content}>
        <a href={news.url} target="_blank" rel="noopener noreferrer" className={styles.title}>
          {news.title}
        </a>
        
        <div className={styles.meta}>
          <div className={styles.score}>
            <ArrowUpCircle size={12} color="var(--color-accent)" />
            {news.score}
          </div>
          <span>•</span>
          <span>{news.author}</span>
        </div>
      </div>
    </article>
  );
};

export default CompactNewsCard;
