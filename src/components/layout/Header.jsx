import { Search, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import UserProfile from './UserProfile';
import styles from './Header.module.css';

const Header = ({ searchTerm, onSearch, category, onCategoryChange, breakingNews, simplified = false }) => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.mainHeader}>
        <Link to="/" className={styles.logo}>
          <Globe size={24} color="var(--color-accent)" />
          Dark<span>News</span>
        </Link>
        
        {!simplified && (
          <div className={styles.searchWrapper}>
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
            
            <Link to="/subscribe" className={styles.subscribeBtn}>
              Subscribe
            </Link>
            
            <UserProfile />
          </div>
        )}
      </div>
      
      {!simplified && (
        <div className={styles.breakingNewsBar}>
          <div className={styles.breakingLabel}>
            Breaking News
          </div>
          {breakingNews ? (
            <a 
              href={breakingNews.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.tickerText}
            >
              {breakingNews.title}
            </a>
          ) : (
            <div className={styles.tickerText}>
              Loading latest updates...
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
