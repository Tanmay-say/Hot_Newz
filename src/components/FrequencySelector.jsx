// src/components/FrequencySelector.jsx
import { useState, useEffect } from 'react';
import { usePreference } from '../contexts/PreferenceContext';

const FREQUENCY_OPTIONS = [
  {
    id: 'real-time',
    name: 'Real-time',
    description: 'Get notified as soon as important news breaks',
    maxDaily: 'Unlimited'
  },
  {
    id: 'hourly',
    name: 'Hourly Digest',
    description: 'Receive a summary of new content every hour',
    maxDaily: '24 notifications/day'
  },
  {
    id: 'morning-evening',
    name: 'Morning & Evening',
    description: 'Receive a digest twice daily (8 AM and 6 PM)',
    maxDaily: '2 notifications/day'
  },
  {
    id: 'daily',
    name: 'Daily Digest',
    description: 'Receive one comprehensive update each day',
    maxDaily: '1 notification/day'
  },
  {
    id: 'weekly',
    name: 'Weekly Summary',
    description: 'Get a digest of the most important news once a week',
    maxDaily: '1 notification/week'
  }
];

function FrequencySelector() {
  const { preferences, updatePreferences } = usePreference();
  const [selectedFrequency, setSelectedFrequency] = useState('daily');
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(false);
  const [quietHoursStart, setQuietHoursStart] = useState('22:00');
  const [quietHoursEnd, setQuietHoursEnd] = useState('08:00');
  const [maxNotifications, setMaxNotifications] = useState(5);

  useEffect(() => {
    if (preferences) {
      // Initialize from user preferences
      setSelectedFrequency(preferences.frequency || 'daily');
      
      if (preferences.notification_settings) {
        const { quiet_hours, max_daily_notifications } = preferences.notification_settings;
        
        if (quiet_hours) {
          setQuietHoursEnabled(true);
          setQuietHoursStart(quiet_hours.start || '22:00');
          setQuietHoursEnd(quiet_hours.end || '08:00');
        }
        
        if (max_daily_notifications) {
          setMaxNotifications(max_daily_notifications);
        }
      }
    }
  }, [preferences]);

  const handleFrequencyChange = (frequencyId) => {
    setSelectedFrequency(frequencyId);
  };

  const handleSave = () => {
    const updatedPreferences = {
      ...preferences,
      frequency: selectedFrequency,
      notification_settings: {
        ...preferences?.notification_settings,
        max_daily_notifications: maxNotifications,
        quiet_hours: quietHoursEnabled ? {
          start: quietHoursStart,
          end: quietHoursEnd
        } : null
      }
    };
    
    updatePreferences(updatedPreferences);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Update Delivery Frequency</h3>
      
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-4">
          Choose how often you'd like to receive AI news updates.
        </p>
        
        <div className="space-y-3">
          {FREQUENCY_OPTIONS.map(option => (
            <div 
              key={option.id}
              className={`
                border rounded-lg p-3 cursor-pointer transition-colors
                ${selectedFrequency === option.id 
                  ? 'bg-blue-50 border-blue-300' 
                  : 'border-gray-200 hover:bg-gray-50'}
              `}
              onClick={() => handleFrequencyChange(option.id)}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <input 
                    type="radio"
                    name="frequency"
                    checked={selectedFrequency === option.id}
                    onChange={() => {}}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                </div>
                <div className="ml-3 flex-grow">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{option.name}</h4>
                    <span className="text-xs text-gray-500">{option.maxDaily}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4 mt-6">
        <h4 className="font-medium text-gray-900 mb-4">Advanced Settings</h4>
        
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <label htmlFor="quietHours" className="flex items-center cursor-pointer">
              <span className="text-sm font-medium text-gray-700">Enable Quiet Hours</span>
              <span className="text-xs ml-2 text-gray-500">(Don't send notifications during specified hours)</span>
            </label>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input 
                type="checkbox" 
                id="quietHours" 
                checked={quietHoursEnabled}
                onChange={() => setQuietHoursEnabled(!quietHoursEnabled)}
                className="sr-only"
              />
              <div className={`block w-10 h-6 rounded-full transition ${quietHoursEnabled ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              <div className={`absolute left-1 top-1 bg-white border border-gray-300 w-4 h-4 rounded-full transition transform ${quietHoursEnabled ? 'translate-x-4' : ''}`}></div>
            </div>
          </div>
          
          {quietHoursEnabled && (
            <div className="mt-3 pl-6">
              <div className="flex space-x-4">
                <div>
                  <label className="block text-xs text-gray-700 mb-1">Start Time</label>
                  <input 
                    type="time" 
                    value={quietHoursStart}
                    onChange={(e) => setQuietHoursStart(e.target.value)}
                    className="border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-700 mb-1">End Time</label>
                  <input 
                    type="time" 
                    value={quietHoursEnd}
                    onChange={(e) => setQuietHoursEnd(e.target.value)}
                    className="border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="maxNotifications" className="block text-sm font-medium text-gray-700 mb-1">
            Maximum Notifications per Day
          </label>
          <div className="flex items-center">
            <input
              type="range"
              id="maxNotifications"
              min="1"
              max="20"
              value={maxNotifications}
              onChange={(e) => setMaxNotifications(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-md appearance-none cursor-pointer accent-blue-600"
            />
            <span className="ml-2 text-sm text-gray-700 w-6 text-center">{maxNotifications}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Limit how many notifications you receive per day, regardless of frequency setting.
          </p>
        </div>
      </div>

      <div className="flex justify-end mt-6">
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

export default FrequencySelector;