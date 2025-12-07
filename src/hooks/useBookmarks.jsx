import { createContext, useContext, useState, useEffect, useRef } from 'react';

const BookmarksContext = createContext();

const STORAGE_KEY = 'darkNewsBookmarks';

export const BookmarksProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const isInitialMount = useRef(true);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  }, []);

  // Save bookmarks to localStorage whenever they change (skip initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Error saving bookmarks:', error);
    }
  }, [bookmarks]);

  // Toggle bookmark for an article
  const toggleBookmark = (article) => {
    setBookmarks((prevBookmarks) => {
      const isBookmarked = prevBookmarks.some((b) => b.id === article.id);
      
      if (isBookmarked) {
        // Remove bookmark
        return prevBookmarks.filter((b) => b.id !== article.id);
      } else {
        // Add bookmark
        return [...prevBookmarks, {
          id: article.id,
          title: article.title,
          url: article.url,
          author: article.author,
          score: article.score,
          time: article.time,
          imageUrl: article.imageUrl,
          bookmarkedAt: Date.now()
        }];
      }
    });
  };

  // Check if an article is bookmarked
  const isBookmarked = (articleId) => {
    return bookmarks.some((b) => b.id === articleId);
  };

  // Clear all bookmarks
  const clearBookmarks = () => {
    setBookmarks([]);
  };

  const value = {
    bookmarks,
    toggleBookmark,
    isBookmarked,
    clearBookmarks
  };

  return (
    <BookmarksContext.Provider value={value}>
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
};
