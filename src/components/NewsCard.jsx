// src/components/NewsCard.jsx
import { useState } from 'react';
import { format } from 'date-fns';
import { usePreference } from '../contexts/PreferenceContext';

function NewsCard({ article }) {
  const [expanded, setExpanded] = useState(false);
  const { updateUserInteraction } = usePreference();

  const handleReadMore = () => {
    updateUserInteraction(article.article_id, 'read');
    window.open(article.source_url, '_blank');
  };

  const handleSaveForLater = () => {
    updateUserInteraction(article.article_id, 'saved');
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: article.source_url,
      });
    } else {
      navigator.clipboard.writeText(article.source_url);
      alert('Link copied to clipboard!');
    }
    updateUserInteraction(article.article_id, 'shared');
  };

  const handleMoreLikeThis = () => {
    updateUserInteraction(article.article_id, 'more');
  };

  const handleLessLikeThis = () => {
    updateUserInteraction(article.article_id, 'less');
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
    if (!expanded) {
      updateUserInteraction(article.article_id, 'expanded');
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      {article.image_url && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={article.image_url} 
            alt={article.title}
            className="w-full h-full object-cover" 
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div className="text-xs font-semibold text-blue-600 uppercase">
            {article.topics.slice(0, 2).join(' • ')}
          </div>
          <div className="text-xs text-gray-500">
            {formatDate(article.published_date)}
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-2">{article.title}</h3>
        
        <div className="mb-4">
          <p className={`text-gray-600 ${!expanded && 'line-clamp-3'}`}>
            {article.summary}
          </p>
          {article.summary.length > 150 && (
            <button 
              className="text-blue-600 text-sm mt-1 hover:underline"
              onClick={toggleExpanded}
            >
              {expanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span>Source: {article.source_name}</span>
          <span className="mx-2">•</span>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Relevance: {article.relevance_score.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-between gap-2">
          <button 
            onClick={handleReadMore}
            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Read More
          </button>
          
          <button 
            onClick={handleSaveForLater}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Save for Later"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
          
          <button 
            onClick={handleShareClick}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Share"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
        
        <div className="mt-4 flex space-x-2">
          <button 
            onClick={handleMoreLikeThis}
            className="flex-1 py-1 px-3 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200"
          >
            More like this
          </button>
          <button 
            onClick={handleLessLikeThis}
            className="flex-1 py-1 px-3 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200"
          >
            Less like this
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;