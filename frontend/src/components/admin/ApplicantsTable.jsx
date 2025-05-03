import React from 'react'

import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { Edit2,Trash2, MoreHorizontal } from 'lucide-react'

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



const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        console.log('called');
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message,{ autoClose: 10000 });
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <Card className="h-full w-full max-w-full mx-auto">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="">
          <div>
            
            <Typography color="black" className="text-xl">
            A list of your recent applied user
            </Typography>
          </div>
          
        </div>
      </CardHeader>
      <CardBody className="overflow-auto px-0">
      { applicants && applicants?.applications?.length === 0 ? (
        <div>
            <Typography color="gray" className="text-center py-5 text-lg">
            No Applications are available for this job
        </Typography>
        
        </div>
          
            
          
        ) : (
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            <tr className='bg-blue-100'>
              <th className="border-y border-blue-gray-100 py-5">
                <Typography variant="small" color="blue-gray" className="font-semibold text-black text-md leading-none opacity-70">
                  Full Name
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 p-4">
                <Typography variant="small" color="blue-gray" className="font-semibold text-black text-md leading-none opacity-70">
                 Email
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 p-4">
                <Typography variant="small" color="blue-gray" className="font-semibold text-black text-md leading-none opacity-70">
                  Contact No.
                </Typography>
              </th>
              
              <th className="border-y border-blue-gray-100 p-4">
                <Typography variant="small" color="blue-gray" className="font-semibold text-black text-md leading-none opacity-70">
                  Resume
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 p-4">
                <Typography variant="small" color="blue-gray" className="font-semibold text-black text-md leading-none opacity-70">
                  Applied At
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
            {applicants && applicants?.applications?.map((item, index) => {
              const isLast = index === applicants && applicants?.applications?.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
              return (
                <tr key={item._id}>
                  
                  <td className={classes}>{item?.applicant?.fullname}</td>
                  <td className={classes}>{item?.applicant?.email}</td>
                  <td className={classes}>{item?.applicant?.phoneNumber}</td>
                  
                  
                  <td className={classes}>{
                                        item.applicant?.profile?.resume ? <a 
                                        className="text-blue-600 cursor-pointer" 
                                        onClick={() => window.open(item?.applicant?.profile?.resume, "_blank")}
                                    >
                                        {item?.applicant?.profile?.resumeOriginalName || "View Resume"}
                                    </a> : <span>NA</span>
                                    }
</td>
                  <td className={classes}>{format(new Date(item?.createdAt), "dd MMM, yyyy")}</td>
                  <td className={classes + " cursor-pointer flex gap-2 items-center justify-center h-[104px]"}>
                  <Button className='text-black bg-green-500 hover:bg-green-600 h-12' size="sm" variant="outline" onClick={() => statusHandler("Accepted", item?._id)}> Accept
                    </Button>
                    
                    <Button className='text-black bg-red-500 hover:bg-red-600 h-12' size="sm" variant="outline" onClick={() => statusHandler("Rejected", item?._id)}> Reject
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

export default ApplicantsTable