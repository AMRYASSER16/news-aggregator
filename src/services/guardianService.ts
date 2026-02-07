import axios from 'axios';
import { Article, FilterOptions } from '../types';

const GUARDIAN_BASE_URL = 'https://content.guardianapis.com/search';
const GUARDIAN_API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY || '';

const normalizeCategory = (category: string | undefined): string | undefined => {
  if (!category) return undefined;
  const normalized = category.toLowerCase();
  const categoryMap: { [key: string]: string } = {
    'sport': 'sports',
    'business': 'business',
    'technology': 'technology',
    'science': 'science',
    'culture': 'entertainment',
    'film': 'entertainment',
    'music': 'entertainment',
    'tv-and-radio': 'entertainment',
  };
  return categoryMap[normalized] || normalized;
};

export const getGuardianArticles = async (filters: FilterOptions = {}): Promise<Article[]> => {
  try {
    const params: any = {
      'api-key': GUARDIAN_API_KEY,
      'show-fields': 'thumbnail,body,trailText',
      'page-size': filters.keyword ? 50 : 20,
    };

    if (filters.keyword) {
      params.q = filters.keyword;
    }
    if (filters.category) {
      params.section = filters.category;
    }
    if (filters.dateFrom) {
      params['from-date'] = filters.dateFrom;
    }
    if (filters.dateTo) {
      params['to-date'] = filters.dateTo;
    }

    const response = await axios.get(GUARDIAN_BASE_URL, { params });

    return response.data.response.results.map((article: any, index: number) => ({
      id: `guardian-${index}-${Date.now()}`,
      title: article.webTitle || '',
      description: article.fields?.trailText || '',
      content: article.fields?.body,
      url: article.webUrl,
      imageUrl: article.fields?.thumbnail,
      publishedAt: article.webPublicationDate,
      source: 'The Guardian',
      author: article.tags?.[0]?.webTitle,
      category: normalizeCategory(article.sectionName),
    }));
  } catch (error) {
    console.error('Guardian API error:', error);
    return [];
  }
};
