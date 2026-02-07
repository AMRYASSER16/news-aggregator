import axios from 'axios';
import { Article, FilterOptions } from '../types';

const NEWS_API_BASE_URL = 'https://newsapi.org/v2';
const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY || '';

export const getNewsApiArticles = async (filters: FilterOptions = {}): Promise<Article[]> => {
  try {
    const params: any = {
      apiKey: NEWS_API_KEY,
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: filters.keyword ? 50 : 20,
    };

    if (filters.keyword) {
      params.q = filters.keyword;
    }
    if (filters.category) {
      params.category = filters.category;
    }
    if (filters.source && !['newsapi', 'guardian', 'nytimes'].includes(filters.source)) {
      params.sources = filters.source;
    }
    if (filters.dateFrom) {
      const dateFrom = filters.dateFrom.includes('T') 
        ? filters.dateFrom 
        : `${filters.dateFrom}T00:00:00`;
      params.from = dateFrom;
    }
    if (filters.dateTo) {
      const dateTo = filters.dateTo.includes('T') 
        ? filters.dateTo 
        : `${filters.dateTo}T23:59:59`;
      params.to = dateTo;
    }

    const endpoint = (filters.keyword || filters.dateFrom || filters.dateTo || params.sources) 
      ? '/everything' 
      : '/top-headlines';
    const response = await axios.get(`${NEWS_API_BASE_URL}${endpoint}`, { params });

    return response.data.articles.map((article: any, index: number) => ({
      id: `newsapi-${index}-${Date.now()}`,
      title: article.title || '',
      description: article.description || '',
      content: article.content,
      url: article.url,
      imageUrl: article.urlToImage,
      publishedAt: article.publishedAt,
      source: article.source?.name || 'NewsAPI',
      author: article.author,
      category: filters.category,
    }));
  } catch (error) {
    console.error('NewsAPI error:', error);
    return [];
  }
};
