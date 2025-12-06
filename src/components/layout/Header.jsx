import { Search, Globe } from 'lucide-react';
import styles from './Header.module.css';

const Header = ({ searchTerm, onSearch, category, onCategoryChange, breakingNews }) => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.mainHeader}>
        <a href="/" className={styles.logo}>
          <Globe size={24} color="var(--color-accent)" />
          Dark<span>News</span>
        </a>
        
        <div className={styles.searchContainer}>
          <select 
            className={styles.categorySelect}
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="topstories">Top Stories</option>
            <option value="newstories">New Stories</option>
            <option value="beststories">Best Stories</option>
            <option value="askstories">Ask HN</option>
            <option value="showstories">Show HN</option>
            <option value="jobstories">Jobs</option>
          </select>

          <Search className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search news..." 
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
      
      <div className={styles.breakingNewsBar}>
        <div className={styles.breakingLabel}>
          Breaking News
        </div>
        <div className={styles.tickerText}>
          {breakingNews ? breakingNews.title : "Loading latest updates..."}
        </div>
      </div>
    </header>
  );
};

export default Header;
