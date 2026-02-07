import React, { useCallback } from 'react';
import { FilterOptions } from '../../types';
import './FilterPanel.css';

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const CATEGORIES = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
];

const SOURCES = [
  { id: 'newsapi', name: 'NewsAPI' },
  { id: 'guardian', name: 'The Guardian' },
  { id: 'nytimes', name: 'New York Times' },
];

const FilterPanelComponent: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
}) => {
  const handleChange = useCallback((
    field: keyof FilterOptions,
    value: string | undefined
  ) => {
    const newValue = value && value.trim() ? value.trim() : undefined;
    onFilterChange({
      ...filters,
      [field]: newValue,
    });
  }, [filters, onFilterChange]);

  const handleClear = useCallback(() => {
    onFilterChange({});
  }, [onFilterChange]);

  return (
    <div className="filter-panel">
      <h3 className="filter-panel__title">Filters</h3>
      <div className="filter-panel__group">
        <label className="filter-panel__label">Category</label>
        <select
          className="filter-panel__select"
          value={filters.category || ''}
          onChange={(e) => handleChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-panel__group">
        <label className="filter-panel__label">Source</label>
        <select
          className="filter-panel__select"
          value={filters.source || ''}
          onChange={(e) => handleChange('source', e.target.value)}
        >
          <option value="">All Sources</option>
          {SOURCES.map((source) => (
            <option key={source.id} value={source.id}>
              {source.name}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-panel__group">
        <label className="filter-panel__label">Date From</label>
        <input
          type="date"
          className="filter-panel__input"
          value={filters.dateFrom || ''}
          onChange={(e) => handleChange('dateFrom', e.target.value)}
        />
      </div>
      <div className="filter-panel__group">
        <label className="filter-panel__label">Date To</label>
        <input
          type="date"
          className="filter-panel__input"
          value={filters.dateTo || ''}
          onChange={(e) => handleChange('dateTo', e.target.value)}
        />
      </div>
      <button
        className="filter-panel__clear"
        onClick={handleClear}
      >
        Clear Filters
      </button>
    </div>
  );
};

FilterPanelComponent.displayName = 'FilterPanel';

export const FilterPanel = React.memo(FilterPanelComponent);
