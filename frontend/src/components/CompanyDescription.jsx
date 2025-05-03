import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT,JOB_API_END_POINT } from "@/utils/constant";
import { setSingleCompany } from "@/redux/companySlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FiArrowLeft } from "react-icons/fi";
import Footer from "./shared/Footer";
import Job from "./Job";
import { motion } from 'framer-motion';


const CompanyDescription = () => {
  const { singleCompany } = useSelector((store) => store.company);
  const { user } = useSelector((store) => store.auth);

  const params = useParams();
  const companyId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

const [jobs, setJobs] = useState([]);


  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch company details.");
      }
    };

const fetchJobs = async () => {
  try {
    const res = await axios.get(
      `${JOB_API_END_POINT}/getbycompany/${companyId}`,
      {
        withCredentials: true,
      }
    );
    if (res.data.success) {
      setJobs(res.data.jobs);
    }
  } catch (error) {
    console.log(error);
    // toast.error("Failed to fetch jobs.");
  }
};
    fetchSingleCompany();
fetchJobs();

  }, [companyId, dispatch]);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-20 my-10">
        <Button
          onClick={() => navigate("/companies")}
          className="mb-4 p-2 bg-[#1d4ed8] text-[#f5f3ff] border border-[#7209b7] rounded-md flex items-center gap-2"
        >
          <FiArrowLeft className="text-xl" /> {/* Left arrow icon */}
          Back to Companies
        </Button>

        <div className="flex items-center gap-4">
          <img
            src={singleCompany?.logo}
            alt="Company Logo"
            className="w-20 h-20 object-contain"
          />
          <div>
            <h1 className="font-bold text-xl">{singleCompany?.name}</h1>
            <Badge className="text-[#F83002] font-bold mt-2" variant="ghost">
              {singleCompany?.location}
            </Badge>
          </div>
        </div>

        <div className="border-b-2 border-b-gray-300 font-medium py-4">
        </div>
        <div className="my-4">
          <h1 className="font-bold my-1 text-[#0e7490]">
            Name:
            <span className="pl-4 font-normal text-gray-800">
              {singleCompany?.name}
            </span>
          </h1>
          <h1 className="font-bold my-1 text-[#0e7490]">
            Location:
            <span className="pl-4 font-normal text-gray-800">
              {singleCompany?.location}
            </span>
          </h1>
          <h1 className="font-bold my-1 text-[#0e7490]">
            Description:
            <span
              className="pl-4 font-normal text-gray-800"
              dangerouslySetInnerHTML={{ __html: singleCompany?.description }}
            />
          </h1>

          <h1 className="font-bold my-1 text-[#0e7490]">
            Website:
            <a
              href={singleCompany?.website}
              target="_blank"
              rel="noopener noreferrer"
              className="pl-4 font-normal text-blue-600 underline"
            >
              {singleCompany?.website}
            </a>
          </h1>
          <h1 className="font-bold my-1 text-[#0e7490]">
            Founded Date:
            <span className="pl-4 font-normal text-gray-800">
              {singleCompany?.createdAt?.split("T")[0]}
            </span>
          </h1>
          <div className="border-b-2 border-b-gray-300 font-medium py-4">
        </div>
          <h1 className="font-medium py-4 text-3xl">
          Available Jobs
        </h1>
        {jobs.length <= 0 ? (
          <span>Job not found</span>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 mx-4 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {jobs.map((job) => (
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
      <Footer />
    </>
  );
};

export default CompanyDescription;

