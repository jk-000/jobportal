import React, { useEffect, useState } from 'react'

import { Edit2,Trash2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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

const CompaniesTable = () => {
    const { allAdminCompanies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(allAdminCompanies);
    const navigate = useNavigate();
    useEffect(()=>{
        const filteredCompany = allAdminCompanies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    },[allAdminCompanies,searchCompanyByText])
    return (
        <Card className="h-full w-full max-w-full mx-auto">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="">
          <div>
            
            <Typography color="black" className="text-xl">
              A list of your recently added companies
            </Typography>
          </div>
          
        </div>
      </CardHeader>

      <CardBody className="overflow-auto px-0">
      {filterCompany.length === 0 ? (
        <div>
            <Typography color="gray" className="text-center py-5 text-lg">
            No Companies are created by you
        </Typography>
        <Typography color='blue' className='text-center'>
            <a href="/admin/companies/create">Create now</a>
        </Typography>
        </div>
          
            
          
        ) : (
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            <tr className='bg-blue-100'>
              <th className="border-y border-blue-gray-100 py-5">
                <Typography variant="small" color="blue-gray" className="font-semibold text-black text-md leading-none opacity-70">
                  Company Logo
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 p-4">
                <Typography variant="small" color="blue-gray" className="font-semibold text-black text-md leading-none opacity-70">
                 Company Name
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 p-4">
                <Typography variant="small" color="blue-gray" className="font-semibold text-black text-md leading-none opacity-70">
                  Description
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
            {filterCompany.map((company, index) => {
              const isLast = index === filterCompany.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
              return (
                <tr key={company._id}>
                  <td className={classes}>
                    <div className="flex items-center gap-3 justify-center">
                      <Avatar src={company.logo} alt={company.name} size="sm" />
                      
                    </div>
                  </td>
                  <td className={classes}>{company.name}</td>
                  <td className={`${classes} max-w-[300px]`}>
                    <div className='line-clamp-3'>
                    {company.description}
                    </div>
                    
                    </td>
                  
                  <td className={classes}>{company.location}</td>
                  <td className={classes}>{format(new Date(company.createdAt), "dd MMM, yyyy")}</td>
                  <td className={classes + " cursor-pointer flex gap-2 items-center justify-center h-[104px]"}>
                  <Button className='text-black bg-yellow-500 hover:bg-yellow-600 h-14' size="sm" variant="outline" onClick={() => navigate(`/admin/companies/${company._id}`)}>
                      <Edit2 className='w-4 h-4 ml-1 text-black' /> Edit
                    </Button>
                    
                    <Button className='text-black bg-red-500 hover:bg-red-600 h-14' size="sm" variant="outline" onClick={() => navigate(`/admin/companies/${company._id}/delete`)}>
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

export default CompaniesTable


