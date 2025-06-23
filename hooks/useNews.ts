import { useState, useEffect } from 'react';
import axios from 'axios';
import { NEWS_API_KEY, BASE_URL } from '../constants/config';

export const useNews = (category?: string) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const url = `${BASE_URL}/top-headlines?country=us${category ? `&category=${category}` : ''}&apiKey=${NEWS_API_KEY}`;
      console.log('Fetching news for category:', category);
      console.log('URL:', url);

      const res = await axios.get(url);
      setArticles(res.data.articles);
    } catch (error: any) {
      console.error('Fetch news error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [category]);

  return { articles, loading, refresh: fetchNews };
};
