import { useState, useEffect, useCallback } from 'react';
import { Article, FilterOptions, UserPreferences } from '../types';
import { getArticles } from '../services/newsAggregator';

export const useNews = (
  filters: FilterOptions = {},
  preferences?: UserPreferences
) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedArticles = await getArticles(filters, preferences);
      setArticles(fetchedArticles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch articles');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [filters, preferences]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return { articles, loading, error };
};
