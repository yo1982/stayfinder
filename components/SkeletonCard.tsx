
import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="animate-pulse flex flex-col">
      <div className="bg-gray-300 w-full aspect-[4/3] rounded-xl mb-3"></div>
      <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
    </div>
  );
};
