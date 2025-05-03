import React, { useEffect, useState } from 'react'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, Trash2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { format } from "date-fns";

const AdminJobsTable = () => { 
    const {allAdminJobs, searchJobByText} = useSelector(store=>store.job);

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(()=>{ 
        console.log('called');
        const filteredJobs = allAdminJobs.filter((job)=>{
            if(!searchJobByText){
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());

        });
        setFilterJobs(filteredJobs);
    },[allAdminJobs,searchJobByText])
    return (
        
    
        
    <Card className="h-full w-full max-w-full mx-auto">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="">
          <div>
            
            <Typography color="black" className="text-xl">
              A list of your recently posted jobs
            </Typography>
          </div>
          
        </div>
      </CardHeader>



      <CardBody className="overflow-auto px-0">
      {filterJobs.length === 0 ? (
        <div>
            <Typography color="gray" className="text-center py-5 text-lg">
            No jobs are created by you
        </Typography>
        <Typography color='blue' className='text-center'>
            <a href="/admin/jobs/create">Create now</a>
        </Typography>
        </div>
          
            
          
        ) : (
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            <tr className='bg-blue-100'>
              <th className="border-y border-blue-gray-100 py-5">
                <Typography variant="small" color="blue-gray" className="font-semibold text-black text-md leading-none opacity-70">
                  Company Name
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 p-4">
                <Typography variant="small" color="blue-gray" className="font-semibold text-black text-md leading-none opacity-70">
                  Role
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 p-4">
                <Typography variant="small" color="blue-gray" className="font-semibold text-black text-md leading-none opacity-70">
                  Position
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 p-4">
                <Typography variant="small" color="blue-gray" className="font-semibold text-black text-md leading-none opacity-70">
                  Job Type
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 p-4">
                <Typography variant="small" color="blue-gray" className="font-semibold text-black text-md leading-none opacity-70">
                  Location
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 p-4">
                <Typography variant="small" color="blue-gray" className="font-semibold text-black text-md leading-none opacity-70">
                  Created At
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 p-4">
                <Typography variant="small" color="blue-gray" className="font-semibold text-black text-md leading-none opacity-70">
                  Actions
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {filterJobs.map((job, index) => {
              const isLast = index === filterJobs.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
              return (
                <tr key={job._id}>
                  <td className={classes}>
                    <div className="flex items-center gap-3 ml-5">
                      <Avatar src={job.company.logo} alt={job.company.name} size="sm" />
                      {job.company.name}
                    </div>
                  </td>
                  <td className={classes}>{job.title}</td>
                  <td className={classes}>{job.position}</td>
                  <td className={classes}>{job.jobType}</td>
                  <td className={classes}>{job.location}</td>
                  <td className={classes}>{format(new Date(job.createdAt), "dd MMM, yyyy")}</td>
                  <td className={classes + " cursor-pointer flex gap-2 items-center justify-center"}>
                  <Button className='text-black bg-yellow-500 hover:bg-yellow-600' size="sm" variant="outline" onClick={() => navigate(`/admin/jobs/${job._id}`)}>
                      <Edit2 className='w-4 ml-1 text-black' /> Edit
                    </Button>
                    <Button className='text-black bg-blue-500 hover:bg-blue-600' size="sm" variant="outline" onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}>
                      <Eye className='w-4 ml-[26px] text-black'/> Applicants
                    </Button>
                    <Button className='text-black bg-red-500 hover:bg-red-600' size="sm" variant="outline" onClick={() => navigate(`/admin/jobs/${job._id}/delete`)}>
                      <Trash2 className='w-4 ml-3 text-black'/> Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        )}
      </CardBody>
      
    </Card>
    )
}

export default AdminJobsTable