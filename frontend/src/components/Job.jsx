

import React from "react";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-6 rounded-lg shadow-lg border bg-white hover:shadow-xl transition-all duration-300 min-h-[350px] max-h-[350px] flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-gray-500">
            {daysAgoFunction(job?.createdAt) === 0
              ? "Posted Today"
              : `${daysAgoFunction(job?.createdAt)} days ago`}
          </p>
          <span className="text-sm bg-blue-100 text-blue-600 py-1 px-2 rounded-md">
            {job?.jobType}
          </span>
        </div>

        {/* Job Title */}
        <h2 className="text-xl font-bold text-gray-800"></h2>

        {/* Company Info */}
        <div className="flex items-center mt-4">
          <img
            src={job?.company?.logo}
            alt={job?.company?.name}
            className="w-12 h-12 rounded-full border"
          />
          <div className="ml-3">
            <h3 className="text-md font-bold text-gray-700">
              {job?.title}
            </h3>
            <p className="text-sm text-gray-500">{job?.location}</p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="bg-gray-100 text-gray-600 text-sm font-medium py-1 px-2 rounded-md">
            {job?.position} Positions
          </span>
          <span className="bg-green-100 text-green-600 text-sm font-medium py-1 px-2 rounded-md">
            {job?.jobType}
          </span>
          <span className="bg-yellow-100 text-yellow-600 text-sm font-medium py-1 px-2 rounded-md">
            ₹{job?.salary} LPA
          </span>
        </div>
      </div>

    
      <p className="my-2 text-sm text-gray-600 overflow-hidden line-clamp-3" dangerouslySetInnerHTML={{ __html: job?.description }} />


      {/* Call to Action */}
      <div className="mt-2">
        <button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="w-full bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
          View Details
        </button>
      </div>
    </div>
  );
};

export default Job;