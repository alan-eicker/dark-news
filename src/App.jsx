import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Subscribe from './pages/Subscribe';
import Bookmarks from './pages/Bookmarks';
import { useNews } from './hooks/useNews';
import './App.css';

function App() {
  // Read initial state from URL query parameters
  const getInitialCategory = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('category') || 'topstories';
  };

  const getInitialSearchTerm = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('search') || '';
  };

  const [category, setCategory] = useState(getInitialCategory);
  const [searchTerm, setSearchTerm] = useState(getInitialSearchTerm);
  const { news } = useNews(category);

  // Update URL when category or search term changes
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (category !== 'topstories') {
      params.set('category', category);
    }
    
    if (searchTerm) {
      params.set('search', searchTerm);
    }
    
    const newUrl = params.toString() 
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    
    window.history.replaceState({}, '', newUrl);
  }, [category, searchTerm]);

  return (
    <Routes>
      <Route path="/" element={
        <Layout 
          searchTerm={searchTerm} 
          onSearch={setSearchTerm}
          category={category}
          onCategoryChange={setCategory}
          breakingNews={news.length > 0 ? news[0] : null}
        >
          <Home searchTerm={searchTerm} category={category} />
        </Layout>
      } />
      <Route path="/subscribe" element={<Subscribe />} />
      <Route path="/bookmarks" element={
        <Layout 
          searchTerm={searchTerm} 
          onSearch={setSearchTerm}
          category={category}
          onCategoryChange={setCategory}
          breakingNews={news.length > 0 ? news[0] : null}
        >
          <Bookmarks />
        </Layout>
      } />
    </Routes>
  );
}

export default App;
