import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import useGetAllAdminCompanies from "@/hooks/useGetAllAdminCompanies";

const JobSetup = () => {
    useGetAllAdminCompanies()
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    position: 0,
    company: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { allAdminCompanies } = useSelector((store) => store.company);

  // Fetch Job Data for Editing
  useEffect(() => {
    if (!id) return;

    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setInput({
            title: res.data.job.title,
            description: res.data.job.description,
            requirements: res.data.job.requirements.toString(),
            salary: res.data.job.salary,
            location: res.data.job.location,
            jobType: res.data.job.jobType,
            experienceLevel: res.data.job.experienceLevel,
            position: res.data.job.position,
            company: res.data.job.company, // Set correct company ID
          });
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        toast.error("Failed to load job details.");
      }
    };

    fetchJobDetails();
  }, [id]);

  // Handle Input Change
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle Company Selection Change
  const selectChangeHandler = (e) => {
    const selectedCompanyId = e.target.value;
    setInput({ ...input, company: selectedCompanyId });
  };

  // Handle Form Submission
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(`${JOB_API_END_POINT}/update/${id}`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
          <div className="flex flex-wrap gap-4">
            {/* Title */}
            <div className="w-full">
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="Enter job title"
                className="my-1"
              />
            </div>

            {/* Description */}
            <div className="w-full">
              <Label>Description</Label>
              <ReactQuill
                value={input.description}
                onChange={(newContent) =>
                  setInput({ ...input, description: newContent })
                }
                placeholder="Enter job description"
                className="my-1"
              />
            </div>

            {/* Requirements */}
            <div className="w-full">
              <Label>Requirements</Label>
              <ReactQuill
                value={input.requirements}
                onChange={(newContent) =>
                  setInput({ ...input, requirements: newContent })
                }
                placeholder="Enter job requirements"
                className="my-1"
              />
            </div>

            {/* Salary */}
            <div className="w-full">
              <Label>Salary (LPA)</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                placeholder="Enter salary range"
                className="my-1"
              />
            </div>

            {/* Location */}
            <div className="w-full">
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="Enter job location"
                className="my-1"
              />
            </div>

            {/* Job Type */}
            <div className="w-full">
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                placeholder="Enter job type (e.g., Full-time, Part-time)"
                className="my-1"
              />
            </div>

            {/* Experience */}
            <div className="w-full">
              <Label>Experience (Years)</Label>
              <Input
                type="number"
                name="experienceLevel"
                value={input.experienceLevel}
                onChange={changeEventHandler}
                placeholder="Enter experience in years"
                className="my-1"
              />
            </div>

            {/* No of Positions */}
            <div className="w-full">
              <Label>No of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                placeholder="Enter number of positions"
                className="my-1"
              />
            </div>

            {/* Company Selection */}
            {allAdminCompanies.length > 0 && (
              <div className="w-full">
                <Label>Select Company</Label>
                <select
                  value={input.company}
                  onChange={selectChangeHandler}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="" disabled>
                    Select a Company
                  </option>
                  {allAdminCompanies.map((company) => (
                    <option key={company._id} value={company._id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Update Job
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default JobSetup;
