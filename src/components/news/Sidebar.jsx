import styles from './Sidebar.module.css';
import CompactNewsCard from './CompactNewsCard';
import { TrendingUp } from 'lucide-react';

const Sidebar = ({ stories }) => {
  if (!stories || stories.length === 0) return null;

  // Take top 5 stories
  const topStories = stories.slice(0, 5);

  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.title}>
        <TrendingUp size={18} color="var(--color-accent)" />
        Top Stories
      </h3>
      
      <div className={styles.list}>
        {topStories.map(story => (
          <CompactNewsCard key={story.id} news={story} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
