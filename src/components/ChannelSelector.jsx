// src/components/ChannelSelector.jsx
import { useState, useEffect } from 'react';
import { usePreference } from '../contexts/PreferenceContext';

function ChannelSelector() {
  const { preferences, updatePreferences } = usePreference();
  const [preferredChannel, setPreferredChannel] = useState('whatsapp');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isWhatsAppVerified, setIsWhatsAppVerified] = useState(false);
  const [isSMSVerified, setIsSMSVerified] = useState(false);
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verifyingChannel, setVerifyingChannel] = useState(null);

  useEffect(() => {
    if (preferences) {
      // Initialize from user preferences
      setPreferredChannel(preferences.preferred_channel || 'whatsapp');
      setPhoneNumber(preferences.phone_number || '');
      
      // Check if channels are verified
      if (preferences.verified_channels) {
        setIsWhatsAppVerified(preferences.verified_channels.includes('whatsapp'));
        setIsSMSVerified(preferences.verified_channels.includes('sms'));
      }
    }
  }, [preferences]);

  const handleChannelChange = (channel) => {
    setPreferredChannel(channel);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleVerifyChannel = (channel) => {
    // In a real implementation, this would send a verification code to the user's device
    setShowVerificationInput(true);
    setVerifyingChannel(channel);
    // Simulate sending verification code
    alert(`Verification code sent to your ${channel === 'whatsapp' ? 'WhatsApp' : 'SMS'}!`);
  };

  const handleVerificationSubmit = () => {
    // In a real implementation, this would verify the code with the backend
    if (verificationCode) {
      if (verifyingChannel === 'whatsapp') {
        setIsWhatsAppVerified(true);
      } else if (verifyingChannel === 'sms') {
        setIsSMSVerified(true);
      }
      
      const updatedVerifiedChannels = [
        ...preferences?.verified_channels || [],
      ];
      
      if (!updatedVerifiedChannels.includes(verifyingChannel)) {
        updatedVerifiedChannels.push(verifyingChannel);
      }
      
      updatePreferences({
        ...preferences,
        verified_channels: updatedVerifiedChannels
      });
      
      setShowVerificationInput(false);
      setVerificationCode('');
    }
  };

  const handleSave = () => {
    updatePreferences({
      ...preferences,
      preferred_channel: preferredChannel,
      phone_number: phoneNumber
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Delivery Channel Settings</h3>
      
      <div className="mb-6">
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <div className="flex">
          <input
            type="tel"
            id="phoneNumber"
            placeholder="+1 (555) 123-4567"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="flex-grow border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Enter your phone number to receive updates via WhatsApp or SMS.
        </p>
      </div>
      
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-3">
          Choose your preferred delivery channel:
        </p>
        
        <div className="space-y-3">
          <div 
            className={`
              border rounded-lg p-4 cursor-pointer transition-colors
              ${preferredChannel === 'whatsapp' 
                ? 'bg-blue-50 border-blue-300' 
                : 'border-gray-200 hover:bg-gray-50'}
            `}
            onClick={() => handleChannelChange('whatsapp')}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <input 
                  type="radio"
                  name="channel"
                  checked={preferredChannel === 'whatsapp'}
                  onChange={() => {}}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
              </div>
              <div className="ml-3 flex-grow">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium text-gray-900">WhatsApp</h4>
                  {isWhatsAppVerified ? (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </span>
                  ) : (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVerifyChannel('whatsapp');
                      }}
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full hover:bg-blue-200"
                    >
                      Verify
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">Receive rich media updates with images and interactive buttons.</p>
              </div>
            </div>
          </div>
          
          <div 
            className={`
              border rounded-lg p-4 cursor-pointer transition-colors
              ${preferredChannel === 'sms' 
                ? 'bg-blue-50 border-blue-300' 
                : 'border-gray-200 hover:bg-gray-50'}
            `}
            onClick={() => handleChannelChange('sms')}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <input 
                  type="radio"
                  name="channel"
                  checked={preferredChannel === 'sms'}
                  onChange={() => {}}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
              </div>
              <div className="ml-3 flex-grow">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium text-gray-900">SMS</h4>
                  {isSMSVerified ? (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </span>
                  ) : (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVerifyChannel('sms');
                      }}
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full hover:bg-blue-200"
                    >
                      Verify
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">Text-only updates that work on any phone, no internet required.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showVerificationInput && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Enter Verification Code
          </h4>
          <p className="text-xs text-gray-500 mb-3">
            We sent a verification code to your {verifyingChannel === 'whatsapp' ? 'WhatsApp' : 'SMS'}. Enter it below to verify your number.
          </p>
          <div className="flex">
            <input
              type="text"
              placeholder="123456"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="flex-grow border border-gray-300 rounded-l-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleVerificationSubmit}
              className="bg-blue-600 text-white rounded-r-md px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Verify
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default ChannelSelector;