export interface Article {
  id: string;
  title: string;
  description: string;
  content?: string;
  url: string;
  imageUrl?: string;
  publishedAt: string;
  source: string;
  author?: string;
  category?: string;
}

export interface FilterOptions {
  keyword?: string;
  dateFrom?: string;
  dateTo?: string;
  category?: string;
  source?: string;
}

export interface UserPreferences {
  preferredSources: string[];
  preferredCategories: string[];
  preferredAuthors: string[];
}
