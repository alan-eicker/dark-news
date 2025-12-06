import NewsCard from './NewsCard';
import FeaturedNews from './FeaturedNews';
import styles from './NewsGrid.module.css';
import { useMemo } from 'react';

const NewsGrid = ({ title, stories }) => {
  // Memoize the random selection so it doesn't change on every re-render unless stories change
  const { featuredStory, otherStories } = useMemo(() => {
    if (!stories || stories.length === 0) return { featuredStory: null, otherStories: [] };
    
    const featured = stories[0];
    const others = stories.slice(1);
    
    return { featuredStory: featured, otherStories: others };
  }, [stories]);

  if (!stories || stories.length === 0) return null;

  return (
    <section>
      <h2 className={styles.sectionTitle}>{title}</h2>
      
      {featuredStory && <FeaturedNews news={featuredStory} />}
      
      <div className={styles.grid}>
        {otherStories.map(story => (
          <NewsCard key={story.id} news={story} />
        ))}
      </div>
    </section>
  );
};

export default NewsGrid;
