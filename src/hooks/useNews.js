import { useState, useEffect } from 'react';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export const useNews = (category = 'topstories') => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // 1. Get IDs
        const response = await fetch(`${BASE_URL}/${category}.json`);
        const ids = await response.json();
        
        // 2. Fetch details for top 100
        const topIds = ids.slice(0, 100);
        
        const storyPromises = topIds.map(id => 
          fetch(`${BASE_URL}/item/${id}.json`).then(res => res.json())
        );
        
        const stories = await Promise.all(storyPromises);
        
        // 3. Map to our format
        const mappedStories = stories
          .filter(story => story && story.url) // Only show stories with URLs (ignore generic text posts for now if preferred, or keep them)
          .map(story => ({
            id: story.id,
            title: story.title,
            url: story.url,
            author: story.by,
            score: story.score,
            time: story.time,
            domain: new URL(story.url).hostname.replace('www.', ''),
            // Placeholder image based on ID parity/hash to be deterministic but varied
            imageUrl: `https://picsum.photos/seed/${story.id}/600/400`
          }));

        setNews(mappedStories);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news stories.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  return { news, loading, error };
};
