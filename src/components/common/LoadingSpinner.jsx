import React from 'react';
import '../../styles/components/LoadingSpinner.css'; // optional: for spinner style

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
