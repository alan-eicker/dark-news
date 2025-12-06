import { useState, useEffect } from 'react';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';
const ITEMS_PER_PAGE = 20;

export const useNews = (category = 'topstories') => {
  const [news, setNews] = useState([]);
  const [storyIds, setStoryIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchIds = async () => {
      try {
        setLoading(true);
        setNews([]);
        setPage(0);
        setHasMore(true);
        
        const response = await fetch(`${BASE_URL}/${category}.json`);
        const ids = await response.json();
        setStoryIds(ids || []);
      } catch (err) {
        console.error('Error fetching story IDs:', err);
        setError('Failed to load news stories.');
        setLoading(false);
      }
    };

    fetchIds();
  }, [category]);

  useEffect(() => {
    if (storyIds.length === 0) return;

    let ignore = false;

    const fetchStories = async () => {
      try {
        setLoading(true);
        
        const start = page * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        const currentIds = storyIds.slice(start, end);
        
        if (currentIds.length === 0) {
          if (!ignore) {
            setHasMore(false);
            setLoading(false);
          }
          return;
        }

        const storyPromises = currentIds.map(id => 
          fetch(`${BASE_URL}/item/${id}.json`).then(res => res.json())
        );
        
        const stories = await Promise.all(storyPromises);
        
        if (!ignore) {
          const mappedStories = stories
            .filter(story => story && story.url)
            .map(story => ({
              id: story.id,
              title: story.title,
              url: story.url,
              author: story.by,
              score: story.score,
              time: story.time,
              domain: new URL(story.url).hostname.replace('www.', ''),
              imageUrl: `https://picsum.photos/seed/${story.id}/600/400`
            }));

          setNews(prev => [...prev, ...mappedStories]);
          
          if (end >= storyIds.length) {
            setHasMore(false);
          }
        }
      } catch (err) {
        if (!ignore) {
          console.error('Error fetching stories:', err);
          setError('Failed to load stories.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchStories();

    return () => {
      ignore = true;
    };
  }, [storyIds, page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return { news, loading, error, hasMore, loadMore };
};
