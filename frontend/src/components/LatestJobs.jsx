import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
   
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold text-center'><span className='text-blue-500'>Featured </span> Jobs</h1>
            <p className='text-center mt-2 text-[16px]'>Looking for your next career opportunity? Explore our featured jobs <br/> below</p>
            <div className="md:grid gap-4 m-2 my-6 sm:gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 my-5">
    {
        allJobs.length <= 0 
        ? <span>No Job Available</span> 
        : allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
    }
</div>

        </div>
    )
}

export default LatestJobs