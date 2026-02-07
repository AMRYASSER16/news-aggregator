import { Article, FilterOptions, UserPreferences } from '../types';
import { getNewsApiArticles } from './newsApiService';
import { getGuardianArticles } from './guardianService';
import { getNYTimesArticles } from './nytimesService';

export const getArticles = async (
  filters: FilterOptions = {},
  preferences?: UserPreferences
): Promise<Article[]> => {
  const promises: Promise<Article[]>[] = [];

  const effectiveFilters = { ...filters };

  let activeSources: string[];
  if (effectiveFilters.source) {
    activeSources = [effectiveFilters.source];
  } else if (preferences?.preferredSources.length) {
    activeSources = preferences.preferredSources;
  } else {
    activeSources = ['newsapi', 'guardian', 'nytimes'];
  }

  if (activeSources.includes('newsapi')) {
    promises.push(getNewsApiArticles(effectiveFilters));
  }
  if (activeSources.includes('guardian')) {
    promises.push(getGuardianArticles(effectiveFilters));
  }
  if (activeSources.includes('nytimes')) {
    promises.push(getNYTimesArticles(effectiveFilters));
  }

    const results = await Promise.all(promises);
    let allArticles = results.flat();

    if (effectiveFilters.keyword) {
      const searchKeyword = effectiveFilters.keyword.toLowerCase().trim();
      const normalizedKeyword = searchKeyword.replace(/[–—]/g, '-').replace(/['"]/g, "'");
      
      allArticles = allArticles.filter((article) => {
        const title = (article.title || '').toLowerCase().replace(/[–—]/g, '-').replace(/['"]/g, "'");
        const description = (article.description || '').toLowerCase().replace(/[–—]/g, '-').replace(/['"]/g, "'");
        
        const commonWords = new Set(['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use']);
        const keywordWords = normalizedKeyword
          .split(/\s+/)
          .map(w => w.replace(/[^\w-]/g, ''))
          .filter(w => w.length > 2 && !commonWords.has(w));
        
        if (title.includes(normalizedKeyword) || description.includes(normalizedKeyword)) {
          return true;
        }
        
        if (keywordWords.length > 0) {
          const allWordsInTitle = keywordWords.every(word => title.includes(word));
          if (allWordsInTitle) {
            return true;
          }
          
          const wordsInTitle = keywordWords.filter(word => title.includes(word)).length;
          const wordsInDesc = keywordWords.filter(word => description.includes(word)).length;
          if (wordsInTitle + wordsInDesc >= Math.ceil(keywordWords.length * 0.7)) {
            return true;
          }
        }
        
        return keywordWords.some(word => 
          title.includes(word) || description.includes(word)
        );
      });
    }

    if (preferences) {
      if (preferences.preferredCategories.length > 0) {
        allArticles = allArticles.filter((article) => {
          if (!article.category) return false;
          const articleCategory = article.category.toLowerCase();
          return preferences.preferredCategories.some(
            (prefCategory) => prefCategory.toLowerCase() === articleCategory
          );
        });
      }
      if (preferences.preferredAuthors.length > 0) {
        allArticles = allArticles.filter(
          (article) =>
            article.author &&
            preferences.preferredAuthors.some((author) =>
              article.author?.toLowerCase().includes(author.toLowerCase())
            )
        );
      }
    }

    const uniqueArticles = Array.from(
      new Map(allArticles.map((article) => [article.url, article])).values()
    );

    return uniqueArticles.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
};
