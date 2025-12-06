import { useState, useEffect, useRef, useCallback } from 'react';
import Layout from './components/layout/Layout';
import NewsGrid from './components/news/NewsGrid';
import { useNews } from './hooks/useNews';

function App() {
  const [category, setCategory] = useState('topstories');
  const { news, loading, error, hasMore, loadMore } = useNews(category);
  const observer = useRef();

  const lastElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNews = news.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout 
      searchTerm={searchTerm} 
      onSearch={setSearchTerm}
      category={category}
      onCategoryChange={setCategory}
      breakingNews={news.length > 0 ? news[0] : null}
    >
      {loading && news.length === 0 && <div style={{textAlign: 'center', padding: '2rem'}}>Loading latest stories...</div>}
      
      {error && <div style={{textAlign: 'center', color: 'red', padding: '2rem'}}>{error}</div>}
      
      {!error && (
        <>
          <NewsGrid 
            title={searchTerm ? `Search Results: "${searchTerm}"` : "Latest Stories"} 
            stories={filteredNews} 
          />
          
          {/* Intersection observer sentinel */}
          {!searchTerm && <div ref={lastElementRef} style={{ height: '20px', margin: '20px 0' }} />}
          
          {loading && news.length > 0 && (
            <div style={{textAlign: 'center', padding: '1rem', color: '#666'}}>
              Loading more stories...
            </div>
          )}
          
          {!hasMore && news.length > 0 && !searchTerm && (
             <div style={{textAlign: 'center', padding: '2rem', color: '#666'}}>
                You've reached the end!
             </div>
          )}
        </>
      )}
      
      {!loading && !error && filteredNews.length === 0 && news.length > 0 && (
        <div style={{textAlign: 'center', padding: '4rem', color: '#666'}}>
          No stories found matching your search.
        </div>
      )}
    </Layout>
  );
}

export default App;
