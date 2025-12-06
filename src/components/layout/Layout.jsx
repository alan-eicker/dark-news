import Footer from './Footer';
import Header from './Header';
import styles from './Layout.module.css';

const Layout = ({ children, searchTerm, onSearch, category, onCategoryChange, breakingNews }) => {
  return (
    <div className={styles.layout}>
      <Header 
        searchTerm={searchTerm} 
        onSearch={onSearch} 
        category={category}
        onCategoryChange={onCategoryChange}
        breakingNews={breakingNews}
      />
      <main className={styles.mainContent}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
