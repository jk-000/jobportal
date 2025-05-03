import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { jobType: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


export const getJobsByCompany = async (req, res) => {
    try {
      const { companyId } = req.params;
  
      // Fetch jobs where the companyId matches, and populate the company details if needed
      const jobs = await Job.find({ company: companyId }).populate('company');
  
      if (!jobs || jobs.length === 0) {
        return res.status(404).json({ success: false, message: "No jobs found for this company" });
      }
  
      res.status(200).json({ success: true, jobs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  

  export const updatejob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experienceLevel, position, company } = req.body;

        
        if (!title || !description || !requirements || !salary || !location || !jobType || !experienceLevel || !position || !company) {
            return res.status(400).json({
                message: "Something Is Missing",
                success: false
            });
        }

      
        const updateData = { title, description, requirements, salary, location, jobType, experienceLevel, position, company };

        const JobUpdate = await Job.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!JobUpdate) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job updated successfully",
            success: true,
            job: JobUpdate
        });

    } catch (error) {
        console.error("Error updating job:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Check if job exists
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        
        // Delete associated applications
        await Application.deleteMany({ job: id });
        
        // Delete job
        await Job.findByIdAndDelete(id);
        
        res.status(200).json({ message: "Job and related applications deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
