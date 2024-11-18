// src/components/Loader.tsx
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
