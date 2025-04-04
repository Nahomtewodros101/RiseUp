import React from "react";

export const Skeleton = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-12 space-y-6">
      {/* Skeleton for a project card */}
      <div className="flex flex-col space-y-4 p-6 bg-gray-200 animate-pulse rounded-lg shadow-md">
        {/* Skeleton for image */}
        <div className="w-full h-48 bg-gray-300 rounded-lg mb-4"></div>

        {/* Skeleton for text */}
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>

        {/* Skeleton for tags */}
        <div className="flex space-x-2 mt-4">
          <div className="w-20 h-6 bg-gray-300 rounded"></div>
          <div className="w-20 h-6 bg-gray-300 rounded"></div>
          <div className="w-20 h-6 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* You can duplicate the above block to simulate multiple skeletons */}
      <div className="flex flex-col space-y-4 p-6 bg-gray-200 animate-pulse rounded-lg shadow-md">
        <div className="w-full h-48 bg-gray-300 rounded-lg mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="flex space-x-2 mt-4">
          <div className="w-20 h-6 bg-gray-300 rounded"></div>
          <div className="w-20 h-6 bg-gray-300 rounded"></div>
          <div className="w-20 h-6 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
