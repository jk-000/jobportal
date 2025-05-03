import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button'


const Company = ({ company }) => {

    const navigate = useNavigate();

  return (
    
    <div class="group h-64 rounded-lg m-2 p-4 transition-all duration-300 lg:p-8 shadow-lg hover:shadow-xl">
  <div class="flex items-center gap-x-4">
    <img
      class="aspect-square w-16 rounded-full object-cover"
      src={company.logo}
      alt={company.name}
    />
    <div>
      <h3 class="text-xl font-bold">{company.name}</h3>
      <span class="text-sm">Location: {company.location}</span>
    </div>
  </div>

  <p class="mt-4 text-sm text-gray-700 line-clamp-3">
  {company.description}
  </p>

  <div class="flex items-center justify-between mt-3">
  <a
  href={`https://${company.website}`}
  target="_blank"
  rel="noopener noreferrer"
  className="font-medium text-red-500 transition-all duration-300 hover:text-green-700/80 cursor-pointer"
>
  Visit Website
</a>
    {/* <a
      
    >
      View Details
    </a> */}
     <Button class="font-medium text-blue-500 transition-all duration-300 hover:text-blue-700/80 cursor-pointer" onClick={()=> navigate(`/cdescription/${company?._id}`)}>View Details</Button>
  </div>
</div>

  );
};

export default Company;
