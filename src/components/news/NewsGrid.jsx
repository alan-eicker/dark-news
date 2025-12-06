import NewsCard from './NewsCard';
import FeaturedNews from './FeaturedNews';
import styles from './NewsGrid.module.css';
import { useMemo, useRef } from 'react';

const NewsGrid = ({ title, stories }) => {
  // Memoize the random selection so it doesn't change on every re-render unless stories change
  const featuredStoryRef = useRef(null);
  
  const { featuredStory, otherStories } = useMemo(() => {
    if (!stories || stories.length === 0) {
      featuredStoryRef.current = null;
      return { featuredStory: null, otherStories: [] };
    }
    
    // Try to keep the same featured story if it's still in the list
    let featured = stories.find(s => s.id === featuredStoryRef.current?.id);
    
    if (!featured) {
      // Pick a new random one if we don't have one or the old one is gone
      const randomIndex = Math.floor(Math.random() * stories.length);
      featured = stories[randomIndex];
      featuredStoryRef.current = featured;
    }
    
    const others = stories.filter(s => s.id !== featured.id);
    
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
