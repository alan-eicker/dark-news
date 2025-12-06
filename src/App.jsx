import { useState } from 'react';
import Layout from './components/layout/Layout';
import NewsGrid from './components/news/NewsGrid';
import { useNews } from './hooks/useNews';

function App() {
  const [category, setCategory] = useState('topstories');
  const { news, loading, error } = useNews(category);
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
    >
      {loading && <div style={{textAlign: 'center', padding: '2rem'}}>Loading latest stories...</div>}
      
      {error && <div style={{textAlign: 'center', color: 'red', padding: '2rem'}}>{error}</div>}
      
      {!loading && !error && (
        <NewsGrid 
          title={searchTerm ? `Search Results: "${searchTerm}"` : "Latest Stories"} 
          stories={filteredNews} 
        />
      )}
      
      {!loading && !error && filteredNews.length === 0 && (
        <div style={{textAlign: 'center', padding: '4rem', color: '#666'}}>
          No stories found matching your search.
        </div>
      )}
    </Layout>
  );
}

export default App;
