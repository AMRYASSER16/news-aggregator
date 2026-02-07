import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { FilterOptions, UserPreferences } from './types';
import { SearchBar, FilterPanel, ArticleCard } from './components';
import { useNews } from './hooks/useNews';
import { storageService } from './utils/storage';
import './App.css';

const PreferencesModal = lazy(() => import('./components').then(module => ({ default: module.PreferencesModal })));

const DEFAULT_PREFERENCES: UserPreferences = {
  preferredSources: ['newsapi', 'guardian', 'nytimes'],
  preferredCategories: [],
  preferredAuthors: [],
};

function App() {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [preferences, setPreferences] = useState<UserPreferences>(
    DEFAULT_PREFERENCES
  );
  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);

  const { articles, loading, error } = useNews(filters, preferences);

  useEffect(() => {
    const savedPreferences = storageService.loadPreferences();
    if (savedPreferences) {
      setPreferences(savedPreferences);
    }
  }, []);

  const handleSearch = useCallback((keyword: string) => {
    const trimmedKeyword = keyword.trim();
    setFilters(prevFilters => {
      if (trimmedKeyword) {
        return { ...prevFilters, keyword: trimmedKeyword };
      } else {
        const { keyword: _, ...restFilters } = prevFilters;
        return restFilters;
      }
    });
  }, []);

  const handleFilterChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
  }, []);

  const handlePreferencesSave = useCallback((newPreferences: UserPreferences) => {
    setPreferences(newPreferences);
    storageService.savePreferences(newPreferences);
  }, []);

  const handleOpenPreferences = useCallback(() => {
    setIsPreferencesModalOpen(true);
  }, []);

  const handleClosePreferences = useCallback(() => {
    setIsPreferencesModalOpen(false);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__content">
          <h1 className="app-header__title">News Aggregator</h1>
          <button
            className="app-header__preferences-button"
            onClick={handleOpenPreferences}
          >
            Preferences
          </button>
        </div>
      </header>
      <main className="app-main">
        <div className="app-container">
          <div className="app-sidebar">
            <FilterPanel 
              filters={filters} 
              onFilterChange={handleFilterChange}
            />
          </div>
          <div className="app-content">
            <SearchBar 
              onSearch={handleSearch} 
              initialValue={filters.keyword} 
            />
            {loading && (
              <div className="loading">
                <div className="loading-spinner"></div>
                <p>Loading articles...</p>
              </div>
            )}
            {error && (
              <div className="error">
                <p>Error: {error}</p>
                <p className="error-hint">
                  Note: API keys need to be configured in .env file. See README
                  for details.
                </p>
              </div>
            )}
            {!loading && !error && articles.length === 0 && (
              <div className="empty-state">
                <p>No articles found. Try adjusting your filters or search.</p>
              </div>
            )}
            {!loading && !error && articles.length > 0 && (
              <>
                <div className="articles-header">
                  <p className="articles-count">
                    Found {articles.length} article{articles.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="articles-grid">
                  {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Suspense fallback={null}>
        <PreferencesModal
          isOpen={isPreferencesModalOpen}
          onClose={handleClosePreferences}
          preferences={preferences}
          onSave={handlePreferencesSave}
        />
      </Suspense>
    </div>
  );
}

export default App;
