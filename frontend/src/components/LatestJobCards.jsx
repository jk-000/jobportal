import React from "react";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full sm:w-[60%] md:w-[70%] lg:w-[100%] xl:w-[100%] mx-2 sm:mx-4 md:mx-6">
      <div
        onClick={() => navigate(`/description/${job._id}`)}
        className="p-5 rounded-lg shadow-xl bg-white border border-gray-100 cursor-pointer md:mt-2"
      >
        <div className="flex flex-col mt-1">
          <div>
            <h3 className="text-[18px] sm:text-[20px] font-bold text-gray-700">
              {job?.title}
            </h3>
          </div>

          <div className="flex gap-2 text-[10px] sm:text-[12px] font-medium">
            <span className="bg-green-100 text-green-600 px-2 rounded-sm">
              {job?.jobType.toUpperCase()}
            </span>
            <p className="text-gray-500 text-center">
              Salary: ₹{job?.salary} LPA
            </p>
          </div>
          <div className="flex items-center mt-4">
            <img
              src={job?.company?.logo}
              alt={job?.company?.name}
              className="w-12 h-12 rounded-full border"
            />
            <div className="ml-3">
              <h3 className="text-md font-bold text-gray-700">
                {job?.company?.name}
              </h3>
              <p className="text-sm text-gray-500">{job?.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestJobCards;
