// src/components/LoadingSpinner.jsx
import React from 'react';

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      <p className="mt-4 text-gray-600">Loading AI News Agent...</p>
    </div>
  );
}

export default LoadingSpinner;