import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { motion } from "framer-motion";

const Jobs = () => {
    const dispatch = useDispatch();
    const { allJobs, searchedQuery } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) =>
                job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.jobType.toLowerCase().includes(searchedQuery.toLowerCase())
            );
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    const handleSearchChange = (e) => {
        dispatch(setSearchedQuery(e.target.value)); // Dispatch updated query
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto mt-5">
                <div className="flex flex-col md:flex-row gap-5">
                    {/* Sidebar Filter - Hidden on Mobile */}
                    <div className="hidden md:block w-1/5">
                        <FilterCard type="job" />
                    </div>

                    {/* Search Bar for Mobile */}
                    <div className="md:hidden m-4">
                        <label className="font-bold">Search Jobs:</label>
                        <input
                            type="text"
                            value={searchedQuery}
                            onChange={handleSearchChange}
                            placeholder="Search Jobs..."
                            className="w-full p-2 border rounded-md shadow-sm"
                        />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 h-[88vh] overflow-y-auto pb-5 overflow-hidden scrollbar-hide">
                        {filterJobs.length <= 0 ? (
                            <div className="flex items-center justify-center h-full">
                                <span className="text-gray-500">Job not found</span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 mx-4 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {filterJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                        key={job?._id}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Jobs;
