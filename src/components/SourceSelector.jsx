// src/components/SourceSelector.jsx
import { useState, useEffect } from 'react';
import { usePreference } from '../contexts/PreferenceContext';

function SourceSelector() {
  const { preferences, updatePreferences } = usePreference();
  const [availableSources, setAvailableSources] = useState([]);
  const [selectedSources, setSelectedSources] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch available news sources from API or use mock data
    fetch('/data/mockSources.json')
      .then(response => response.json())
      .then(data => {
        setAvailableSources(data);
        setIsLoading(false);
        
        // Initialize selected sources from user preferences
        if (preferences && preferences.preferred_sources) {
          setSelectedSources(preferences.preferred_sources);
        } else {
          // Default to all sources enabled
          const defaultSources = {};
          data.forEach(source => {
            defaultSources[source.id] = true;
          });
          setSelectedSources(defaultSources);
        }
      })
      .catch(error => {
        console.error('Error loading news sources:', error);
        setIsLoading(false);
      });
  }, [preferences]);

  const handleSourceToggle = (sourceId) => {
    setSelectedSources(prevSelected => ({
      ...prevSelected,
      [sourceId]: !prevSelected[sourceId]
    }));
  };

  const handleSave = () => {
    updatePreferences({
      ...preferences,
      preferred_sources: selectedSources
    });
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading news sources...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Select News Sources</h3>
      
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-4">
          Choose which AI news sources you want to receive updates from.
        </p>
        
        <div className="space-y-3">
          {availableSources.map(source => (
            <div 
              key={source.id}
              className={`
                border rounded-lg p-3 cursor-pointer transition-colors
                ${selectedSources[source.id] 
                  ? 'bg-blue-50 border-blue-300' 
                  : 'border-gray-200 hover:bg-gray-50'}
              `}
              onClick={() => handleSourceToggle(source.id)}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <input 
                    type="checkbox"
                    checked={selectedSources[source.id] || false}
                    onChange={() => {}}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 flex-grow">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-gray-900">{source.name}</h4>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {source.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{source.description}</p>
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
          Save Sources
        </button>
      </div>
    </div>
  );
}

export default SourceSelector;