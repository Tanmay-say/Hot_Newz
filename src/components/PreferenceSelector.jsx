// src/components/PreferenceSelector.jsx
import { useState, useEffect } from 'react';
import { usePreference } from '../contexts/PreferenceContext';

function PreferenceSelector() {
  const { preferences, updatePreferences } = usePreference();
  const [availableTopics, setAvailableTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch available topics from API or use mock data
    fetch('/data/mockTopics.json')
      .then(response => response.json())
      .then(data => {
        setAvailableTopics(data);
        setIsLoading(false);
        
        // Initialize selected topics from user preferences
        if (preferences && preferences.topics_of_interest) {
          setSelectedTopics(preferences.topics_of_interest);
        }
      })
      .catch(error => {
        console.error('Error loading topics:', error);
        setIsLoading(false);
      });
  }, [preferences]);

  const handleTopicToggle = (topicId) => {
    setSelectedTopics(prevSelected => {
      if (prevSelected.includes(topicId)) {
        return prevSelected.filter(id => id !== topicId);
      } else {
        return [...prevSelected, topicId];
      }
    });
  };

  const handleSave = () => {
    updatePreferences({
      ...preferences,
      topics_of_interest: selectedTopics
    });
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading topics...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Select Topics of Interest</h3>
      
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-4">
          Choose the AI topics you're interested in receiving updates about.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {availableTopics.map(topic => (
            <div 
              key={topic.id}
              className={`
                border rounded-lg p-3 cursor-pointer transition-colors
                ${selectedTopics.includes(topic.id) 
                  ? 'bg-blue-50 border-blue-300' 
                  : 'border-gray-200 hover:bg-gray-50'}
              `}
              onClick={() => handleTopicToggle(topic.id)}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <input 
                    type="checkbox"
                    checked={selectedTopics.includes(topic.id)}
                    onChange={() => {}}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">{topic.name}</h4>
                  <p className="text-xs text-gray-500">{topic.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}

export default PreferenceSelector;