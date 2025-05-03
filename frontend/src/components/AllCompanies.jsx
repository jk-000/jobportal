import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Company from './Company';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import useGetAllCompanies from '../hooks/useGetAllCompanies'; // Hook to fetch all companies
import { setSearchCompanyByText } from '@/redux/companySlice';

const AllCompanies = () => {
  const dispatch = useDispatch();
  const { companies , searchCompanyByText } = useSelector((store) => store.company);
  const [filteredCompanies, setFilteredCompanies] = useState(companies);

  // Fetch companies via the custom hook
  useGetAllCompanies();

  useEffect(() => {
    if (companies) {
      if (searchCompanyByText) {
        const filtered = companies.filter((company) =>
          (company.name?.toLowerCase()?.includes(searchCompanyByText.toLowerCase()) || 
           company.location?.toLowerCase()?.includes(searchCompanyByText.toLowerCase()))
        );
        setFilteredCompanies(filtered);
      } else {
        setFilteredCompanies(companies);
      }
    }
  }, [companies, searchCompanyByText]);
  
  

  const handleSearchChange = (e) => {
    const query = e.target.value;
    
    dispatch(setSearchCompanyByText(query)); 
  };

  

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex flex-col md:flex-row gap-5">
          {/* FilterCard hidden on mobile */}
          <div className="hidden md:block w-1/5">
            <FilterCard type="company" />
          </div>
          {/* Search bar for mobile screens */}
          <div className="md:hidden m-4">
            <label className="font-bold">Search Company :</label>
            <input
              type="text"
              value={searchCompanyByText}
              onChange={handleSearchChange}
              placeholder="Search companies..."
              className="w-full p-2 border rounded-md shadow-sm"
            />
          </div>
          
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5 overflow-hidden scrollbar-hide">

            {filteredCompanies.length <= 0 ? (
                            <div className="flex items-center justify-center h-full">
                                <span className="text-gray-500">Company not found</span>
                            </div>
                        ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {filteredCompanies.map((company) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={company?._id}
                  >
                    <Company company={company} />
                  </motion.div>
                ))}
              </div>
                        )}
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default AllCompanies;