import axios from 'axios';
import { Article, FilterOptions } from '../types';

const NYTIMES_BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const NYTIMES_API_KEY = process.env.REACT_APP_NYTIMES_API_KEY || '';

const normalizeCategory = (category: string | undefined): string | undefined => {
  if (!category) return undefined;
  const normalized = category.toLowerCase().trim();
  const categoryMap: { [key: string]: string } = {
    'sports': 'sports',
    'business': 'business',
    'technology': 'technology',
    'health': 'health',
    'science': 'science',
    'arts': 'entertainment',
    'movies': 'entertainment',
    'theater': 'entertainment',
    'style': 'general',
    'world': 'general',
    'us': 'general',
    'opinion': 'general',
  };
  return categoryMap[normalized] || normalized;
};

export const getNYTimesArticles = async (filters: FilterOptions = {}): Promise<Article[]> => {
  try {
    const params: any = {
      'api-key': NYTIMES_API_KEY,
    };

    if (filters.keyword) {
      params.q = filters.keyword;
    }
    if (filters.category) {
      const categoryMap: { [key: string]: string } = {
        'business': 'Business',
        'sports': 'Sports',
        'technology': 'Technology',
        'health': 'Health',
        'science': 'Science',
        'entertainment': 'Arts',
      };
      const nytCategory = categoryMap[filters.category.toLowerCase()] || filters.category;
      params.fq = `news_desk:("${nytCategory}")`;
    }
    if (filters.dateFrom) {
      params.begin_date = filters.dateFrom.replace(/-/g, '');
    }
    if (filters.dateTo) {
      params.end_date = filters.dateTo.replace(/-/g, '');
    }

    const response = await axios.get(NYTIMES_BASE_URL, { params });

    return response.data.response.docs.map((article: any, index: number) => {
      const newsDesk = Array.isArray(article.news_desk) 
        ? article.news_desk[0] 
        : article.news_desk;
      
      return {
        id: `nytimes-${index}-${Date.now()}`,
        title: article.headline?.main || '',
        description: article.abstract || '',
        content: article.lead_paragraph,
        url: article.web_url,
        imageUrl: article.multimedia?.[0] 
          ? `https://www.nytimes.com/${article.multimedia[0].url}`
          : undefined,
        publishedAt: article.pub_date,
        source: 'The New York Times',
        author: article.byline?.original,
        category: normalizeCategory(newsDesk),
      };
    });
  } catch (error) {
    console.error('NY Times API error:', error);
    return [];
  }
};
