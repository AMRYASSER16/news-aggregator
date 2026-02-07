import React, { useState, useEffect } from 'react';
import { UserPreferences } from '../../types';
import './PreferencesModal.css';

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onSave: (preferences: UserPreferences) => void;
}

const AVAILABLE_SOURCES = [
  { id: 'newsapi', name: 'NewsAPI' },
  { id: 'guardian', name: 'The Guardian' },
  { id: 'nytimes', name: 'New York Times' },
];

const AVAILABLE_CATEGORIES = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
];

export const PreferencesModal: React.FC<PreferencesModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onSave,
}) => {
  const [localPreferences, setLocalPreferences] =
    useState<UserPreferences>(preferences);

  useEffect(() => {
    setLocalPreferences(preferences);
  }, [preferences]);

  if (!isOpen) return null;

  const handleSourceToggle = (sourceId: string) => {
    setLocalPreferences({
      ...localPreferences,
      preferredSources: localPreferences.preferredSources.includes(sourceId)
        ? localPreferences.preferredSources.filter((id) => id !== sourceId)
        : [...localPreferences.preferredSources, sourceId],
    });
  };

  const handleCategoryToggle = (category: string) => {
    setLocalPreferences({
      ...localPreferences,
      preferredCategories: localPreferences.preferredCategories.includes(
        category
      )
        ? localPreferences.preferredCategories.filter((c) => c !== category)
        : [...localPreferences.preferredCategories, category],
    });
  };

  const handleAuthorAdd = (author: string) => {
    if (
      author.trim() &&
      !localPreferences.preferredAuthors.includes(author.trim())
    ) {
      setLocalPreferences({
        ...localPreferences,
        preferredAuthors: [
          ...localPreferences.preferredAuthors,
          author.trim(),
        ],
      });
    }
  };

  const handleAuthorRemove = (author: string) => {
    setLocalPreferences({
      ...localPreferences,
      preferredAuthors: localPreferences.preferredAuthors.filter(
        (a) => a !== author
      ),
    });
  };

  const handleSave = () => {
    onSave(localPreferences);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Customize Your News Feed</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="preferences-section">
            <h3>Preferred Sources</h3>
            <div className="preferences-checkboxes">
              {AVAILABLE_SOURCES.map((source) => (
                <label key={source.id} className="preference-checkbox">
                  <input
                    type="checkbox"
                    checked={localPreferences.preferredSources.includes(
                      source.id
                    )}
                    onChange={() => handleSourceToggle(source.id)}
                  />
                  <span>{source.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="preferences-section">
            <h3>Preferred Categories</h3>
            <div className="preferences-checkboxes">
              {AVAILABLE_CATEGORIES.map((category) => (
                <label key={category} className="preference-checkbox">
                  <input
                    type="checkbox"
                    checked={localPreferences.preferredCategories.includes(
                      category
                    )}
                    onChange={() => handleCategoryToggle(category)}
                  />
                  <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="preferences-section">
            <h3>Preferred Authors</h3>
            <div className="preferences-authors">
              <div className="author-input-group">
                <input
                  type="text"
                  className="author-input"
                  placeholder="Enter author name"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAuthorAdd((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <button
                  className="author-add-button"
                  onClick={(e) => {
                    const input = (e.target as HTMLElement)
                      .previousElementSibling as HTMLInputElement;
                    handleAuthorAdd(input.value);
                    input.value = '';
                  }}
                >
                  Add
                </button>
              </div>
              <div className="author-tags">
                {localPreferences.preferredAuthors.map((author) => (
                  <span key={author} className="author-tag">
                    {author}
                    <button
                      className="author-tag-remove"
                      onClick={() => handleAuthorRemove(author)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-button modal-button--secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-button modal-button--primary" onClick={handleSave}>
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
