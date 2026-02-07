import React, { useMemo, useCallback } from 'react';
import { Article } from '../../types';
import { format } from 'date-fns';
import './ArticleCard.css';

interface ArticleCardProps {
  article: Article;
}

const ArticleCardComponent: React.FC<ArticleCardProps> = ({ article }) => {
  const handleClick = useCallback(() => {
    window.open(article.url, '_blank', 'noopener,noreferrer');
  }, [article.url]);

  const formattedDate = useMemo(() => {
    return format(new Date(article.publishedAt), 'MMM dd, yyyy');
  }, [article.publishedAt]);

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
  }, []);

  return (
    <article className="article-card" onClick={handleClick}>
      {article.imageUrl && (
        <div className="article-card__image-container">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="article-card__image"
            loading="lazy"
            onError={handleImageError}
          />
        </div>
      )}
      <div className="article-card__content">
        <div className="article-card__header">
          <span className="article-card__source">{article.source}</span>
          {article.category && (
            <span className="article-card__category">{article.category}</span>
          )}
        </div>
        <h2 className="article-card__title">{article.title}</h2>
        {article.description && (
          <p className="article-card__description">{article.description}</p>
        )}
        <div className="article-card__footer">
          {article.author && (
            <span className="article-card__author">By {article.author}</span>
          )}
          <time className="article-card__date">{formattedDate}</time>
        </div>
      </div>
    </article>
  );
};

ArticleCardComponent.displayName = 'ArticleCard';

export const ArticleCard = React.memo(ArticleCardComponent);
