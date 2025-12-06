import Header from './Header';
import styles from './Layout.module.css';

const Layout = ({ children, searchTerm, onSearch, category, onCategoryChange }) => {
  return (
    <div className={styles.layout}>
      <Header 
        searchTerm={searchTerm} 
        onSearch={onSearch} 
        category={category}
        onCategoryChange={onCategoryChange}
      />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
